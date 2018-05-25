<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmployeeProject extends Model
{
    protected $table = 'employee_project';

    protected $fillable = ['employee_id', 'project_id'];
}
