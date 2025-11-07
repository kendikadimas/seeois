<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'id_google',
        'email',
        'password',
        'location',
        'level',
        'phone',
        'roles_id',
        'profile_image',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['roles'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'roles_id' => 'integer',  // Force roles_id to always be integer
        ];
    }

    /**
     * Update user data.
     * 
     * @return number of affected rows
     */
    static function change(int $id, $data): int
    {
        $affected = DB::table('users')
            ->where('id', $id)
            ->update($data);
        return $affected;
    }

    /**
     * 
     * The roles that has the user.
     * 
     */
    public function roles(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * 
     * The program that belong to the user.
     * 
     */
    public function program(): HasOne
    {
        return $this->hasOne(Program::class, 'pic_id');
    }

    /**
     * 
     * The product that in charge of this  user.
     * 
     */
    public function product(): HasMany
    {
        return $this->hasMany(GoodsProduct::class, 'pic_id');
    }

    /**
     * 
     * The department that belong to the user as manager.
     * 
     */
    public function manager(): HasOne
    {
        return $this->hasOne(Department::class, 'manager_id');
    }

    /**
     * 
     * The department that belong to the user as manager.
     * 
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    /**
     * 
     * The stand that user in charge of.
     * 
     */
    public function stand(): HasOne
    {
        return $this->hasOne(Stand::class, 'pic_id');
    }

    /**
     * 
     * Contribution that belongs to this employee.
     * 
     */
    public function contribution(): HasOne
    {
        return $this->hasOne(Contribution::class, 'user_id');
    }

    /**
     * 
     * Contribution Receipt that validated by this user as financial.
     */
    public function contribution_receipt(): HasMany
    {
        return $this->hasMany(ContributionReceipt::class, 'financial_id');
    }

    /**
     * Voucher that belong  user as financial.
     */
    public function voucher()
    {
        return $this->belongsToMany(Voucher::class, 'customer_voucher', 'customer_id', 'voucher_id')->withPivot('use_date')->withTimestamps();
    }
}
