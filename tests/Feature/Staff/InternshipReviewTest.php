<?php

use App\Models\InternshipApplication;
use App\Models\Program;
use Illuminate\Support\Facades\Mail;

describe('Internship staff access', function () {
    beforeEach(function () {
        Program::create(['name' => 'Internship', 'department_id' => 1, 'pic_id' => 0]);
    });

    test('guest cannot access internship list', function () {
        $this->get(STAFF_PREFIX . '/internship')->assertRedirect('/login');
    });

    test('CEO can access internship applications', function () {
        $this->actingAs(staffUser(1))
            ->get(STAFF_PREFIX . '/internship')
            ->assertOk();
    });

    test('HR can access internship applications', function () {
        $this->actingAs(staffUser(6))
            ->get(STAFF_PREFIX . '/internship')
            ->assertOk();
    });

    test('normal staff cannot access internship applications', function () {
        $this->actingAs(staffUser(4))
            ->get(STAFF_PREFIX . '/internship')
            ->assertForbidden();
    });

    test('internship PIC can access applications', function () {
        $pic = staffUser(4);
        Program::where('name', 'Internship')->update(['pic_id' => $pic->id]);

        $this->actingAs($pic)
            ->get(STAFF_PREFIX . '/internship')
            ->assertOk();
    });
});

describe('Internship review decision (role 1,5,6,15,99)', function () {
    beforeEach(function () {
        Program::create(['name' => 'Internship', 'department_id' => 1, 'pic_id' => 0]);
        Mail::fake();

        $this->application = InternshipApplication::create([
            'name'          => 'Calon Magang',
            'nim'           => 'H1A' . random_int(10000, 99999),
            'phone_number'  => '081' . random_int(10000000, 99999999),
            'email'         => 'calon@mhs.unsoed.ac.id',
            'study_program' => 'Informatika',
            'internship_year' => now()->year,
            'division_choice_1' => 'Software',
            'reason_choice_1'   => 'Minat',
            'division_choice_2' => 'Marketing',
            'reason_choice_2'   => 'Alternatif',
            'willing_to_be_placed_elsewhere' => true,
            'status'        => 'pending',
            'krs_path'      => 'internship/krs/test.webp',
        ]);
    });

    test('HR can accept internship application', function () {
        $hr = staffUser(6);

        $this->actingAs($hr)
            ->post(STAFF_PREFIX . "/internship/review/{$this->application->id}", [
                'status'        => 'accepted',
                'decision_note' => 'Selamat diterima',
            ])
            ->assertRedirect()
            ->assertSessionHas('notif.type', 'info');

        $this->application->refresh();
        expect($this->application->status)->toBe('accepted');
        expect($this->application->reviewed_by)->toBe($hr->id);

        Mail::assertSent(\App\Mail\InternshipAnnouncementMail::class);
    });

    test('HR can reject internship application', function () {
        $hr = staffUser(6);

        $this->actingAs($hr)
            ->post(STAFF_PREFIX . "/internship/review/{$this->application->id}", [
                'status' => 'rejected',
            ])
            ->assertRedirect();

        expect($this->application->fresh()->status)->toBe('rejected');
    });

    test('role 10 cannot review internship application', function () {
        $this->actingAs(staffUser(10))
            ->post(STAFF_PREFIX . "/internship/review/{$this->application->id}", [
                'status' => 'accepted',
            ])
            ->assertForbidden();

        expect($this->application->fresh()->status)->toBe('pending');
    });

    test('review requires valid status', function () {
        $this->actingAs(staffUser(6))
            ->post(STAFF_PREFIX . "/internship/review/{$this->application->id}", [
                'status' => 'maybe',
            ])
            ->assertSessionHasErrors('status');
    });
});

describe('Public internship registration', function () {
    beforeEach(function () {
        useFakeStorageDisks();
        Program::create(['name' => 'Internship', 'department_id' => 1, 'pic_id' => 0]);
    });

    test('public can open registration form', function () {
        $this->get('/seeo/internship/register')->assertOk();
    });
});
