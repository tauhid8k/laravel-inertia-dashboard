import { DataTable } from "@/Components/ExpandableTable";
import { Eye } from "lucide-react";
import { Button } from "@/Components/Button";
import dayjs from "dayjs";

const CompanyLogsPage = ({ logs }) => {
    console.log(logs);

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
            cell: ({ row }) => {
                const { causer } = row.original;
                return (
                    <span>{`${causer.first_name} ${causer.last_name}`}</span>
                );
            },
        },
        {
            header: "Location",
            cell: ({ row }) => {
                const { properties } = row.original;

                // Check if properties is a JSON string or object
                let parsedProperties = properties;
                if (typeof properties === "string") {
                    parsedProperties = JSON.parse(properties);
                }

                const fullUrl = parsedProperties.url || "";
                const url = new URL(fullUrl);

                return (
                    <span className="py-1 px-2 border capitalize border-slate-200 text-sm rounded-md bg-slate-100">
                        {url.pathname.slice(1).split("/").join(" -> ")}
                    </span>
                );
            },
        },
        {
            header: "Event",
            accessorKey: "event",
        },
        {
            header: "Last Active",
            cell: ({ row }) => {
                const { properties } = row.original;

                // Check if properties is a JSON string or object
                let parsedProperties = properties;
                if (typeof properties === "string") {
                    parsedProperties = JSON.parse(properties);
                }

                return <span>{parsedProperties.last_active_at}</span>;
            },
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
