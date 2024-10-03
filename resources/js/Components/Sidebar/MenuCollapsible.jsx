import { memo, useLayoutEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/Collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";

const MenuCollapsible = ({ children, icon, text, basePath }) => {
    const { url } = usePage();
    const [open, setOpen] = useState(false);
    const activePath = url.startsWith(basePath);

    // Keep active collapse menu open on reload
    useLayoutEffect(() => {
        if (activePath) {
            setOpen(true);
        }
    }, [activePath]);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <button
                    className={cn(
                        "w-full flex justify-between items-center gap-x-2 py-2 px-4 focus:outline-none text-lg rounded-lg transition-colors",
                        {
                            "bg-white text-slate-800 shadow-sm": activePath,
                            "text-slate-50 hover:bg-blue-600": !activePath,
                        }
                    )}
                >
                    <div className="flex items-center gap-2">
                        {icon}
                        <span>{text}</span>
                    </div>
                    <ChevronDown
                        className={`icon transition ${
                            open ? "rotate-180" : "rotate-0"
                        }`}
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
