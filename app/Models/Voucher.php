<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voucher extends Model
{
    use SoftDeletes;

    protected $table = 'voucher';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'name',
        'code',
        'point',
        'start_date',
        'end_date',
        'image',
        'user_quota',
        'min_transaction',
        'discount_type',
        'discount_price',
        'discount_percent',
        'discount_max_price',
        'operational_id',
    ];

    /**
     * 
     * Voucher that belong  user as financial.
     */
    public function customer()
    {
        return $this->belongsToMany(User::class, 'customer_voucher', 'voucher_id', 'customer_id');
    }
    /**
     * 
     * Operational Staff that in charge of this voucher.
     */
    public function operational()
    {
        return $this->belongsTo(User::class, 'operational_id');
    }
}
