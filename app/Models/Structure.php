<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Structure extends Model
{
    /** @use HasFactory<\Database\Factories\StructureFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'role_title',
        'department_name',
        'image_path',
        'order_num',
        'is_executive',
    ];
}
