<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'event_name',
        'full_name',
        'email',
        'phone',
        'institution',
        'job_title',
        'notes',
    ];
}
