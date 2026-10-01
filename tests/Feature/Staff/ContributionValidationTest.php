<?php

use App\Models\CashInItem;
use App\Models\Contribution;
use App\Models\ContributionConfig;
use App\Models\ContributionReceipt;
use App\Models\GovernanceYear;
use App\Models\User;

describe('Contribution Receipt Validation (Fix 404 Regression)', function () {
    beforeEach(function () {
        $year = GovernanceYear::firstOrCreate(
            ['is_active' => true],
            ['year' => 2026, 'theme' => 'Active Governance Year']
        );

        ContributionConfig::firstOrCreate(
            ['year_id' => $year->id],
            [
                'price' => 50000,
                'start' => 1,
                'period' => 12,
            ]
        );

        CashInItem::firstOrCreate(
            ['name' => 'Contribution Charge', 'year_id' => $year->id],
            [
                'price' => 0,
                'financial_id' => 1,
            ]
        );

        $employee = staffUser(4);

        $this->contribution = Contribution::create([
            'user_id' => $employee->id,
            'year_id' => $year->id,
            'months' => 0,
        ]);

        $this->receipt = ContributionReceipt::create([
            'contribution_id' => $this->contribution->id,
            'months' => 2,
            'receipt' => 'receipt_test_' . uniqid() . '.jpg',
            'financial_id' => null,
        ]);

        $this->financeUser = staffUser(2);
    });

    test('finance officer can validate contribution receipt via standard prefixed route', function () {
        $response = $this->actingAs($this->financeUser)
            ->post("/seeo/staff/contribution/validation/{$this->receipt->id}");

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');

        $this->assertNotNull($this->receipt->fresh()->financial_id);
        $this->assertEquals($this->financeUser->id, $this->receipt->fresh()->financial_id);
        $this->assertEquals(2, $this->contribution->fresh()->months);
    });

    test('finance officer can validate contribution receipt via legacy unprefixed route without 404', function () {
        $response = $this->actingAs($this->financeUser)
            ->post("/contribution/validation/{$this->receipt->id}");

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');

        $this->assertNotNull($this->receipt->fresh()->financial_id);
        $this->assertEquals($this->financeUser->id, $this->receipt->fresh()->financial_id);
        $this->assertEquals(2, $this->contribution->fresh()->months);
    });

    test('validating an already validated receipt unvalidates it', function () {
        // Mark as already validated
        $this->receipt->update(['financial_id' => $this->financeUser->id]);
        $this->contribution->update(['months' => 2]);

        $response = $this->actingAs($this->financeUser)
            ->post("/seeo/staff/contribution/validation/{$this->receipt->id}");

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');

        $this->assertNull($this->receipt->fresh()->financial_id);
        $this->assertEquals(0, $this->contribution->fresh()->months);
    });

    test('guest is rejected from validating contribution receipts', function () {
        $this->post("/seeo/staff/contribution/validation/{$this->receipt->id}")
            ->assertRedirect('/login');

        $this->post("/contribution/validation/{$this->receipt->id}")
            ->assertRedirect('/login');
    });

    test('non-finance staff is forbidden from validating contribution receipts', function () {
        $regularStaff = staffUser(4);

        $res1 = $this->actingAs($regularStaff)->post("/seeo/staff/contribution/validation/{$this->receipt->id}");
        expect(in_array($res1->status(), [302, 403], true))->toBeTrue();

        $res2 = $this->actingAs($regularStaff)->post("/contribution/validation/{$this->receipt->id}");
        expect(in_array($res2->status(), [302, 403], true))->toBeTrue();
    });

    test('finance officer can validate expense item via standard prefixed route and legacy route without 404', function () {
        $department = \App\Models\Department::create([
            'name' => 'Divisi Keuangan Test ' . uniqid(),
            'initial' => 'DKT',
            'manager_id' => $this->financeUser->id,
            'expense' => 0,
        ]);

        $program = \App\Models\Program::create([
            'name' => 'Program Operasional ' . uniqid(),
            'department_id' => $department->id,
            'pic_id' => $this->financeUser->id,
            'expense' => 0,
        ]);

        $expense = \App\Models\ExpenseItem::create([
            'program_id' => $program->id,
            'name' => 'Beli ATK Kantor',
            'price' => 25000,
            'qty' => 2,
            'unit' => 'Pcs',
            'total_price' => 50000,
            'reciept' => 'receipt.jpg',
            'financial_id' => null,
        ]);

        // Test standard route
        $resPrefixed = $this->actingAs($this->financeUser)->post("/seeo/staff/program/expense/validate/{$expense->id}");
        $resPrefixed->assertRedirect();
        $this->assertEquals($this->financeUser->id, $expense->fresh()->financial_id);

        // Test legacy unprefixed route (should toggle unvalidate without 404)
        $resLegacy = $this->actingAs($this->financeUser)->post("/program/expense/validate/{$expense->id}");
        $resLegacy->assertRedirect();
        $this->assertNull($expense->fresh()->financial_id);
    });
});
