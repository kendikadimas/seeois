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
     * Records matching the active year or unassigned (legacy/null year_id) are included.
     * If no active year is set, unassigned records (year_id IS NULL) are returned.
     */
    protected function applyYearScope($query, ?int $yearId)
    {
        if ($yearId === null) {
            return $query->whereNull('year_id');
        }

        return $query->where(function ($q) use ($yearId) {
            $q->where('year_id', $yearId)->orWhereNull('year_id');
        });
    }
}
