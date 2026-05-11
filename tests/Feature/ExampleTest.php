<?php

it('returns a successful response', function () {
    $response = $this->get(route('homepage'));
    $response->dump();
    $response->assertStatus(200);
});
