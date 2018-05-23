<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('full_name');
            $table->timestamps();
        });


        Schema::create('photos', function (Blueprint $table) {
             $table->increments('id');
             $table->string('src');
             $table->unsignedInteger('employee_id');
             $table->unique(['employee_id']);
             $table->timestamps();

             $table->foreign('employee_id')->references('id')->on('employees');
        });

        Schema::create('characteristics', function (Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('employee_characteristic', function (Blueprint $table){
            $table->increments('id');
            $table->unsignedInteger('employee_id');
            $table->unsignedInteger('characteristic_id');
            $table->unsignedInteger('score');
            $table->timestamps();

            $table->foreign('employee_id')->references('id')->on('employees');
            $table->foreign('characteristic_id')->references('id')->on('characteristics');
        });

        Schema::create('projects', function (Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('employee_project', function (Blueprint $table){
            $table->increments('id');
            $table->unsignedInteger('employee_id');
            $table->unsignedInteger('project_id');
            $table->timestamps();

            $table->foreign('employee_id')->references('id')->on('employees');
            $table->foreign('project_id')->references('id')->on('projects');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
