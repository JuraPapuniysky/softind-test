<?php

use Illuminate\Database\Seeder;
use App\Employee;
use App\Characteristic;
use App\EmployeeCharacteristic;

class EmployeeCharacteristicTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Employee::get();
        foreach (Employee::get() as $employee){
            foreach (Characteristic::get() as $characteristic){
                EmployeeCharacteristic::create([
                    'employee_id' => $employee->id,
                    'characteristic_id' => $characteristic->id,
                    'score' => rand(1, 10),
                ]);
            }
        }
    }
}
