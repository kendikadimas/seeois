<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\MenuStockMovement;
use App\Models\Stand;
use App\Models\GovernanceYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Services\MenuInventoryService;
use Inertia\Inertia;
use Inertia\Response;

class ProductionPanelController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $yearId = GovernanceYear::where('year', session('selected_year', now()->year))->value('id');

        $stands = Stand::query()
            ->with(['menu.recipeComponents.expense', 'menu.stockMovements' => fn ($query) => $query->with('user:id,name')->latest()->limit(50)])
            ->when($yearId, fn ($query) => $query->where(fn ($q) => $q->where('year_id', $yearId)->orWhereNull('year_id')))
            ->when((int) $user->roles_id !== 99, fn ($query) => $query->whereHas('production', fn ($q) => $q->where('users.id', $user->id)))
            ->orderBy('name')
            ->get();

        $selectedStandId = (int) $request->input('stand_id', $stands->first()?->id ?? 0);
        $selectedStand = $stands->firstWhere('id', $selectedStandId) ?? $stands->first();

        $menus = $selectedStand?->menu?->map(function (MenuItem $menu) {
            $cost = 0;
            foreach ($menu->recipeComponents as $component) {
                if (! $component->expense || ! $component->expense->qty) {
                    continue;
                }

                $unitPrice = $component->expense->total_price / max(1, (float) $component->expense->qty);
                $cost += $unitPrice * (float) $component->quantity_used;
            }

            return [
                'id' => $menu->id,
                'name' => $menu->name,
                'price' => $menu->price,
                'stock' => $menu->stock,
                'sale' => $menu->sale,
                'is_published' => (bool) ($menu->is_published ?? false),
                'workflow_status' => $menu->workflow_status ?? 'draft',
                'cost' => $menu->recipeComponents->isNotEmpty() ? round($cost, 2) : null,
                'latest_stock_movement' => $menu->stockMovements->first() ? [
                    'change' => $menu->stockMovements->first()->change,
                    'reason' => $menu->stockMovements->first()->reason,
                    'staff' => $menu->stockMovements->first()->user?->name,
                    'created_at' => $menu->stockMovements->first()->created_at?->toISOString(),
                ] : null,
            ];
        })->values() ?? collect();

        return Inertia::render('Staff/Business/ProductionPanel', [
            'stands' => $stands,
            'selectedStand' => $selectedStand,
            'menus' => $menus,
            'foodTags' => \App\Models\FoodsTag::orderBy('name')->get(['id', 'name']),
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    public function updateStock(Request $request, MenuItem $menu)
    {
        $this->ensureAssignedToMenu($request, $menu);

        $validated = $request->validate([
            'amount' => ['required', 'integer', 'not_in:0'],
            'reason' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:500'],
            'request_id' => ['nullable', 'uuid'],
        ]);

        if (! empty($validated['request_id']) && MenuStockMovement::where('request_id', $validated['request_id'])->exists()) {
            return back()->with('notif', ['type' => 'info', 'message' => 'Perubahan stok ini sudah pernah diproses.']);
        }

        app(MenuInventoryService::class)->adjust(
            $menu,
            (int) $validated['amount'],
            $request->user()->id,
            $validated['reason'] ?? 'production_adjustment',
            $validated['notes'] ?? null,
            $validated['request_id'] ?? null,
        );

        return back()->with('notif', [
            'type' => 'info',
            'message' => 'Stock menu berhasil diperbarui.',
        ]);
    }

    public function togglePublish(Request $request, MenuItem $menu)
    {
        $this->ensureAssignedToMenu($request, $menu);
        $isReady = $menu->workflow_status !== 'ready';
        $menu->workflow_status = $isReady ? 'ready' : 'draft';
        $menu->production_ready_by = $isReady ? $request->user()->id : null;
        $menu->production_ready_at = $isReady ? now() : null;
        if (! $isReady) {
            $menu->is_published = false;
            $menu->published_at = null;
        }
        $menu->save();

        return back()->with('notif', [
            'type' => 'info',
            'message' => $isReady ? 'Menu ditandai siap dijual.' : 'Status siap jual dibatalkan.',
        ]);
    }

    private function ensureAssignedToMenu(Request $request, MenuItem $menu): void
    {
        if ((int) $request->user()->roles_id === 99) {
            return;
        }

        abort_unless(
            $menu->stand && $menu->stand->production()->where('users.id', $request->user()->id)->exists(),
            403,
            'Anda tidak ditugaskan pada stand ini.'
        );
    }
}
