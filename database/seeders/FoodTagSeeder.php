<?php

namespace Database\Seeders;

use App\Models\FoodsTag;
use Illuminate\Database\Seeder;

class FoodTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultTags = [
            ['name' => 'Makanan Berat', 'color' => '#2563eb'],
            ['name' => 'Snack & Cemilan', 'color' => '#7c3aed'],
            ['name' => 'Minuman Dingin', 'color' => '#0284c7'],
            ['name' => 'Minuman Hangat', 'color' => '#ea580c'],
            ['name' => 'Pedas', 'color' => '#dc2626'],
            ['name' => 'Manis', 'color' => '#d97706'],
            ['name' => 'Gurih / Asin', 'color' => '#059669'],
            ['name' => 'Crispy', 'color' => '#ca8a04'],
            ['name' => 'Best Seller', 'color' => '#e11d48'],
            ['name' => 'Signature', 'color' => '#9333ea'],
            ['name' => 'Halal', 'color' => '#16a34a'],
        ];

        foreach ($defaultTags as $tag) {
            FoodsTag::withTrashed()->updateOrCreate(
                ['name' => $tag['name']],
                ['color' => $tag['color'], 'deleted_at' => null]
            );
        }
    }
}
