import { DataTable } from "@/Components/Table";
import { buttonVariants } from "@/Components/Button";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const CompanyUsersPage = ({ users }) => {
    const columns = [
        {
            header: "Name",
            cell: ({ row }) => {
                const { first_name, last_name } = row.original;
                return <span>{`${first_name} ${last_name}`}</span>;
            },
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Verified",
            accessorKey: "email_verified_at",
        },
        {
            header: "Role",
            accessorKey: "role",
            cell: ({ row }) => {
                const { role } = row.original;
                return (
                    <span className="text-white py-1 px-3 rounded-full bg-slate-400 font-medium capitalize">
                        {role}
                    </span>
                );
            },
        },
        {
            header: "Joining Date",
            accessorKey: "created_at",
        },
        {
            header: "Action",
        },
    ];

    return (
        <div className="rounded-lg bg-white border overflow-hidden">
            <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl">Users</h2>
                <Link
                    href={route("company.users.create")}
                    className={cn(buttonVariants())}
                >
                    <Plus className="size-5" />
                    <span>Create New</span>
                </Link>
            </div>
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default CompanyUsersPage;
