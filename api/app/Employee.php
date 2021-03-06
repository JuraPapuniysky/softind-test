<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Employee extends Model
{

    protected $fillable = ['full_name'];
    const DEFAULT_PHOTO = 'files/photos/default/default_employee.jpg';
    const PHOTO_PATH = 'files/photos/employees/';

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
     * @param Request $request
     */
    public function updateEmployee(Request $request)
    {
        $extension = str_replace('/', '.', stristr($request['photo']['filetype'], '/'));
        $photoPath = self::PHOTO_PATH . $this->id . '_' . time() . $extension;
        file_put_contents($photoPath, base64_decode($request['photo']['value']));
        $this->full_name = $request->full_name;
        $this->save();
        $this->savePhoto($photoPath);
    }

    /**
     * @param $src
     */
    private function savePhoto($src)
    {
        if (($photo = Photo::where('employee_id', '=', $this->id)->first()) !== null) {
            unlink($photo->src);
            $photo->src = $src;
        } else {
            $photo = new Photo();
            $photo->src = $src;
            $photo->employee_id = $this->id;
        }
        $photo->save();
    }

    /**
     * @return string
     */
    public function getPhoto()
    {
        if ($this->photo == null) {
            return self::DEFAULT_PHOTO;
        }
        return $this->photo->src;
    }


    public function delete()
    {
        if ($this->photo !== null){
            unlink($this->photo->src);
            $this->photo->delete();
        }
        EmployeeProject::where('employee_id', '=', $this->id)->delete();
        EmployeeCharacteristic::where('employee_id', '=', $this->id)->delete();
        return parent::delete();
    }

    public function createEmployeeData()
    {
        foreach (Characteristic::get() as $characeristic){
            EmployeeCharacteristic::create([
               'characteristic_id' => $characeristic->id,
               'employee_id' => $this->id,
            ]);
        }
    }

    /**
     * @param $employees Employee[]
     * @return array
     */
    public static function getEmployeesData($employees = null)
    {
        if ($employees === null) {
            $employees = self::all();
        }
        return self::makeEmployees($employees);
    }

    /**
     * @param $employees
     * @return array
     */
    public static function getEmployeesSearchData($employees)
    {
        if (count($employees) == 0) {
            return [];
        }
        return self::makeEmployees($employees);
    }

    /**
     * @param $employees
     * @return array
     */
    private static function makeEmployees($employees)
    {
        $data = [];
        foreach ($employees as $employee) {
            array_push($data, [
                'id' => $employee->id,
                'full_name' => $employee->full_name,
                'characteristics' => $employee->characteristics,
                'projects' => $employee->projects,
                'photo' => ['src' => $employee->getPhoto()],
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
