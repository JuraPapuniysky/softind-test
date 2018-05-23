<?php

namespace App\Http\Controllers;

use App\Employee;
use App\EmployeeCharacteristic;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * @return Employee[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return ['employees' => Employee::getEmployeesData(), 'average' => EmployeeCharacteristic::getAverage()];
    }

    /**
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        return Employee::getEmployeesData([Employee::find($id)]);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        return Employee::create($request->all());
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->update($request->all());

        return $employee;
    }

    /**
     * @param Request $request
     * @param $id
     * @return int
     */
    public function delete(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return 204;
    }

    public function search($search)
    {
        if (!empty($search)) {
            return [
                'employees' => Employee::getEmployeesData(Employee::search($search)),
                'average' => EmployeeCharacteristic::getAverage(),
            ];
        } else {
            return null;
        }
    }
}
