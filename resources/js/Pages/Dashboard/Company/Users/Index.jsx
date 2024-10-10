import { DataTable } from "@/Components/Table";
import { buttonVariants } from "@/Components/Button";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const CompanyUsersPage = () => {
    const columns = [
        {
            header: "Name",
            accessorKey: "name",
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
            <div className="flex items-center justify-end p-6">
                <Link
                    href={route("company.users.create")}
                    className={cn(buttonVariants())}
                >
                    <Plus className="size-5" />
                    <span>Create New</span>
                </Link>
            </div>
            <DataTable columns={columns} />
        </div>
    );
};

export default CompanyUsersPage;
