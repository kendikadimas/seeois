<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained('foods_menu')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->integer('change');
            $table->unsignedInteger('stock_before');
            $table->unsignedInteger('stock_after');
            $table->string('reason', 100)->default('production_adjustment');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['menu_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_stock_movements');
    }
};
