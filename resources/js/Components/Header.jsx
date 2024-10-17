import { Link, usePage } from "@inertiajs/react";
import {
    ArrowLeftFromLine,
    ArrowRightFromLine,
    LogOut,
    MenuIcon,
    UserRoundCog,
    X,
} from "lucide-react";
import {
    Dropdown,
    DropdownItem,
    DropdownItems,
    DropdownTrigger,
} from "./Dropdown";
import { Fragment } from "react";
import { useSidebar } from "@/Providers/SidebarProvider";

const Header = () => {
    const { auth } = usePage().props;

    const { isExpanded, setIsExpanded, isCollapsed, setIsCollapsed, isMobile } =
        useSidebar();

    const handleSidebar = () => {
        if (isMobile) {
            // On mobile, only toggle between fully expanded and hidden
            setIsExpanded(!isExpanded);
        } else {
            // On tablet/desktop, toggle between expanded and collapsed states
            if (isCollapsed) {
                setIsCollapsed(false);
                setIsExpanded(true);
            } else if (isExpanded) {
                setIsExpanded(false);
                setIsCollapsed(true);
            } else {
                setIsExpanded(true);
            }
        }
    };

    return (
        <header className="h-16 sticky top-0 z-20 px-5 flex items-center bg-white border-b">
            <div className="w-full flex items-center justify-between gap-4">
                <button
                    onClick={handleSidebar}
                    className="size-10 flex items-center justify-center text-slate-600 bg-slate-100 rounded-full"
                >
                    {isMobile ? (
                        <MenuIcon />
                    ) : isExpanded ? (
                        <ArrowLeftFromLine />
                    ) : (
                        <ArrowRightFromLine />
                    )}
                </button>
                <div className="flex items-center gap-4 ml-auto">
                    <Dropdown>
                        <DropdownTrigger className="flex items-center justify-between gap-x-2 py-1 ps-1 pe-3 bg-slate-100 rounded-full">
                            <img
                                className="w-8 h-auto rounded-full"
                                src="https://i.pravatar.cc/32"
                                alt="profile image"
                            />
                            <span className="font-medium truncate max-w-[7.5rem]">
                                {auth.user.email}
                            </span>
                            <svg
                                className="data-open:rotate-180 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </DropdownTrigger>
                        <DropdownItems>
                            <DropdownItem>
                                <UserRoundCog className="icon" />
                                <span>Profile</span>
                            </DropdownItem>
                            <DropdownItem as={Fragment}>
                                <Link
                                    as="button"
                                    href={route("logout")}
                                    method="post"
                                >
                                    <LogOut className="icon" />
                                    <span>Logout</span>
                                </Link>
                            </DropdownItem>
                        </DropdownItems>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;
