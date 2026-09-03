<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('customer_voucher')) {
            return;
        }

        Schema::create('customer_voucher', function (Blueprint $table) {
            $table->foreignId('customer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('voucher_id')->constrained('voucher')->cascadeOnDelete();
            $table->date('use_date')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['customer_id', 'voucher_id']);
        });
    }

    public function down(): void
    {
        // This is a repair migration. It must not remove a table that may have
        // existed before the repair was deployed.
    }
};
