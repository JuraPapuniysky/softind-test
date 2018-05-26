<?php

namespace App\Http\Controllers;

use App\EmployeeCharacteristic;
use App\EmployeeProject;
use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * @return array
     */
    public function index(){
       return ['projects' => Project::all()];
    }

    public function add(Request $request)
    {
        return ['projects' => Project::addEmployeeProject($request->employee_id, $request->project_id)];
    }

    public function deleteEmployeeProject(Request $request)
    {
        if (Project::deleteEmployeeProject($request->employee_id, $request->project_id)){
            return 204;
        }
    }
}
