<?php

it('returns a successful response', function () {
    $response = $this->get(route('homepage'));
    $response->assertStatus(200);
});
