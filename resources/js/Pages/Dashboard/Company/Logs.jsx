import { DataTable } from "@/Components/ExpandableTable";
import { Eye } from "lucide-react";
import { Button } from "@/Components/Button";
import { useUserActivity } from "@/Providers/UserActivityProvider";
import dayjs from "dayjs";

const CompanyLogsPage = ({ logs }) => {
    const { activeStatus, activeTime } = useUserActivity();

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

                const url = parsedProperties.url;
                const formattedUrl = url
                    .split("?")[0]
                    .slice(1)
                    .split("/")
                    .join(" -> ");

                return (
                    <span
                        title={formattedUrl}
                        className="py-1 px-2 border capitalize border-slate-200 text-sm rounded-md bg-slate-100"
                    >
                        {formattedUrl}
                    </span>
                );
            },
        },
        {
            header: "Event",
            accessorKey: "event",
        },
        {
            header: "Active Time",
            cell: ({ row }) => {
                const { properties } = row.original;

                // Check if properties is a JSON string or object
                let parsedProperties = properties;
                if (typeof properties === "string") {
                    parsedProperties = JSON.parse(properties);
                }

                const activeTime = parsedProperties.activeTime;

                // Helper function to format seconds into "X min Y sec"
                const formatActiveTime = (seconds) => {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;

                    if (minutes > 0) {
                        return `${minutes} min ${remainingSeconds} sec`;
                    } else {
                        return `${remainingSeconds} sec`;
                    }
                };

                return (
                    <span>
                        {activeTime === 0
                            ? "Just now"
                            : formatActiveTime(activeTime)}
                    </span>
                );
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
