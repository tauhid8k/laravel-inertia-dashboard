import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                "h-10 grid items-center text-base text-slate-700 w-full rounded-md border shadow-sm px-3 placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-primary-400 focus-visible:ring-1 focus-visible:ring-primary-400 disabled:opacity-70 disabled:bg-slate-100",
                className
            )}
            {...props}
        />
    );
};
