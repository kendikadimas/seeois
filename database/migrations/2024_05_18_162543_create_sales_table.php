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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('cashier_id')->default(0);
            $table->tinyInteger('stand_id');
            $table->integer('discount')->default(0);
            $table->integer('transaction');
            $table->string('customer')->nullable();
            $table->integer('customer_id')->nullable();
            $table->string('receipt_income', 50)->nullable();
            $table->integer('voucher_id')->nullable();
            $table->string('order_type', 50)->nullable();
            $table->string('send_option', 50)->nullable();
            $table->integer('payment_method_id')->nullable();
            $table->integer('payment_price')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
