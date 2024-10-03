import { Link } from "@inertiajs/react";
import { X } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "@/Layouts/AppLayout";

const SidebarHeader = () => {
    const { setIsSidebarOpen } = useContext(SidebarContext);

    return (
        <div className="h-[77px] shrink-0 flex justify-center items-center px-4 py-6">
            <Link href="/" className="text-2xl font-bold">
                <img src="/logo.svg" className="w-32" alt="" />
            </Link>
            <button
                onClick={() => setIsSidebarOpen(false)}
                className="btn-icon lg:hidden"
            >
                <X />
            </button>
        </div>
    );
};

export default SidebarHeader;
