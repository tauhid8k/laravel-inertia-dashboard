import "./bootstrap";
import "../css/app.css";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import GuestLayout from "@/Layouts/GuestLayout";
import AppLayout from "@/Layouts/AppLayout";

createInertiaApp({
    resolve: async (name) => {
        const pages = await import.meta.glob("./Pages/**/*.jsx");
        let page = await pages[`./Pages/${name}.jsx`]();
        page.default.layout = page.default.layout
            ? page.default.layout
            : name.startsWith("Dashboard/")
            ? (page) => <AppLayout children={page} />
            : (page) => <GuestLayout children={page} />;
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
