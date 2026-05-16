<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GovernanceYear extends Model
{
    protected $fillable = ['year', 'label', 'is_active', 'activated_by', 'activated_at'];

    protected $casts = [
        'is_active'    => 'boolean',
        'activated_at' => 'datetime',
    ];

    /** The CEO who activated this year */
    public function activatedBy()
    {
        return $this->belongsTo(User::class, 'activated_by');
    }

    /** Scope: only the currently active year */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /** Convenience: get the single active GovernanceYear or null */
    public static function current(): ?self
    {
        return static::where('is_active', true)->first();
    }
}
