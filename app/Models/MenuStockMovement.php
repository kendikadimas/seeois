<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenuStockMovement extends Model
{
    protected $fillable = [
        'menu_id',
        'user_id',
        'request_id',
        'change',
        'stock_before',
        'stock_after',
        'reason',
        'notes',
    ];

    public function menu(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'menu_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
