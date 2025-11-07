<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternshipCertificatesTable extends Migration
{
    public function up()
    {
        Schema::create('internship_certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('internship_application_id')->nullable()->constrained('internship_applications')->cascadeOnDelete();
            $table->foreignId('generated_for_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('file')->nullable(); // path di storage disk 'public'
            $table->enum('status', ['draft','published','revoked'])->default('published');
            $table->foreignId('issued_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('issued_at')->nullable();
            $table->string('download_token', 64)->nullable()->index();
            $table->unsignedInteger('download_count')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('internship_certificates');
    }
}