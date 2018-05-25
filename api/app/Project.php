<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Project extends Model
{

    protected $fillable = ['name'];

    public static function addEmployeeProject($employeeId, $projectId)
    {
        Employee::findOrFail($employeeId);
        Project::findOrFail($projectId);
        if (EmployeeCharacteristic::canAdd($employeeId)) {
            if ($employeeProject = EmployeeProject::where('project_id', '=', $projectId)
                ->where('employee_id', '=', $employeeId)->first() === null){
                EmployeeProject::create([
                    'employee_id' => $employeeId,
                    'project_id' => $projectId,
                ]);
            }
        } else {
            if (($employeeProject = EmployeeProject::where('employee_id', '=', $employeeId)->first()) !== null){
                $employeeProject->project_id = $projectId;
                $employeeProject->employee_id = $employeeId;
                $employeeProject->save();
            } else {
                EmployeeProject::create([
                    'employee_id' => $employeeId,
                    'project_id' => $projectId,
                ]);
            }
        }

        return Employee::find($employeeId)->projects;

    }


}
