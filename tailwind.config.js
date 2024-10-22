const multiThemePlugin = require("./themes/multiTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/js/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        extend: {
            fontFamily: {
                inter: ["Inter", "system-ui"],
            },
            keyframes: {
                "collapsible-expand": {
                    from: { height: "0px" },
                    to: { height: "var(--radix-collapsible-content-height)" },
                },
                "collapsible-collapse": {
                    from: { height: "var(--radix-collapsible-content-height)" },
                    to: { height: "0px" },
                },
            },
            animation: {
                "collapsible-expand": "collapsible-expand 0.2s ease-out",
                "collapsible-collapse": "collapsible-collapse 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        multiThemePlugin,
        require("tailwindcss-animate"),
    ],
};
