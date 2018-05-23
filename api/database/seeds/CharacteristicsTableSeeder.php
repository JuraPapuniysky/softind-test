<?php

use Illuminate\Database\Seeder;
use App\Characteristic;

class CharacteristicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $characteristics = [
            'Sociability',
            'Engineering skills',
            'Time management',
            'Knowledge of languages',
        ];
        foreach ($characteristics as $characteristic){
            Characteristic::create([
                'name' => $characteristic,
            ]);
        }

    }
}
