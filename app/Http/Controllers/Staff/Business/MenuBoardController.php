<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\FoodOrder;
use App\Models\MenuItem;
use App\Models\RecipeComponent;
use App\Models\Stand;
use App\Models\StandExpense;
use App\Models\StandSales;
use App\Models\GovernanceYear;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuBoardController extends Controller
{
    public function index(Request $request): Response
    {
        $yearId = GovernanceYear::where('year', session('selected_year', now()->year))->value('id');
        $stands = Stand::query()
            ->with([
                'expenseItems' => fn ($query) => $query->latest('id'),
                'menu.recipeComponents.expense',
                'sale.order.menu',
            ])
            ->when($yearId, fn ($query) => $query->where(fn ($q) => $q->where('year_id', $yearId)->orWhereNull('year_id')))
            ->orderBy('name')
            ->get();

        $selectedStandId = (int) $request->input('stand_id', $stands->first()?->id ?? 0);
        $selectedStand = $stands->firstWhere('id', $selectedStandId) ?? $stands->first();

        $expenseItems = $selectedStand?->expenseItems?->where('operational_id', '>', 0)->values() ?? collect();
        $menus = $selectedStand?->menu?->map(function (MenuItem $menu) {
            return [
                'id' => $menu->id,
                'name' => $menu->name,
                'category' => $menu->category,
                'price' => $menu->price,
                'stock' => $menu->stock,
                'sale' => $menu->sale,
                'is_published' => (bool) ($menu->is_published ?? false),
                'workflow_status' => $menu->workflow_status ?? 'draft',
                'published_at' => $menu->published_at,
                'cost' => $this->calculateMenuCost($menu),
                'recipe_components' => $menu->recipeComponents->map(function (RecipeComponent $component) {
                    return [
                        'id' => $component->id,
                        'stand_expense_id' => $component->stand_expense_id,
                        'quantity_used' => $component->quantity_used,
                        'unit_used' => $component->unit_used,
                        'expense' => $component->expense ? [
                            'id' => $component->expense->id,
                            'name' => $component->expense->name,
                            'qty' => $component->expense->qty,
                            'unit' => $component->expense->unit,
                            'total_price' => $component->expense->total_price,
                        ] : null,
                    ];
                })->values(),
            ];
        })->values() ?? collect();

        $buyers = $selectedStand?->sale?->map(function (StandSales $sale) {
            $customerName = trim((string) $sale->getAttribute('customer'));

            return [
                'id' => $sale->id,
                'customer' => $customerName !== '' ? $customerName : 'Walk-in customer',
                'order_type' => $sale->order_type,
                'send_option' => $sale->send_option,
                'transaction' => $sale->transaction,
                'delivered_at' => $sale->delivered_at,
                'is_delivered' => filled($sale->delivered_at),
                'items' => $sale->order->map(fn (FoodOrder $order) => [
                    'id' => $order->id,
                    'menu' => $order->menu?->name,
                    'amount' => $order->amount,
                ])->values(),
            ];
        })->values() ?? collect();

        return Inertia::render('Staff/Business/MenuBoard', [
            'stands' => $stands,
            'selectedStand' => $selectedStand,
            'expenseItems' => $expenseItems,
            'menus' => $menus,
            'buyers' => $buyers,
            'menu_category' => MenuItem::where('stand_id', $selectedStandId)->get()->groupBy('category'),
            'all_categories' => MenuItem::select('category')->distinct()->pluck('category')->toArray(),
            'food_tag_list' => \App\Models\FoodsTag::all(),
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    public function storeMenu(Request $request)
    {
        $validated = $request->validate([
            'stand_id' => ['required', 'integer', 'exists:stand,id'],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'food_tag' => ['required', 'array'],
            'price' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'volume' => ['nullable', 'numeric', 'min:0'],
            'volume_unit' => ['nullable', 'string', 'max:50'],
            'mass' => ['nullable', 'numeric', 'min:0'],
            'mass_unit' => ['nullable', 'string', 'max:50'],
            'image' => ['nullable', 'file', 'image', 'max:5120'],
        ]);

        $stand = Stand::findOrFail($validated['stand_id']);
        if ((int) $request->user()->roles_id === 11) {
            abort_unless($stand->production()->where('users.id', $request->user()->id)->exists(), 403, 'Anda tidak ditugaskan pada stand ini.');
        }

        $data = [
            'stand_id' => $validated['stand_id'],
            'name' => $validated['name'],
            'category' => $validated['category'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'volume' => $validated['volume'] ?? null,
            'volume_unit' => $validated['volume_unit'] ?? null,
            'mass' => $validated['mass'] ?? null,
            'mass_unit' => $validated['mass_unit'] ?? null,
            'sale' => 0,
            'is_published' => false,
            'workflow_status' => 'draft',
        ];

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = 'M_' . time() . '_' . $image->getClientOriginalName();
            $image->storeAs('images/shop/foods/menu', $imageName, config('app.env') === 'production' ? 'google' : 'public');
            $data['image'] = $imageName;
        }

        $menu = MenuItem::create($data);
        $menu->tags()->attach($validated['food_tag']);

        $destination = (int) $request->user()->roles_id === 11
            ? 'staff.production.panel.index'
            : 'staff.sales-distribution.index';

        return redirect()
            ->route($destination, ['stand_id' => $menu->stand_id])
            ->with('notif', ['type' => 'info', 'message' => 'Menu baru berhasil dibuat.']);
    }

    public function attachRecipe(Request $request, MenuItem $menu)
    {
        $validated = $request->validate([
            'components' => ['present', 'array'],
            'components.*.stand_expense_id' => ['required', 'integer', 'distinct', 'exists:stand_expense_item,id'],
            'components.*.quantity_used' => ['required', 'numeric', 'min:0.01'],
        ]);

        $expenseIds = StandExpense::whereIn('id', collect($validated['components'])->pluck('stand_expense_id'))
            ->where('stand_id', $menu->stand_id)
            ->pluck('id');
        if ($expenseIds->count() !== count($validated['components'])) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'components' => 'Semua bahan resep harus berasal dari stand yang sama dengan menu.',
            ]);
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $menu) {
            $submittedIds = collect($validated['components'])->pluck('stand_expense_id')->all();
            $menu->recipeComponents()->whereNotIn('stand_expense_id', $submittedIds)->delete();

            foreach ($validated['components'] as $component) {
                $expense = StandExpense::find($component['stand_expense_id']);
                RecipeComponent::withTrashed()->updateOrCreate(
                [
                    'menu_id' => $menu->id,
                    'stand_expense_id' => $component['stand_expense_id'],
                ],
                [
                    'quantity_used' => $component['quantity_used'],
                    'unit_used' => $expense?->unit,
                    'deleted_at' => null,
                ]
            );
            }
        });

        return redirect()
            ->route('staff.sales-distribution.index', ['stand_id' => $menu->stand_id])
            ->with('notif', ['type' => 'info', 'message' => 'Resep menu berhasil disimpan.']);
    }

    public function togglePublish(MenuItem $menu)
    {
        if (! $menu->is_published && ($menu->workflow_status !== 'ready' || ! $menu->recipeComponents()->exists())) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'menu' => 'Menu harus berstatus siap dijual dan memiliki resep sebelum dipublikasikan.',
            ]);
        }

        $menu->is_published = ! (bool) $menu->is_published;
        $menu->published_at = $menu->is_published ? now() : null;
        $menu->workflow_status = $menu->is_published ? 'published' : 'ready';
        $menu->save();

        return back()->with('notif', [
            'type' => 'info',
            'message' => $menu->is_published ? 'Menu dipublikasikan ke shop.' : 'Menu ditarik dari shop.',
        ]);
    }

    public function toggleDelivery(StandSales $sale)
    {
        $sale->delivered_at = $sale->delivered_at ? null : now();
        $sale->save();

        return back()->with('notif', [
            'type' => 'info',
            'message' => $sale->delivered_at ? 'Order ditandai sudah diantar.' : 'Checklist pengantaran dibatalkan.',
        ]);
    }

    private function calculateMenuCost(MenuItem $menu): ?float
    {
        $total = 0;
        $hasComponent = false;

        foreach ($menu->recipeComponents as $component) {
            if (! $component->expense || ! $component->expense->qty) {
                continue;
            }

            $hasComponent = true;
            $unitPrice = $component->expense->total_price / max(1, (float) $component->expense->qty);
            $total += $unitPrice * (float) $component->quantity_used;
        }

        return $hasComponent ? round($total, 2) : null;
    }
}
