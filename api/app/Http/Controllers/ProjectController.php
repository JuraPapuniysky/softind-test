<?php

namespace App\Http\Controllers;

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
        //return Project::addEmployeeProject($employeeId, $projectId);
        return $request;
    }
}
