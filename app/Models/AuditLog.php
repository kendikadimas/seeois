<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    public $timestamps = false;

    protected $fillable = ['user_id', 'action', 'method', 'path', 'status', 'payload', 'ip_address', 'user_agent', 'created_at'];

    protected $casts = ['payload' => 'array', 'created_at' => 'datetime'];
}
