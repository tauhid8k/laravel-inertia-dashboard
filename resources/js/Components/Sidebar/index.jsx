import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { useSidebar } from "@/Providers/SidebarProvider";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const { isExpanded, setIsExpanded, isCollapsed, isMobile } = useSidebar();
    const { url } = usePage();

    useEffect(() => {
        if (isMobile && isExpanded) {
            setIsExpanded(false);
        }
    }, [url]);

    return (
        <>
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40 md:static h-full flex flex-col shrink-0 border-r bg-gradient-to-b from-blue-500 to-blue-600 transition-[transform,width] duration-200",
                    {
                        // Mobile: show/hide the sidebar based on isExpanded
                        "translate-x-0 w-72": isExpanded && isMobile,
                        "-translate-x-full w-72": !isExpanded && isMobile,

                        // Desktop/Tablet: Toggle between collapsed and expanded
                        "w-72": isExpanded && !isMobile,
                        "w-20": isCollapsed && !isMobile,
                    }
                )}
            >
                <SidebarHeader />
                <SidebarMenu />
            </aside>

            {/* Overlay (Only for mobile) */}
            <div
                onClick={() => setIsExpanded(false)}
                className={cn(
                    "fixed inset-0 z-30 bg-black transition-opacity duration-300 ease-in-out",
                    {
                        "opacity-50 visible": isExpanded && isMobile,
                        "opacity-0 invisible": !isExpanded || !isMobile,
                    }
                )}
            />
        </>
    );
};

export default Sidebar;
