import { Link } from "@inertiajs/react";
import { useSidebar } from "@/Providers/SidebarProvider";
import { X } from "lucide-react";

const SidebarHeader = () => {
    const { setIsExpanded } = useSidebar();

    return (
        <div className="h-16 shrink-0 flex justify-center items-center px-4 py-5 border-b border-primary-400">
            <Link href="/">{/* <img src="/logo.svg" alt="" /> */}</Link>
            <button
                onClick={() => setIsExpanded(false)}
                className="md:hidden size-10 flex items-center justify-center ml-auto rounded-md bg-primary-600 text-slate-50"
            >
                <X className="icon" />
            </button>
        </div>
    );
};

export default SidebarHeader;
