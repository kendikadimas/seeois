<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('foods_menu', function (Blueprint $table) {
            if (!Schema::hasColumn('foods_menu', 'is_published')) {
                $table->boolean('is_published')->default(false);
            }
            if (!Schema::hasColumn('foods_menu', 'published_at')) {
                $table->timestamp('published_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('foods_menu', function (Blueprint $table) {
            $table->dropColumn(['is_published', 'published_at']);
        });
    }
};
