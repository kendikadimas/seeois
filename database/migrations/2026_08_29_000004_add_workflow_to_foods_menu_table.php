<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('foods_menu', function (Blueprint $table) {
            $table->string('workflow_status', 30)->default('draft')->after('stock');
            $table->foreignId('production_ready_by')->nullable()->after('workflow_status')->constrained('users')->nullOnDelete();
            $table->timestamp('production_ready_at')->nullable()->after('production_ready_by');
        });
    }

    public function down(): void
    {
        Schema::table('foods_menu', function (Blueprint $table) {
            $table->dropConstrainedForeignId('production_ready_by');
            $table->dropColumn(['workflow_status', 'production_ready_at']);
        });
    }
};
