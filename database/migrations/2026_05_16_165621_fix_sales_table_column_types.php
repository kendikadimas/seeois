<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Fix sales table: cashier_id and stand_id were tinyInteger (max 127 signed),
     * causing out-of-range errors when user/stand IDs exceed 127.
     * Change both to unsignedInteger to match the users and stand tables.
     */
    public function up(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->unsignedInteger('cashier_id')->default(0)->change();
            $table->unsignedInteger('stand_id')->change();
        });
    }

    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->tinyInteger('cashier_id')->default(0)->change();
            $table->tinyInteger('stand_id')->change();
        });
    }
};
