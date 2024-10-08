import { createContext, useContext, useLayoutEffect, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => {
    return useContext(SidebarContext);
};

const SidebarProvider = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(window.innerWidth > 1024);
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleWindowResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
            setIsExpanded(false);
            setIsCollapsed(false);
        } else {
            setIsMobile(false);
            setIsCollapsed(window.innerWidth <= 1024);
            setIsExpanded(window.innerWidth > 1024);
        }
    };

    useLayoutEffect(() => {
        // Add resize event listener
        window.addEventListener("resize", handleWindowResize);

        // Initial call to ensure the correct state based on the current window size
        handleWindowResize();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                isExpanded,
                setIsExpanded,
                isCollapsed,
                setIsCollapsed,
                isMobile,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
