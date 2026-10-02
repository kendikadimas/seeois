<?php

return [
    'roles' => [
        1 => ['employee.manage', 'organization.manage', 'dashboard.manage', 'documents.manage', 'internship.manage', 'internship.review', 'payroll.manage'],
        2 => ['finance.view', 'finance.manage', 'payroll.manage'],
        3 => ['stands.view', 'stands.manage', 'stand.assign', 'stand.validate', 'inventory.view', 'menu.manage', 'menu.create', 'goods.manage', 'operations.manage'],
        4 => ['organization.view'],
        5 => ['organization.view', 'internship.review'],
        6 => ['employee.manage', 'hr.manage', 'internship.manage', 'internship.review'],
        8 => ['documents.manage'],
        9 => ['marketing.manage'],
        10 => ['sales.manage', 'menu.manage', 'menu.publish', 'inventory.view'],
        11 => ['production.manage', 'menu.create', 'inventory.view', 'inventory.adjust'],
        12 => ['seminar.manage'],
        13 => ['iwp.manage'],
        15 => ['internship.manage', 'internship.review'],
        99 => ['*'],
        100 => ['marketing.manage', 'organization.view'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Department capabilities
    |--------------------------------------------------------------------------
    |
    | Staff membership is independent from a user's primary role. These
    | capabilities are merged with the role capabilities, so joining a
    | department unlocks its workspace without overwriting a special role.
    | Keys are normalized (lowercase, "&" becomes "and") by User.
    |
    */
    'departments' => [
        'operating' => ['stands.view', 'stands.manage', 'stand.assign', 'stand.validate', 'inventory.view', 'menu.manage', 'menu.create', 'goods.manage', 'operations.manage'],
        'operational' => ['stands.view', 'stands.manage', 'stand.assign', 'stand.validate', 'inventory.view', 'menu.manage', 'menu.create', 'goods.manage', 'operations.manage'],
        'human resource' => ['employee.manage', 'hr.manage', 'internship.manage', 'internship.review'],
        'financial' => ['finance.view', 'finance.manage', 'payroll.manage'],
        'public relation' => ['seminar.manage'],
        'marketing and medinfo' => ['marketing.manage'],
        'marketing medinfo' => ['marketing.manage'],
        'marketing' => ['marketing.manage'],
        'medinfo' => ['marketing.manage'],
        'production' => ['production.manage', 'menu.create', 'inventory.view', 'inventory.adjust'],
        'sales distribution' => ['sales.manage', 'menu.manage', 'menu.publish', 'inventory.view'],
        'administration' => ['documents.manage'],
        'administrative' => ['documents.manage'],
    ],
];
