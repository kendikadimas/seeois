<?php

test('application exposes version 6 to the frontend', function () {
    expect(config('app.version'))->toBe('6.0');

    $this->get('/login')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Auth/Login')
            ->where('app.version', '6.0'));
});

test('legacy version labels are no longer present in frontend sources', function () {
    $files = collect([
        resource_path('js/Layouts/StaffLayout.vue'),
        resource_path('js/Layouts/PublicLayout.vue'),
        resource_path('js/Components/RoleWorkflowGuideModal.vue'),
        ...glob(resource_path('js/Pages/Auth/*.vue')),
    ]);

    foreach ($files as $file) {
        expect(file_get_contents($file))->not->toContain('v5.0');
    }
});
