<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('internship_applications', function (Blueprint $table) {
            $table->unsignedBigInteger('program_id')->nullable()->after('id');
            $table->unsignedBigInteger('user_id')->nullable()->after('program_id');
            $table->foreign('program_id')->references('id')->on('program')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('internship_applications', function (Blueprint $table) {
            $table->dropForeignKey(['program_id']);
            $table->dropForeignKey(['user_id']);
            $table->dropColumn(['program_id', 'user_id']);
        });
    }
};
