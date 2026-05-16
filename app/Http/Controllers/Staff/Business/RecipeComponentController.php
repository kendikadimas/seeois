<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MenuItem;
use App\Models\StandExpense;
use App\Models\RecipeComponent;
use App\Services\ProfitCalculator;
use Illuminate\Support\Facades\Log;

class RecipeComponentController extends Controller
{
    /**
     * Store or update recipe components (ingredient usage) for a menu item.
     * Expected payload:
     * components: [ { stand_expense_id: int, quantity_used: numeric }, ... ]
     */
    public function store(Request $request, int $menu_id)
    {
        $request->validate([
            'components' => ['required', 'array', 'min:1'],
            'components.*.stand_expense_id' => ['required', 'integer'],
            'components.*.quantity_used' => ['required', 'numeric', 'gt:0'],
        ]);

        $menu = MenuItem::find($menu_id);
        if (!$menu) {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Menu not found.']);
        }
        $standId = $menu->stand_id;

        // Do not allow editing after stand validated sales (inactive), unless Super Admin
        $auth_user = auth()->user();
        if ($auth_user->roles_id != 99 && $menu->stand && $menu->stand->sale_validation > 0) {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Stand is inactive. Cannot modify recipe components.']);
        }

        $components = collect($request->input('components'));
        $created = 0;
        $updated = 0;
        $skipped = 0;

        foreach ($components as $comp) {
            $expense = StandExpense::find($comp['stand_expense_id']);
            if (!$expense || $expense->stand_id !== $standId) {
                $skipped++;
                continue; // invalid expense reference
            }
            if (!($expense->operational_id > 0)) {
                // Only allow validated expense items to be used as ingredients
                $skipped++;
                continue;
            }
            $existing = RecipeComponent::where('menu_id', $menu_id)
                ->where('stand_expense_id', $expense->id)
                ->first();
            if ($existing) {
                $existing->quantity_used = $comp['quantity_used'];
                $existing->unit_used = $expense->unit; // inherit unit from expense record
                $existing->price = $expense->price; // SAVE PRICE HERE
                $existing->save();
                $updated++;
            } else {
                RecipeComponent::create([
                    'menu_id' => $menu_id,
                    'stand_expense_id' => $expense->id,
                    'quantity_used' => $comp['quantity_used'],
                    'unit_used' => $expense->unit,
                    'price' => $expense->price, // SAVE PRICE HERE
                ]);
                $created++;
            }
        }

        // Recalculate profit after ingredient changes
        $profit = ProfitCalculator::calculateStandProfit($standId);
        if ($profit !== null) {
            $menu->stand->profit = $profit;
            $menu->stand->save();
        }

        Log::info('[RecipeComponentController@store] Recipe updated', [
            'menu_id' => $menu_id,
            'created' => $created,
            'updated' => $updated,
            'skipped' => $skipped,
        ]);

        return back()->with('notif', ['type' => 'info', 'message' => 'Ingredients saved (created: '.$created.', updated: '.$updated.', skipped: '.$skipped.').']);
    }
}
