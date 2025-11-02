<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        setlocale(LC_TIME, 'IND');

        // Seeds roles table
        // DB::table('roles')->insert(
        //     [
        //         ['name' => 'Chief Executive Officer'],
        //         ['name' => 'Financial Officer'],
        //         ['name' => 'Operational Officer'],
        //         ['name' => 'Staff']
        //     ]
        // );

        // Seeds balance table
        // DB::table('blaterian_food_balance')->insert(
        //     [
        //         [
        //             'expense' => 0,
        //             'income' => 0,
        //             'balance' => 0
        //         ],
        //     ]
        // );

        // Seeds balance table
        // DB::table('payment_method')->insert(
        //     [
        //         [
        //             'name' => 'Cash',
        //             'created_at' => now(),
        //         ],
        //         [
        //             'name' => 'QRIS',
        //             'created_at' => now(),
        //         ],

        //     ]
        // );

        // Seeds balance table
        DB::table('customer_feedback')->insert(
            [
                [
                    'customer_id' => 2,
                    'rate' => 4,
                    'message' => 'Worth-it for the price',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'customer_id' => 50,
                    'rate' => 5,
                    'message' => 'Great food and service',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'customer_id' => 51,
                    'rate' => 5,
                    'message' => 'I love the food',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],


            ]
        );





        // Seeds user
        $user_list = $this->create_user(40)->toArray();
        // DB::table('users')->insert(
        //     $user_list
        // );
    }

    function create_user($number)
    {
        $user_list = collect([]);
        for ($i = 1; $i <= $number; $i++) {
            $user_list->push(
                [
                    'name' => 'User' . $i,
                    'email' => 'user' . $i . '@mail.com',
                    'phone' => '08965618684' . $i,
                    'password' => '$2y$12$LfrUXNU2KrTD0/bv5s7k3.6BS5g5OXYalrEpwkZGMYaAzQ9vIDfny',
                    'email_verified_at' => now(),
                    'roles_id' => 4,
                ]
            );
        }

        return $user_list;
    }
}
