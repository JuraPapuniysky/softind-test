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
            ->join('characteristics', 'characteristics.id', '=', 'employee_characteristic.characteristic_id')
            ->select(DB::raw('distinct(characteristic_id)'), DB::raw('sum(score) as average_score'), 'name')
            ->groupBy('characteristic_id')
            ->get();
    }

}
