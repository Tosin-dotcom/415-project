<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('loan_payments', function (Blueprint $table) {
            $table->date('due_date')->nullable();
            $table->enum('status', ['late', 'paid', 'pending', 'partial', 'balance'])->default('pending');
            $table->decimal('balance', 15, 2)->default(0.00);
        });
    }

    public function down()
    {
        Schema::table('loan_payments', function (Blueprint $table) {
            $table->dropColumn(['due_date', 'status', 'balance']);
        });
    }
};

