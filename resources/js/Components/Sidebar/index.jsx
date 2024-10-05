import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import { useSidebar } from "@/Providers/SidebarProvider";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const { isOpen, isHovered } = useSidebar();

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-40 md:static h-full flex flex-col shrink-0 border-r bg-gradient-to-b from-blue-500 to-blue-600 transition-[transform,width]",
                {
                    "translate-x-0 w-72": isOpen || isHovered,
                    "-translate-x-full w-72 md:w-20 md:translate-x-0":
                        !isOpen && !isHovered,
                }
            )}
        >
            <SidebarHeader />
            <SidebarMenu />
            <SidebarFooter />
        </aside>
    );
};

export default Sidebar;
