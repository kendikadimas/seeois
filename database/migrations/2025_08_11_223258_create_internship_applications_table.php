<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('internship_applications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nim')->unique(); 
            $table->string('phone_number');
            $table->string('study_program'); 
            $table->string('division_choice_1');
            $table->text('reason_choice_1');
            $table->string('division_choice_2');
            $table->text('reason_choice_2');
            $table->boolean('willing_to_be_placed_elsewhere'); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('internship_applications');
    }
};