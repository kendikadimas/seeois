<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cash_in_item', function (Blueprint $table) {
            $table->foreignId('year_id')->nullable()->constrained('governance_years')->nullOnDelete();
        });

        Schema::table('contribution', function (Blueprint $table) {
            $table->foreignId('year_id')->nullable()->constrained('governance_years')->nullOnDelete();
        });

        Schema::table('contribution_configuration', function (Blueprint $table) {
            $table->foreignId('year_id')->nullable()->constrained('governance_years')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cash_in_item', function (Blueprint $table) {
            $table->dropConstrainedForeignId('year_id');
        });

        Schema::table('contribution', function (Blueprint $table) {
            $table->dropConstrainedForeignId('year_id');
        });

        Schema::table('contribution_configuration', function (Blueprint $table) {
            $table->dropConstrainedForeignId('year_id');
        });
    }
};
