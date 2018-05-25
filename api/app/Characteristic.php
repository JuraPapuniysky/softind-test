<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Characteristic extends Model
{

    public static function updateEmployeeCharacteristic(Employee $employee, $characteristic, $score)
    {
        $characteristicEmployee = EmployeeCharacteristic::where('employee_id', '=', $employee->id)
            ->where('characteristic_id', '=', $characteristic->id)->first();
        $characteristicEmployee->score = $score;
        $characteristicEmployee->save();
        return $employee->characteristics;
    }
}
