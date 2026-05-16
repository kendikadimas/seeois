<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\Stand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductionPanelController extends Controller
{
    public function index(Request $request): Response
    {
        $stands = Stand::query()
            ->with(['menu.recipeComponents.expense'])
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
                'cost' => $menu->recipeComponents->isNotEmpty() ? round($cost, 2) : null,
            ];
        })->values() ?? collect();

        return Inertia::render('Staff/Business/ProductionPanel', [
            'stands' => $stands,
            'selectedStand' => $selectedStand,
            'menus' => $menus,
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    public function updateStock(Request $request, MenuItem $menu)
    {
        $validated = $request->validate([
            'amount' => ['required', 'integer'],
        ]);

        $menu->stock += $validated['amount'];
        $menu->save();

        return back()->with('notif', [
            'type' => 'info',
            'message' => 'Stock menu berhasil diperbarui.',
        ]);
    }

    public function togglePublish(MenuItem $menu)
    {
        $menu->is_published = ! (bool) $menu->is_published;
        $menu->published_at = $menu->is_published ? now() : null;
        $menu->save();

        return back()->with('notif', [
            'type' => 'info',
            'message' => $menu->is_published ? 'Menu dipublikasikan ke shop.' : 'Menu ditarik dari shop.',
        ]);
    }
}
