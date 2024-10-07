import { createContext, useContext, useLayoutEffect, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => {
    return useContext(SidebarContext);
};

const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 1024);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleHover = (value) => {
        if (window.innerWidth >= 1024) {
            if (!isCollapsed) {
                setIsHovered(value);
            }
        }
    };

    const handleWindowResize = () => {
        // Specific only for mobile
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        }

        // Sidebar open or close on window size
        if (window.innerWidth <= 1024) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    useLayoutEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                setIsOpen,
                isCollapsed,
                setIsCollapsed,
                isMobile,
                isHovered,
                handleHover,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
