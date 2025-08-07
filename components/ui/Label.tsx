import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          // Responsive, accessible, and scalable label styles
          "block text-base font-medium text-gray-700 dark:text-gray-200 mb-1",
          "sm:text-base text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] ml-3",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
