<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GeneralContact extends Model
{
    use SoftDeletes;

    protected $table = 'general_contact';

    protected $fillable = [
        'title',
        'name',
        'phone',
        'address',
    ];
}
