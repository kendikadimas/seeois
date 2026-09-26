<?php

test('marketing forms use named staff routes without obsolete method spoofing', function () {
    $files = [
        resource_path('js/Pages/Staff/Marketing/Structures.vue'),
        resource_path('js/Pages/Staff/Marketing/Activities.vue'),
        resource_path('js/Pages/Staff/Marketing/Compro.vue'),
        resource_path('js/Pages/Staff/Marketing/MarketingCms.vue'),
    ];

    foreach ($files as $file) {
        $source = file_get_contents($file);
        expect($source)
            ->not->toContain('/seeo/marketing')
            ->not->toContain("_method: 'put'")
            ->not->toContain("_method: 'PUT'");
    }

    expect(file_get_contents($files[0]))->toContain("route('marketing.structures.store')")
        ->and(file_get_contents($files[1]))->toContain("route('marketing.activities.store')")
        ->and(file_get_contents($files[2]))->toContain("route('marketing.compro.store')")
        ->and(file_get_contents(resource_path('js/Components/RichTextEditor.vue')))
        ->toContain("window.route('marketing.upload.image')")
        ->not->toContain("post('/marketing/upload-image'");
});
