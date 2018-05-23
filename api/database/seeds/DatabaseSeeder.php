<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(EmployeesTableSeeder::class);
        $this->call(CharacteristicsTableSeeder::class);
        $this->call(ProjectsTableSeeder::class);
        $this->call(EmployeeCharacteristicTableSeeder::class);
    }
}
