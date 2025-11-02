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
        Schema::create('voucher', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30);
            $table->string('code', 30);
            $table->integer('point')->default(0);
            $table->date('start_date');
            $table->date('end_date');
            $table->string('image')->nullable();
            $table->integer('user_quota');
            $table->integer('min_transaction')->default(0);
            $table->string('discount_type', 30);
            $table->integer('discount_price')->default(0);
            $table->integer('discount_percent')->default(0);
            $table->integer('discount_max_price')->default(0);
            $table->integer('operational_id')->default(0);
            $table->softDeletes();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher');
    }
};
