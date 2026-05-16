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
        Schema::table('menu_recipe_components', function (Blueprint $table) {
            $table->double('price')->default(0)->after('unit_used');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('menu_recipe_components', function (Blueprint $table) {
            $table->dropColumn('price');
        });
    }
};
