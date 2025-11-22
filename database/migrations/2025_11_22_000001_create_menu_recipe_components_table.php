<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('menu_recipe_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained('foods_menu')->cascadeOnDelete();
            $table->foreignId('stand_expense_id')->nullable()->constrained('stand_expense_item')->nullOnDelete();
            $table->double('quantity_used'); // quantity of ingredient used per ONE unit of menu output
            $table->string('unit_used')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_recipe_components');
    }
};