import { usePage, router } from "@inertiajs/react";
import { createContext, useContext, useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";

const UserActivityContext = createContext();

export const UserActivityProvider = ({ children }) => {
    const { url } = usePage();
    const [activeStatus, setActiveStatus] = useState("active");
    const [activeTime, setActiveTime] = useState(0); // Tracks total active time
    const [logCountdown, setLogCountdown] = useState(0); // Tracks time until next log

    const logActivity = () => {
        router.post(route("company.logs.store"), {
            url,
            activeTime,
        });
    };

    // Idle timer settings with cross-tab support
    const { getActiveTime, reset } = useIdleTimer({
        onIdle: () => {
            reset();
            setActiveStatus("idle");
            setActiveTime(0);
            setLogCountdown(0); // Reset log countdown on idle
        },
        onActive: () => {
            setActiveStatus("active");
            logActivity(); // Log activity when user becomes active
        },
        crossTab: true, // Ensure the timer works across multiple tabs
        timeout: 90_000, // Idle timeout set to 90 seconds
        throttle: 5000, // Throttle updates to avoid performance issues
    });

    // Reset active time and idle timer when URL changes
    useEffect(() => {
        setActiveTime(0);
        setLogCountdown(0);
        reset();

        // Update active time every 10 seconds
        const interval = setInterval(() => {
            setActiveTime(Math.ceil(getActiveTime() / 1000)); // Active time in seconds

            // Update countdown for logging
            setLogCountdown((prev) => prev + 10);
        }, 10000); // Check every 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, [url]);

    // Log user activity every 60 seconds based on the logCountdown
    useEffect(() => {
        if (activeStatus === "active" && logCountdown >= 60) {
            logActivity();
            setLogCountdown(0);
        }
    }, [activeStatus, logCountdown]);

    return (
        <UserActivityContext.Provider
            value={{
                activeStatus,
                activeTime,
                logCountdown,
            }}
        >
            {children}
        </UserActivityContext.Provider>
    );
};

export const useUserActivity = () => {
    return useContext(UserActivityContext);
};
