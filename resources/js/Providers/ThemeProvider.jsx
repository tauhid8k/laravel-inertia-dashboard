import React, {
    createContext,
    useContext,
    useLayoutEffect,
    useState,
} from "react";

// Create a context for the theme
const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const themeList = ["ocean", "evergreen", "candy"];
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "ocean";
    });

    // Set the theme on the body when it changes
    useLayoutEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    // Update theme and localStorage
    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, themeList, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};
