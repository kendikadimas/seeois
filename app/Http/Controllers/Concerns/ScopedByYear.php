<?php

namespace App\Http\Controllers\Concerns;

use App\Models\GovernanceYear;

/**
 * Trait ScopedByYear
 *
 * Provides a helper to get the active GovernanceYear and its ID.
 * Include in any controller that needs year-scoped data queries.
 *
 * Usage:
 *   use App\Http\Controllers\Concerns\ScopedByYear;
 *   ...
 *   [$activeYear, $yearId] = $this->activeYearScope();
 *   Model::where('year_id', $yearId)->get();
 */
trait ScopedByYear
{
    /**
     * Returns [GovernanceYear|null, int|null].
     * $yearId is the PK of the active year, or null if no year is active.
     */
    protected function activeYearScope(): array
    {
        $activeYear = GovernanceYear::current();
        return [$activeYear, $activeYear?->id];
    }

    /**
     * Apply year scope to an Eloquent query builder.
     * Strict: only records where year_id matches the active year.
     * If no active year, returns nothing (empty result — no year = no data).
     */
    protected function applyYearScope($query, ?int $yearId)
    {
        if ($yearId === null) {
            // No active year → return no records
            return $query->whereRaw('1 = 0');
        }
        // Show only records belonging to this exact year
        return $query->where('year_id', $yearId);
    }
}
