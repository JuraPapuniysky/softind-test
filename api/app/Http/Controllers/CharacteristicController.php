<?php

namespace App\Http\Controllers;

use App\Characteristic;
use App\Employee;
use Illuminate\Http\Request;

class CharacteristicController extends Controller
{
    public function updateEmployeeCharacteristic(Request $request)
    {
        $employee = Employee::findOrFail($request->employee_id);
        $characteristic = Characteristic::findOrFail($request->characteristic_id);

        return Characteristic::updateEmployeeCharacteristic($employee, $characteristic, $request->score);
    }
}
