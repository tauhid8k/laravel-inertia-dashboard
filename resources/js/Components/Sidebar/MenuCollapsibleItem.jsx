import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

const MenuCollapsibleItem = ({ href, active, text, ...props }) => {
    return (
        <Link
            href={href}
            className={cn(
                "relative flex gap-2 items-center tracking-wide focus-visible:outline-none first:pt-4 py-1.5 before:content-[''] before:h-px before:w-[1.6rem] before:bg-blue-400 before:transition-colors transition-colors",
                {
                    "text-white active": active,
                    "text-blue-200 hover:text-white": !active,
                }
            )}
            {...props}
        >
            {text}
        </Link>
    );
};

export default MenuCollapsibleItem;
