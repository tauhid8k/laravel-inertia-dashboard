import { BadgeDollarSign, Banknote, LayoutGrid } from "lucide-react";
import { useSidebar } from "@/Providers/SidebarProvider";
import { useRef, useEffect } from "react";
import MenuCollapsible from "./MenuCollapsible";
import MenuCollapsibleItem from "./MenuCollapsibleItem";
import SidebarMenuItem from "./SidebarMenuItem";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const SidebarMenu = () => {
    const { handleHover } = useSidebar();
    const scrollViewportRef = useRef(null);

    const scrollToActive = () => {
        const scrollView = scrollViewportRef.current;
        if (!scrollView) return;

        // Scroll to active item
        const activeItem = scrollView.querySelector(".active");
        if (!activeItem) return;

        const activeItemOffsetTop = activeItem.getBoundingClientRect().top;
        const scrollViewportOffsetTop = scrollView.getBoundingClientRect().top;

        const offset = activeItemOffsetTop - scrollViewportOffsetTop;

        scrollView.scrollTo({
            top: scrollView.scrollTop + offset - scrollView.clientHeight / 2,
            behavior: "smooth",
        });
    };

    const menuItems = [
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Dashboard",
            href: route("dashboard"),
            icon: <LayoutGrid className="icon" />,
            active: route().current("dashboard"),
        },
        {
            text: "Billing",
            basePath: "/dashboard/billing",
            icon: <Banknote className="icon" />,
            children: [
                {
                    text: "Dashboard",
                    href: route("billing.index"),
                    active: route().current("billing.index"),
                },
                {
                    text: "Customers",
                    href: route("billing.customers"),
                    active: route().current("billing.customers"),
                },
                {
                    text: "Intakes",
                    href: route("billing.intakes"),
                    active: route().current("billing.intakes"),
                },
                {
                    text: "Subscriptions",
                    href: route("billing.subscriptions"),
                    active: route().current("billing.subscriptions"),
                },
                {
                    text: "Products",
                    href: route("billing.products"),
                    active: route().current("billing.products"),
                },
                {
                    text: "Payments",
                    href: route("billing.payments"),
                    active: route().current("billing.payments"),
                },
                {
                    text: "Payouts",
                    href: route("billing.payouts"),
                    active: route().current("billing.payouts"),
                },
                {
                    text: "Disputes",
                    href: route("billing.disputes"),
                    active: route().current("billing.disputes"),
                },
                {
                    text: "Settings",
                    href: route("billing.settings"),
                    active: route().current("billing.settings"),
                },
            ],
        },
        {
            text: "Sales",
            basePath: "/dashboard/sales",
            icon: <BadgeDollarSign className="icon" />,
            children: [
                {
                    text: "Dashboard",
                    href: route("sales.index"),
                    active: route().current("sales.index"),
                },
                {
                    text: "Leads",
                    href: route("sales.leads"),
                    active: route().current("sales.leads"),
                },
                {
                    text: "Intakes",
                    href: route("sales.intakes"),
                    active: route().current("sales.intakes"),
                },
                {
                    text: "Resources",
                    href: route("sales.resources"),
                    active: route().current("sales.resources"),
                },
            ],
        },
    ];

    return (
        <ScrollArea.Root
            className="grow flex flex-col overflow-x-hidden"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            type="always"
        >
            <ScrollArea.Viewport ref={scrollViewportRef}>
                <nav className="space-y-2 p-4">
                    {menuItems.map((item, index) => {
                        if (item.children && item.children.length > 0) {
                            return (
                                <MenuCollapsible
                                    key={index}
                                    text={item.text}
                                    basePath={item.basePath}
                                    icon={item.icon}
                                    onTransitionEnd={scrollToActive}
                                >
                                    {item.children.map((child, childIndex) => (
                                        <MenuCollapsibleItem
                                            key={childIndex}
                                            text={child.text}
                                            href={child.href}
                                            active={child.active}
                                        />
                                    ))}
                                </MenuCollapsible>
                            );
                        } else if (item.href) {
                            return (
                                <SidebarMenuItem
                                    key={index}
                                    href={item.href}
                                    text={item.text}
                                    icon={item.icon}
                                    active={item.active}
                                />
                            );
                        }
                    })}
                </nav>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="h-full w-1.5">
                <ScrollArea.Thumb className="relative flex-1 rounded-full bg-blue-100/70 hover:bg-blue-100/80" />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
};

export default SidebarMenu;
