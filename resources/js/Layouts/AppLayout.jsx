import SidebarProvider from "@/Providers/SidebarProvider";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import BreadCrumbs from "@/Components/BreadCrumbs";

const AppLayout = ({ children }) => {
    return (
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
    );
};

export default AppLayout;
