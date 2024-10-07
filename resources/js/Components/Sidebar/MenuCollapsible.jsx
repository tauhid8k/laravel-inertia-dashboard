import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/Providers/SidebarProvider";
import { usePage } from "@inertiajs/react";

const MenuCollapsible = ({
    children,
    icon,
    text,
    basePath,
    onTransitionEnd,
}) => {
    const { url } = usePage();
    const { isOpen, isHovered } = useSidebar();
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState("0px");
    const contentRef = useRef(null);
    const activePath = url.startsWith(basePath);

    // Keep active collapse menu open on reload
    useEffect(() => {
        if (activePath) {
            setOpen(true);
        }
    }, [activePath]);

    // Collapse / Expand
    useEffect(() => {
        if (open) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [open]);

    // Track expanding transition end
    useEffect(() => {
        const content = contentRef.current;

        // Handle transition end event
        const handleTransitionEnd = (e) => {
            // Only trigger if the max-height transition ended and the menu is open and active
            if (
                e.propertyName === "max-height" &&
                open &&
                activePath &&
                onTransitionEnd
            ) {
                onTransitionEnd(); // Notify parent component when transition ends
            }
        };

        if (content) {
            content.addEventListener("transitionend", handleTransitionEnd);
        }

        return () => {
            if (content) {
                content.removeEventListener(
                    "transitionend",
                    handleTransitionEnd
                );
            }
        };
    }, [open, activePath, onTransitionEnd]);

    return (
        <div>
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
            <div
                ref={contentRef}
                style={{ maxHeight: height }}
                className={`overflow-hidden transition-all`}
            >
                <div className="ml-[1.6rem] pr-0.5 border-l border-blue-400">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MenuCollapsible;
