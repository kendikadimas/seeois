<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('internship_applications', function (Blueprint $table) {
            $table->integer('internship_year')->nullable()->after('willing_to_be_placed_elsewhere');
            $table->string('status')->default('pending')->after('internship_year');
            $table->foreignId('reviewed_by')->nullable()->after('status')->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable()->after('reviewed_by');
            $table->text('decision_note')->nullable()->after('reviewed_at');
            $table->timestamp('announcement_sent_at')->nullable()->after('decision_note');
        });
    }

    public function down(): void
    {
        Schema::table('internship_applications', function (Blueprint $table) {
            $table->dropConstrainedForeignId('reviewed_by');
            $table->dropColumn([
                'internship_year',
                'status',
                'reviewed_at',
                'decision_note',
                'announcement_sent_at',
            ]);
        });
    }
};
