<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecipeComponent extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'menu_recipe_components';

    protected $fillable = [
        'menu_id',
        'stand_expense_id',
        'quantity_used',
        'unit_used',
        'price',
    ];

    public function menu(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'menu_id');
    }

    public function expense(): BelongsTo
    {
        return $this->belongsTo(StandExpense::class, 'stand_expense_id');
    }
}
