import { DataTable } from "@/Components/Table";
import { buttonVariants } from "@/Components/Button";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const RolePermissionsPage = ({ roles }) => {
    const columns = [
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: ({ row }) => {
                const { created_at } = row.original;
                return <span>{dayjs(created_at).format("D MMM YYYY")}</span>;
            },
        },
        {
            header: "Action",
        },
    ];

    return (
        <div className="rounded-lg bg-white border overflow-hidden">
            <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl">Roles</h2>
                <Link
                    href={route("rolePermissions.create")}
                    className={cn(buttonVariants())}
                >
                    <Plus className="size-5" />
                    <span>Create Role</span>
                </Link>
            </div>
            <DataTable columns={columns} data={roles} />
        </div>
    );
};

export default RolePermissionsPage;
