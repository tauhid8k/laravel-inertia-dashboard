import plugin from "tailwindcss/plugin";
import hexRgb from "hex-rgb";
import themes from "./themes.json";

// Convert hex to rgb
function getRgbChannels(hex) {
    const { red, green, blue } = hexRgb(hex);
    return `${red} ${green} ${blue}`;
}

// Get css variable declarations
function getCssVariableDeclarations(themes, output = {}) {
    Object.entries(themes).forEach(([key, value]) => {
        output[`--primary-${key}`] = getRgbChannels(value);
    });

    return output;
}

const multiThemePlugin = plugin(
    function ({ addBase }) {
        addBase({
            ":root": getCssVariableDeclarations(themes.ocean),
        });
        Object.entries(themes).forEach(([key, value]) => {
            addBase({
                [`[data-theme=${key}]`]: getCssVariableDeclarations(value),
            });
        });
    },
    {
        theme: {
            extend: {
                colors: {
                    primary: {
                        50: "rgb(var(--primary-50) / <alpha-value>)",
                        100: "rgb(var(--primary-100) / <alpha-value>)",
                        200: "rgb(var(--primary-200) / <alpha-value>)",
                        300: "rgb(var(--primary-300) / <alpha-value>)",
                        400: "rgb(var(--primary-400) / <alpha-value>)",
                        500: "rgb(var(--primary-500) / <alpha-value>)",
                        600: "rgb(var(--primary-600) / <alpha-value>)",
                        700: "rgb(var(--primary-700) / <alpha-value>)",
                        800: "rgb(var(--primary-800) / <alpha-value>)",
                        900: "rgb(var(--primary-900) / <alpha-value>)",
                        950: "rgb(var(--primary-950) / <alpha-value>)",
                    },
                },
            },
        },
    }
);

export default multiThemePlugin;
