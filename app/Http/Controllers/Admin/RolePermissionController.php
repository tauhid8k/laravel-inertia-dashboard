<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    // Roles
    public function index(Request $request)
    {
        $roles = Role::whereNot('name', 'admin')->latest()->paginate();

        return inertia('Dashboard/RolePermissions/Index', ['roles' => $roles]);
    }

    // Role permissions creation page
    public function create(Request $request)
    {
        // Get all permissions based on group
        $permissions = Permission::all()->groupBy('group');

        return inertia('Dashboard/RolePermissions/Create', ['permissions' => $permissions]);
    }

    // Create role and permissions
    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'required|string|exists:permissions,name'
        ], [
            'permissions.required' => 'At least one permission is required'
        ]);

        // Create new role and assign permissions
        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permissions'));

        return redirect()->route('rolePermissions.index');
    }
}
