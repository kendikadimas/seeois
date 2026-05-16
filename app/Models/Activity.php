<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image_path',
        'gallery',
        'category',
        'date',
        'is_published',
    ];

    protected $casts = [
        'gallery' => 'array',
        'is_published' => 'boolean',
        'date' => 'date',
    ];
}
