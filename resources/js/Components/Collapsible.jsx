"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <CollapsiblePrimitive.Content
            ref={ref}
            className={cn(
                "overflow-hidden transition-all data-[state=closed]:animate-collapsible-collapse data-[state=open]:animate-collapsible-expand",
                className
            )}
            {...props}
        >
            {children}
        </CollapsiblePrimitive.Content>
    )
);
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
