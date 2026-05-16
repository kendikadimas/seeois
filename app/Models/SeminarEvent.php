<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SeminarEvent extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'wa_link',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($event) {
            if (empty($event->slug)) {
                $event->slug = Str::slug($event->name) . '-' . Str::random(5);
            }
        });
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class, 'event_id');
    }
}
