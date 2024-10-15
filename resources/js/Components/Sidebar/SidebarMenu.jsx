import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
    BadgeDollarSign,
    Banknote,
    Building2,
    Earth,
    LayoutGrid,
    Settings,
    Shield,
    UsersRound,
} from "lucide-react";
import { useRef, useEffect } from "react";
import MenuCollapsible from "./MenuCollapsible";
import MenuCollapsibleItem from "./MenuCollapsibleItem";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarMenu = () => {
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const scrollView = scrollViewRef.current;
        if (!scrollView) return;

        // Scroll to the active item in the view
        const scrollToActiveItem = () => {
            const activeItem = scrollView.querySelector(".active");
            if (!activeItem) return;

            activeItem.scrollIntoView({
                behavior: "smooth",
                block: "center", // Center the active item in the scroll view
            });
        };

        // Check if there is an active collapsible section
        const activeCollapsible = scrollView.querySelector(
            ".active-collapsible"
        );

        if (activeCollapsible) {
            // If a collapsible section is active, wait for its content transition to finish
            const collapsibleContent = activeCollapsible.querySelector(
                ".collapsible-content"
            );

            if (collapsibleContent) {
                collapsibleContent.addEventListener(
                    "transitionend",
                    (e) => {
                        if (e.propertyName === "max-height") {
                            scrollToActiveItem(); // Scroll after the transition completes
                        }
                    },
                    { once: true } // Remove listener after it triggers once
                );
            }
        } else {
            // If no collapsible section is active, scroll to the single active item
            scrollToActiveItem();
        }
    }, [scrollViewRef.current]);

    const menuItems = [
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
        {
            text: "Clients",
            basePath: "/dashboard/clients",
            icon: <UsersRound className="icon" />,
            children: [
                {
                    text: "Dashboard",
                    href: route("clients.index"),
                    active: route().current("clients.index"),
                },
                {
                    text: "Bulk Manager",
                    href: route("clients.bulkManager"),
                    active: route().current("clients.bulkManager"),
                },
                {
                    text: "Clients Manager",
                    href: route("clients.manager"),
                    active: route().current("clients.manager"),
                },
                {
                    text: "Activities",
                    href: route("clients.activities"),
                    active: route().current("clients.activities"),
                },
                {
                    text: "Notifications",
                    href: route("clients.notifications"),
                    active: route().current("clients.notifications"),
                },
                {
                    text: "Impersonator",
                    href: route("clients.impersonator"),
                    active: route().current("clients.impersonator"),
                },
            ],
        },
        {
            text: "Company",
            basePath: "/dashboard/company",
            icon: <Building2 className="icon" />,
            children: [
                {
                    text: "Users",
                    href: route("company.users"),
                    active: route().current("company.users"),
                },
                {
                    text: "Logs",
                    href: route("company.logs"),
                    active: route().current("company.logs"),
                },
            ],
        },
        {
            text: "Comms",
            basePath: "/dashboard/comms",
            icon: <Earth className="icon" />,
            children: [
                {
                    text: "Message Center",
                    href: route("comms.messageCenter"),
                    active: route().current("comms.messageCenter"),
                },
                {
                    text: "Calender",
                    href: route("comms.calender"),
                    active: route().current("comms.calender"),
                },
            ],
        },
        {
            text: "Roles and Permissions",
            href: route("rolePermissions.index"),
            icon: <Shield className="icon" />,
            active: route().current("rolePermissions.index"),
        },
        {
            text: "Settings",
            href: route("dashboard.settings"),
            icon: <Settings className="icon" />,
            active: route().current("dashboard.settings"),
        },
    ];

    return (
        <ScrollArea.Root
            className="grow flex flex-col overflow-x-hidden"
            type="always"
        >
            <ScrollArea.Viewport ref={scrollViewRef}>
                <nav className="space-y-2 p-4">
                    {menuItems.map((item, index) => {
                        if (item.children && item.children.length > 0) {
                            return (
                                <MenuCollapsible
                                    key={index}
                                    text={item.text}
                                    basePath={item.basePath}
                                    icon={item.icon}
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
