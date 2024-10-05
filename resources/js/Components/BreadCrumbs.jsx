import { Link, usePage } from "@inertiajs/react";

const BreadCrumbs = () => {
    const { url } = usePage();
    const urlSegments = url.split("/").filter((segment) => segment);

    let generatedLink;

    return (
        <div className="p-5 flex">
            {urlSegments.map((segment, index) => {
                generatedLink += `/${segment}`;

                return (
                    <div key={index} className="text-slate-500">
                        <Link href={generatedLink}>
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </Link>
                        {index < urlSegments.length - 1 && (
                            <span className="px-2">/</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
