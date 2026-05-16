<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add year_id (FK to governance_years) to the main data tables
     * so each record belongs to a governance period.
     * Default null = belongs to all years / legacy data.
     */
    public function up(): void
    {
        $tables = ['stand', 'program', 'department', 'users'];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && !Schema::hasColumn($table, 'year_id')) {
                Schema::table($table, function (Blueprint $t) {
                    $t->unsignedBigInteger('year_id')->nullable()->after('id');
                    $t->foreign('year_id')->references('id')->on('governance_years')->nullOnDelete();
                });
            }
        }
    }

    public function down(): void
    {
        $tables = ['stand', 'program', 'department', 'users'];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && Schema::hasColumn($table, 'year_id')) {
                Schema::table($table, function (Blueprint $t) use ($table) {
                    $t->dropForeign([$table === 'users' ? 'users_year_id_foreign' : "{$table}_year_id_foreign"]);
                    $t->dropColumn('year_id');
                });
            }
        }
    }
};
