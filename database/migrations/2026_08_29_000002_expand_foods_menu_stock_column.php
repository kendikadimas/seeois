<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('foods_menu', function (Blueprint $table) {
            $table->unsignedInteger('stock')->default(0)->change();
        });
    }

    public function down(): void
    {
        Schema::table('foods_menu', function (Blueprint $table) {
            $table->tinyInteger('stock')->default(0)->change();
        });
    }
};
