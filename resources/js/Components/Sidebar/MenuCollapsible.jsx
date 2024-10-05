import { memo, useLayoutEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/Collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/Providers/SidebarProvider";
import { usePage } from "@inertiajs/react";

const MenuCollapsible = ({ children, icon, text, basePath }) => {
    const { url } = usePage();
    const { isOpen, isHovered } = useSidebar();
    const [open, setOpen] = useState(false);
    const activePath = url.startsWith(basePath);

    // Keep active collapse menu open on reload
    useLayoutEffect(() => {
        if (activePath) {
            setOpen(true);
        }
    }, [activePath]);

    return (
        <Collapsible
            open={open && (isOpen || isHovered)}
            onOpenChange={setOpen}
        >
            <CollapsibleTrigger asChild>
                <button
                    className={cn(
                        "w-full h-11 flex justify-between items-center py-2 px-3 overflow-hidden focus:outline-none text-lg rounded-lg transition-colors",
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
                                block: isOpen || isHovered,
                            })}
                        >
                            {text}
                        </span>
                    </div>
                    <ChevronDown
                        className={cn("hidden icon transition", {
                            "rotate-180": open,
                            "rotate-0": !open,
                            block: isOpen || isHovered,
                        })}
                    />
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="ml-[1.6rem] pr-0.5 border-l border-blue-400">
                    {children}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default memo(MenuCollapsible);
