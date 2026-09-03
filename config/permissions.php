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
        100 => ['marketing.manage'],
    ],
];
