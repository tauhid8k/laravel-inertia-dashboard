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
});
