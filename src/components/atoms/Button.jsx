import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl": variant === "primary",
          "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500 shadow-sm": variant === "secondary",
          "bg-transparent text-primary-600 hover:bg-primary-50 border border-primary-200 focus:ring-primary-500": variant === "outline",
          "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500": variant === "ghost",
          "bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 shadow-lg": variant === "destructive",
          "bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 shadow-lg": variant === "success"
        },
        {
          "h-9 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "default",
          "h-12 px-6 text-lg": size === "lg"
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;