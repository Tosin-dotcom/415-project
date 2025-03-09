<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->enum('status', ['ongoing', 'paid', 'defaulted'])->default('ongoing');
            $table->decimal('total_paid', 10, 2)->default(0);
        });
    }

    public function down()
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->dropColumn(['status', 'total_paid']);
        });
    }
};
