import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/Components/Button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const SalesIntakesPage = () => {
    return (
        <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl">Intakes</h2>
            <Link
                href={route("sales.intakes.create")}
                className={cn(buttonVariants())}
            >
                <Plus className="size-5" />
                <span>Create New</span>
            </Link>
        </div>
    );
};

export default SalesIntakesPage;
