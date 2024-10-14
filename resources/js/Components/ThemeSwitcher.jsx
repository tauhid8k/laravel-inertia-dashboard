"use client";

import { useLayoutEffect, useState } from "react";

const ThemeSwitcher = () => {
    const themeList = ["ocean", "evergreen", "candy"];
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "ocean";
    });

    useLayoutEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="flex gap-4">
            {themeList.map((value, index) => (
                <label
                    key={index}
                    className={`flex aspect-square size-32 cursor-pointer items-center justify-center rounded-md border p-3 text-center transition-all ${
                        theme === value
                            ? "ring-primary-500/70 border-primary-500/70 bg-primary-100 ring-2 ring-offset-4"
                            : "bg-white"
                    }`}
                >
                    <input
                        type="radio"
                        name="theme"
                        value={value}
                        className="appearance-none"
                        checked={theme === value}
                        onChange={() => handleThemeChange(value)}
                    />
                    <span className="capitalize">{value}</span>
                </label>
            ))}
        </div>
    );
};

export default ThemeSwitcher;
