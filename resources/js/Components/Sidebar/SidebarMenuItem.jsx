import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const SidebarMenuItem = ({ icon, text, href, active, ...props }) => {
    return (
        <Link
            href={href}
            className={cn(
                "w-full flex items-center gap-x-2 py-2 px-4 focus:outline-none text-lg rounded-lg transition-colors",
                {
                    "bg-white text-slate-800 shadow-sm": active,
                    "text-slate-50 hover:bg-blue-600": !active,
                }
            )}
            {...props}
        >
            <span className="shrink-0">{icon}</span>
            <span>{text}</span>
        </Link>
    );
};

export default SidebarMenuItem;
