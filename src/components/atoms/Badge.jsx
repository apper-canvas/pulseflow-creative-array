import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-gray-100 text-gray-800": variant === "default",
          "bg-primary-100 text-primary-800": variant === "primary",
          "bg-success-100 text-success-800": variant === "success",
          "bg-warning-100 text-warning-800": variant === "warning",
          "bg-error-100 text-error-800": variant === "error"
        },
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;