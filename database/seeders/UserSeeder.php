<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'fname' => 'Admin',
            'lname' => 'Admin',
            'email' => 'asedasfinds@gmail.com',
            'password' => Hash::make('asedasfinds1234567890'),

        ]);
    }
}
