import { BadgeDollarSign, Banknote, LayoutGrid } from "lucide-react";
import MenuCollapsible from "./MenuCollapsible";
import MenuCollapsibleItem from "./MenuCollapsibleItem";
import SidebarMenuItem from "./SidebarMenuItem";
import { useSidebar } from "@/Providers/SidebarProvider";

const SidebarMenu = () => {
    const { handleHover } = useSidebar();

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
    ];

    return (
        <nav
            className="grow flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-4"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
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
    );
};

export default SidebarMenu;
