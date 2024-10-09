import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/Providers/SidebarProvider";
import { usePage } from "@inertiajs/react";

const MenuCollapsible = ({ children, icon, text, basePath }) => {
    const { url } = usePage();
    const { isExpanded } = useSidebar();
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState("0px");
    const contentRef = useRef(null);
    const activePath = url.startsWith(basePath);

    // Keep active collapse menu expanded on reload
    useEffect(() => {
        if (activePath) {
            setOpen(true);
        }
    }, [activePath]);

    // Collapse / Expand content
    useEffect(() => {
        if (open && isExpanded) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [open, isExpanded]);

    return (
        <div className={open ? "active-collapsible" : ""}>
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "w-full h-11 flex justify-between items-center py-2 px-3 group overflow-hidden focus:outline-none text-lg rounded-lg transition-colors",
                    {
                        "bg-white text-slate-800 shadow-sm": activePath,
                        "text-slate-50 hover:bg-blue-600": !activePath,
                    }
                )}
            >
                <div className="flex items-center gap-x-2">
                    <span className="shrink-0">{icon}</span>
                    <span
                        className={cn("hidden", {
                            block: isExpanded,
                        })}
                    >
                        {text}
                    </span>
                </div>
                <ChevronDown
                    className={cn("hidden icon transition", {
                        "rotate-180": open,
                        "rotate-0": !open,
                        block: isExpanded,
                    })}
                />
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: height }}
                className="collapsible-content overflow-hidden transition-all duration-300"
            >
                <div className="ml-[1.6rem] pr-0.5 border-l border-blue-400">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MenuCollapsible;
