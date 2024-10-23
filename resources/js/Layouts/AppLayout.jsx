import SidebarProvider from "@/Providers/SidebarProvider";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import BreadCrumbs from "@/Components/BreadCrumbs";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { Toaster } from "sonner";
import { UserActivityProvider } from "@/Providers/UserActivityProvider";
import { motion, AnimatePresence } from "framer-motion";
import { usePage } from "@inertiajs/react";

const AppLayout = ({ children }) => {
    const { component } = usePage();

    // Define animation variants for steps
    const pageVariants = {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 5 },
    };

    return (
        <ThemeProvider>
            <UserActivityProvider>
                <SidebarProvider>
                    <div className="flex h-screen overflow-hidden bg-slate-100">
                        <Sidebar />
                        <div className="w-full h-screen overflow-y-auto">
                            <Header />
                            <BreadCrumbs />
                            <main className="px-5 pb-5">
                                <Toaster
                                    position="top-center"
                                    toastOptions={{
                                        duration: 2000,
                                        classNames: {
                                            success:
                                                "text-lg text-slate-800 border border-slate-300 bg-white",
                                        },
                                    }}
                                />
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={component}
                                        variants={pageVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.1 }}
                                    >
                                        {children}
                                    </motion.div>
                                </AnimatePresence>
                            </main>
                        </div>
                    </div>
                </SidebarProvider>
            </UserActivityProvider>
        </ThemeProvider>
    );
};

export default AppLayout;
