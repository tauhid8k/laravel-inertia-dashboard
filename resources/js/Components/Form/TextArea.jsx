import { cn } from "@/lib/utils";

export const TextArea = ({ className, ...props }) => {
    return (
        <textarea
            rows={4}
            className={cn(
                "grid items-center text-base text-slate-700 w-full rounded-md border border-slate-200 shadow-sm px-3 placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-primary-400 focus-visible:ring-1 focus-visible:ring-primary-400 disabled:opacity-70 disabled:bg-slate-100",
                className
            )}
            {...props}
        />
    );
};
