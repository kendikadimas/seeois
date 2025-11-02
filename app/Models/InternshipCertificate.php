<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InternshipCertificate extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'internship_application_id',
        'generated_for_user_id',
        'file',
        'status',
        'issued_by',
        'issued_at',
        'download_token',
    ];

    public function application()
    {
        return $this->belongsTo(InternshipApplication::class, 'internship_application_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'generated_for_user_id');
    }

    public function issuer()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }
}