<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('governance_years', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('year')->unique(); // e.g. 2025, 2026
            $table->string('label')->nullable();            // e.g. "Kepengurusan 2025/2026"
            $table->boolean('is_active')->default(false);  // only one can be active at a time
            $table->unsignedBigInteger('activated_by')->nullable(); // CEO who activated
            $table->timestamp('activated_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('governance_years');
    }
};
