import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/Providers/SidebarProvider";

const SidebarFooter = () => {
    const { isOpen, isHovered, setIsOpen } = useSidebar();

    return (
        <div className="h-16 flex justify-center items-center px-4 py-5 border-t border-blue-500 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden md:flex items-center gap-3"
            >
                <div className="size-10 flex items-center justify-center rounded-md bg-blue-700 text-slate-50">
                    {isOpen ? (
                        <PanelLeftClose className="icon" />
                    ) : (
                        <PanelLeftOpen className="icon" />
                    )}
                </div>
                <span
                    className={cn("hidden whitespace-nowrap text-slate-50", {
                        block: isOpen || isHovered,
                    })}
                >
                    Collapse Menu
                </span>
            </button>
        </div>
    );
};

export default SidebarFooter;
