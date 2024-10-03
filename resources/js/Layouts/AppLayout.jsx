import { createContext, useLayoutEffect, useState } from "react";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import BreadCrumbs from "@/Components/BreadCrumbs";

// Sidebar Context
export const SidebarContext = createContext({
    isSidebarOpen: false,
    setIsSidebarOpen: () => {},
    isSidebarMobile: false,
    setIsSidebarMobile: () => {},
});

const AppLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSidebarMobile, setIsSidebarMobile] = useState(false);

    // Show/Hide Mobile/Desktop Sidebar On Window Resize
    useLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
                setIsSidebarMobile(true);
            } else {
                setIsSidebarMobile(false);
                setIsSidebarOpen(true);
            }
        };

        // Initial check on mount
        handleResize();

        // Event listener for window resize
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                isSidebarOpen,
                setIsSidebarOpen,
                isSidebarMobile,
                setIsSidebarMobile,
            }}
        >
            <div className="flex h-screen overflow-hidden gap-4 bg-slate-100 p-4">
                <Sidebar />
                <div className="w-full h-screen overflow-y-auto">
                    <Header />
                    <BreadCrumbs />
                    <main className="pb-8">{children}</main>
                </div>
            </div>
        </SidebarContext.Provider>
    );
};

export default AppLayout;
