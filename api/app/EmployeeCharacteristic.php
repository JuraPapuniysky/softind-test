<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EmployeeCharacteristic extends Model
{
    protected $table = 'employee_characteristic';

    public static function getAverage()
    {
        return DB::table('employee_characteristic')
            ->select(DB::raw('distinct(characteristic_id)'), DB::raw('sum(score) as average_score'))
            ->groupBy('characteristic_id')
            ->get();
    }

}
