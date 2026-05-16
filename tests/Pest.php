<?php

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "pest()" function to bind a different classes or traits.
|
*/

pest()->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\DatabaseTransactions::class)
    ->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

const STAFF_PREFIX = '/seeo/staff';

/**
 * Create a verified staff user with a specific role id.
 */
function staffUser(int $roleId): \App\Models\User
{
    return \App\Models\User::factory()->create([
        'roles_id'          => $roleId,
        'email_verified_at' => now(),
    ]);
}

/**
 * Assert HTTP GET is allowed (200) for the given role.
 */
function assertStaffGetAllowed(int $roleId, string $path): void
{
    $user = staffUser($roleId);
    test()->actingAs($user)->get($path)->assertOk();
}

/**
 * Assert HTTP GET is denied (redirect back) for the given role.
 */
function assertStaffGetDenied(int $roleId, string $path): void
{
    $user = staffUser($roleId);
    test()->actingAs($user)->get($path)->assertRedirect();
}

/**
 * Use local fake disks for public + google (avoids real Google API in tests).
 */
function useFakeStorageDisks(): void
{
    $testingRoot = storage_path('framework/testing/disks');

    config([
        'filesystems.disks.public' => [
            'driver'     => 'local',
            'root'       => $testingRoot . '/public',
            'visibility' => 'public',
            'throw'      => false,
        ],
        'filesystems.disks.google' => [
            'driver'     => 'local',
            'root'       => $testingRoot . '/google',
            'visibility' => 'public',
            'throw'      => false,
        ],
    ]);

    \Illuminate\Support\Facades\Storage::disk('public');
    \Illuminate\Support\Facades\Storage::disk('google');
}

function fakeImageUpload(string $name = 'receipt.jpg'): \Illuminate\Http\UploadedFile
{
    return \Illuminate\Http\UploadedFile::fake()->image($name, 100, 100);
}
