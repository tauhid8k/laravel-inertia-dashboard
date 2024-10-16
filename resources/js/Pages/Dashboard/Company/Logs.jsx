import { DataTable } from "@/Components/ExpandableTable";
import { Eye } from "lucide-react";
import { Button } from "@/Components/Button";
import dayjs from "dayjs";

const CompanyLogsPage = ({ logs }) => {
    const columns = [
        {
            header: "Date & Time",
            accessorKey: "created_at",
            cell: ({ row }) => {
                const { created_at } = row.original;
                return (
                    <span>
                        {dayjs(created_at).format("D MMM YYYY - hh:mm A")}
                    </span>
                );
            },
        },
        {
            header: "User",
        },
        {
            header: "Location",
        },
        {
            header: "Company",
        },
        {
            header: "Module",
            accessorKey: "subject_type",
            cell: ({ row }) => {
                const { subject_type } = row.original;
                const parts = subject_type.split("\\");
                return <span>{parts[parts.length - 1]}</span>;
            },
        },
        {
            header: "Action",
            accessorKey: "description",
        },
        {
            id: "expander",
            header: () => null,
            cell: ({ row }) => (
                <Button
                    onClick={() => row.toggleExpanded()}
                    variant="secondary"
                    aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
                >
                    <Eye className="size-5" />
                </Button>
            ),
        },
    ];

    return (
        <div className="rounded-lg bg-white border overflow-hidden">
            <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl">Activity Logs</h2>
            </div>
            <DataTable columns={columns} data={logs} />
        </div>
    );
};

export default CompanyLogsPage;
