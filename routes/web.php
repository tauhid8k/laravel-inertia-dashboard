<?php

use Illuminate\Support\Facades\Route;


Route::get('/', fn() => inertia('Home'))->name('home');

Route::prefix('dashboard')->group(function () {
    Route::get('/', fn() => inertia('Dashboard/Overview'))->name('dashboard');

    // Billing
    Route::get('/billing', fn() => inertia('Dashboard/Billing/Index'))->name('billing.index');
    Route::get('/billing/customers', fn() => inertia('Dashboard/Billing/Customers'))->name('billing.customers');
    Route::get('/billing/intakes', fn() => inertia('Dashboard/Billing/Intakes'))->name('billing.intakes');
    Route::get('/billing/subscriptions', fn() => inertia('Dashboard/Billing/Subscriptions'))->name('billing.subscriptions');
    Route::get('/billing/products', fn() => inertia('Dashboard/Billing/Products'))->name('billing.products');
    Route::get('/billing/payments', fn() => inertia('Dashboard/Billing/Payments'))->name('billing.payments');
    Route::get('/billing/payouts', fn() => inertia('Dashboard/Billing/Payouts'))->name('billing.payouts');
    Route::get('/billing/disputes', fn() => inertia('Dashboard/Billing/Disputes'))->name('billing.disputes');
    Route::get('/billing/settings', fn() => inertia('Dashboard/Billing/Settings'))->name('billing.settings');

    // Sales
    Route::get('/sales', fn() => inertia('Dashboard/Sales/Index'))->name('sales.index');
    Route::get('/sales/leads', fn() => inertia('Dashboard/Sales/Leads'))->name('sales.leads');
    Route::get('/sales/intakes', fn() => inertia('Dashboard/Sales/Intakes'))->name('sales.intakes');
    Route::get('/sales/resources', fn() => inertia('Dashboard/Sales/Resources'))->name('sales.resources');

    // Clients
    Route::get('/clients', fn() => inertia('Dashboard/Clients/Index'))->name('clients.index');
    Route::get('/clients/bulk-manager', fn() => inertia('Dashboard/Clients/BulkManager'))->name('clients.bulkManager');
    Route::get('/clients/clients-manager', fn() => inertia('Dashboard/Clients/ClientsManager'))->name('clients.manager');
    Route::get('/clients/activities', fn() => inertia('Dashboard/Clients/Activities'))->name('clients.activities');
    Route::get('/clients/notifications', fn() => inertia('Dashboard/Clients/Notifications'))->name('clients.notifications');
    Route::get('/clients/impersonator', fn() => inertia('Dashboard/Clients/Impersonator'))->name('clients.impersonator');

    // Company
    Route::get('/company/users', fn() => inertia('Dashboard/Company/Users/Index'))->name('company.users');
    Route::get('/company/users/create', fn() => inertia('Dashboard/Company/Users/Create'))->name('company.users.create');
    Route::get('/company/logs', fn() => inertia('Dashboard/Company/Logs'))->name('company.logs');

    // Comms
    Route::get('/comms/message-center', fn() => inertia('Dashboard/Comms/MessageCenter'))->name('comms.messageCenter');
    Route::get('/comms/calender', fn() => inertia('Dashboard/Comms/Calender'))->name('comms.calender');

    // Settings
    Route::get('/settings', fn() => inertia('Dashboard/Settings/Index'))->name('dashboard.settings');
});
