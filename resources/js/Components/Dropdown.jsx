import { cn } from "@/lib/utils";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";

// Root
export const Dropdown = ({ children, ...props }) => {
    return <Menu {...props}>{children}</Menu>;
};

// Trigger
export const DropdownTrigger = ({ children, as = "button", ...props }) => {
    return (
        <MenuButton as={as} {...props}>
            {children}
        </MenuButton>
    );
};

// Dropdown Items
export const DropdownItems = ({ children, className }) => {
    return (
        <Transition
            enter="transition ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <MenuItems
                anchor="bottom end"
                className={cn(
                    "min-w-48 z-50 bg-white shadow-lg rounded-md p-2 mt-2 focus:outline-none",
                    className
                )}
            >
                {children}
            </MenuItems>
        </Transition>
    );
};

// Dropdown Item
export const DropdownItem = ({
    children,
    as = "button",
    className,
    ...props
}) => {
    return (
        <MenuItem
            as={as}
            className={cn(
                "w-full flex items-center gap-x-1.5 py-2 px-3 rounded-md hover:bg-primary-500 focus:outline-none hover:text-white",
                className
            )}
            {...props}
        >
            {children}
        </MenuItem>
    );
};
