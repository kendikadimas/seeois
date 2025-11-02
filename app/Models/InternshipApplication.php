<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InternshipApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nim',
        'phone_number',
        'krs_path',
        'study_program',
        'email',
        'division_choice_1',
        'reason_choice_1',
        'division_choice_2',
        'reason_choice_2',
        'willing_to_be_placed_elsewhere',
        'ip_address',
        'program_id',
        'user_id',
    ];
    
    protected $casts = [
        'willing_to_be_placed_elsewhere' => 'boolean',
    ];

    /**
     * The program that has this internship application.
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    /**
     * The user (intern) that submitted this application.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}