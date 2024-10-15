<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            ['name' => 'view_users', 'group' => 'users'],
            ['name' => 'show_user', 'group' => 'users'],
            ['name' => 'create_user', 'group' => 'users'],
            ['name' => 'edit_user', 'group' => 'users'],
            ['name' => 'delete_user', 'group' => 'users'],
            ['name' => 'view_role_permissions', 'group' => 'role_permissions'],
            ['name' => 'create_role_permissions', 'group' => 'role_permissions'],
            ['name' => 'edit_role_permissions', 'group' => 'role_permissions'],
            ['name' => 'delete_role_permissions', 'group' => 'role_permissions'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        // Create roles
        $roles = [['name' => 'admin'], ['name' => 'staff']];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
