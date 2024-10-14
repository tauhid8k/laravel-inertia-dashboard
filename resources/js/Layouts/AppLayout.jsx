import SidebarProvider from "@/Providers/SidebarProvider";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import BreadCrumbs from "@/Components/BreadCrumbs";
import { ThemeProvider } from "@/Providers/ThemeProvider";

const AppLayout = ({ children }) => {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <div className="flex h-screen overflow-hidden bg-slate-100">
                    <Sidebar />
                    <div className="w-full h-screen overflow-y-auto">
                        <Header />
                        <BreadCrumbs />
                        <main className="px-5 pb-5">{children}</main>
                    </div>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default AppLayout;
