<?php

use App\Http\Controllers\Admin\ActivityLogsController;
use App\Http\Controllers\Admin\RolePermissionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Company\CompanyUserController;
use Illuminate\Support\Facades\Route;


Route::get('/', fn() => inertia('Home'))->name('home');

// Public Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'view'])->name('login.view');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

// Private Routes
Route::prefix('dashboard')->middleware(['auth'])->group(function () {
    Route::get('/', fn() => inertia('Dashboard/Overview'))->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

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
    Route::get('/sales/leads', fn() => inertia('Dashboard/Sales/Leads/Index'))->name('sales.leads');
    Route::get('/sales/intakes', fn() => inertia('Dashboard/Sales/Intakes/Index'))->name('sales.intakes');
    Route::get('/sales/intakes/create', fn() => inertia('Dashboard/Sales/Intakes/Create'))->name('sales.intakes.create');
    Route::get('/sales/resources', fn() => inertia('Dashboard/Sales/Resources'))->name('sales.resources');

    // Clients
    Route::get('/clients', fn() => inertia('Dashboard/Clients/Index'))->name('clients.index');
    Route::get('/clients/bulk-manager', fn() => inertia('Dashboard/Clients/BulkManager'))->name('clients.bulkManager');
    Route::get('/clients/clients-manager', fn() => inertia('Dashboard/Clients/ClientsManager'))->name('clients.manager');
    Route::get('/clients/activities', fn() => inertia('Dashboard/Clients/Activities'))->name('clients.activities');
    Route::get('/clients/notifications', fn() => inertia('Dashboard/Clients/Notifications'))->name('clients.notifications');
    Route::get('/clients/impersonator', fn() => inertia('Dashboard/Clients/Impersonator'))->name('clients.impersonator');

    // Company
    Route::get('/company/users', [CompanyUserController::class, 'index'])->name('company.users');
    Route::post('/company/users', [CompanyUserController::class, 'store'])->name('company.users.store');
    Route::get('/company/users/create', [CompanyUserController::class, 'create'])->name('company.users.create');
    Route::get('/company/logs', [ActivityLogsController::class, 'index'])->name('company.logs');
    Route::post('/company/logs', [ActivityLogsController::class, 'store'])->name('company.logs.store');

    // Comms
    Route::get('/comms/message-center', fn() => inertia('Dashboard/Comms/MessageCenter'))->name('comms.messageCenter');
    Route::get('/comms/calender', fn() => inertia('Dashboard/Comms/Calender'))->name('comms.calender');

    // Roles and Permissions
    Route::get('/role-permissions/create', [RolePermissionController::class, 'create'])->name('rolePermissions.create');
    Route::post('/role-permissions', [RolePermissionController::class, 'store'])->name('rolePermissions.store');
    Route::get('/role-permissions', [RolePermissionController::class, 'index'])->name('rolePermissions.index');
    Route::get('/role-permissions/{role}/permissions', [RolePermissionController::class, 'show'])->name('rolePermissions.show');
    Route::put('/role-permissions/{role}/permissions', [RolePermissionController::class, 'update'])->name('rolePermissions.update');
    Route::delete('/role-permissions/{role}', [RolePermissionController::class, 'destroy'])->name('rolePermissions.destroy');

    // Settings
    Route::get('/settings', fn() => inertia('Dashboard/Settings/Index'))->name('dashboard.settings');
});
