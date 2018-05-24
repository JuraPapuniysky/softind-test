<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Employee extends Model
{

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function photo()
    {
        return $this->hasOne('App\Photo');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function characteristics()
    {
        return $this->belongsToMany('App\Characteristic', 'employee_characteristic')
            ->withPivot('score');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function projects()
    {
        return $this->belongsToMany('App\Project', 'employee_project');
    }

    /**
     * @param $employees Employee[]
     * @return array
     */
    public static function getEmployeesData($employees = null)
    {
        $data = [];
       if ($employees[0] === null){
            $employees = self::all();
        }
        foreach ($employees as $employee){
            array_push($data, [
                        'id' => $employee->id,
                        'full_name' => $employee->full_name,
                        'characteristics' =>  $employee->characteristics,
                        'projects' => $employee->projects,
                        'photo' => $employee->photo,
                    ]);
        }
        return $data;
    }

    /**
     * @param $search
     * @return \Illuminate\Support\Collection
     */

    public static function search($search)
    {
        return self::where('full_name', 'like', '%' . $search . '%')->get();
    }

}
