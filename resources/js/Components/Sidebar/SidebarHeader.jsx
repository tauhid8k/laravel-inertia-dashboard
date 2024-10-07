import { Link } from "@inertiajs/react";
import { useSidebar } from "@/Providers/SidebarProvider";
import { X } from "lucide-react";

const SidebarHeader = () => {
    const { isOpen, isCollapsed, setIsCollapsed, isHovered, setIsOpen } =
        useSidebar();

    const handleSidebarCollapse = () => {
        if (isOpen) {
            setIsOpen(false);
            setIsCollapsed(false);
        } else if (isCollapsed) {
            setIsOpen(true);
            setIsCollapsed(true);
        }
    };

    return (
        <div className="h-16 shrink-0 flex justify-center items-center px-4 py-5 border-b border-blue-400">
            <Link href="/">{/* <img src="/logo.svg" alt="" /> */}</Link>
            <button
                onClick={handleSidebarCollapse}
                className="md:hidden size-10 flex items-center justify-center ml-auto rounded-md bg-blue-600 text-slate-50"
            >
                <X className="icon" />
            </button>
        </div>
    );
};

export default SidebarHeader;
