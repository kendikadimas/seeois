<?php

namespace App\Services;

use App\Models\Stand;
use App\Models\RecipeComponent;

class ProfitCalculator
{
    /**
     * Calculate stand profit using recipe components.
     * Returns null if no recipe data (fallback should be used).
     */
    public static function calculateStandProfit(int $standId): ?float
    {
        $stand = Stand::with(['menu'])->find($standId);
        if (!$stand) {
            return null;
        }
        $menuItems = $stand->menu;
        if ($menuItems->isEmpty()) {
            return 0.0;
        }
        $menuIds = $menuItems->pluck('id');
        $hasRecipe = RecipeComponent::whereIn('menu_id', $menuIds)->exists();
        if (!$hasRecipe) {
            return null; // signal fallback usage
        }
        $totalProfit = 0.0;
        foreach ($menuItems as $menu) {
            $components = RecipeComponent::with(['expense'])->where('menu_id', $menu->id)->get();
            if ($components->isEmpty()) {
                // No recipe for this menu, treat full price as revenue without COGS deduction
                // Packaging still applies if configured
                $packagingCost = self::resolvePackagingCost($menu->category);
                $totalProfit += $menu->sale * ($menu->price - $packagingCost);
                continue;
            }
            $unitCost = 0.0;
            foreach ($components as $component) {
                // Only count validated expense items (operational approved)
                if ($component->expense && $component->expense->operational_id > 0) {
                    // Derive unit purchase cost: total_price / qty (guard divide by zero)
                    $expense = $component->expense;
                    $baseQty = $expense->qty > 0 ? $expense->qty : 1; // avoid division by zero
                    $perUnitPurchaseCost = $expense->total_price / $baseQty; // cost per 1 unit of expense item
                    // quantity_used expresses how many units of this ingredient per ONE menu output
                    $unitCost += ($perUnitPurchaseCost * $component->quantity_used);
                }
            }
            // Add packaging cost per sold unit based on category mapping
            $unitCost += self::resolvePackagingCost($menu->category);
            $unitProfit = $menu->price - $unitCost;
            $totalProfit += $menu->sale * $unitProfit;
        }
        return $totalProfit;
    }

    /**
     * Resolve packaging cost for a given menu category.
     */
    protected static function resolvePackagingCost(?string $category): float
    {
        $map = config('packaging.categories', []);
        $default = config('packaging.default', 0.0);
        if (!$category) {
            return $default;
        }
        return isset($map[$category]) ? (float) $map[$category] : (float) $default;
    }
}
