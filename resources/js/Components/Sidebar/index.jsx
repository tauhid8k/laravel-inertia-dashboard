import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import { useContext, useEffect } from "react";
import { SidebarContext } from "@/Layouts/AppLayout";

const Sidebar = () => {
    const { isSidebarMobile, isSidebarOpen, setIsSidebarOpen } =
        useContext(SidebarContext);

    return (
        <>
            {/* Mobile Sidebar */}
            {/* Yet to implement */}

            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col w-[300px] shrink-0 rounded-xl shadow-sm border bg-blue-500 transition-[margin] duration-300 ${
                    isSidebarOpen ? "ml-0" : "-ml-[316px]"
                }`}
            >
                <SidebarHeader />
                <SidebarMenu />
            </aside>
        </>
    );
};

export default Sidebar;
