import { Link } from "@inertiajs/react";
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function DataTable({ columns, data }) {
    const [expanded, setExpanded] = useState({});

    // Init table
    const table = useReactTable({
        data: data?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
    });

    return (
        <div className="overflow-auto">
            <table className="w-full text-[15px] overflow-hidden">
                <thead className="text-base tracking-wide text-slate-700">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        className="h-14 px-6 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 whitespace-nowrap bg-slate-100 border-y border-slate-200"
                                        key={header.id}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <React.Fragment key={row.key}>
                                <tr>
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            className="px-6 py-4 align-middle [&:has([role=checkbox])]:pr-0 max-w-[230px] truncate text-slate-600 border-b border-slate-200"
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Expanded row */}
                                <AnimatePresence>
                                    {row.getIsExpanded() && (
                                        <tr>
                                            <td colSpan={columns.length}>
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        height: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        height: "auto",
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        height: 0,
                                                    }}
                                                    className="bg-slate-50"
                                                >
                                                    <pre className="p-4">
                                                        {JSON.stringify(
                                                            row.original
                                                                .properties,
                                                            null,
                                                            2
                                                        )}
                                                    </pre>
                                                </motion.div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="h-28 text-center text-xl font-light text-slate-500"
                            >
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {table.getRowModel().rows?.length > 0 && data?.links && (
                <div className="py-4 flex items-center flex-wrap justify-center gap-2 border-slate-200">
                    {data.links.map((link) =>
                        link.url ? (
                            <Link
                                className={`h-10 min-w-10 flex items-center justify-center rounded p-3 ${
                                    link.active
                                        ? "bg-primary-500 text-white"
                                        : "hover:bg-slate-200 text-slate-700"
                                }`}
                                key={link.label}
                                preserveScroll
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                className="h-10 p-3 flex items-center justify-center rounded text-slate-400"
                                key={link.label}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}
