import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-dark-900 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 border border-light-400 rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent",
            "disabled:bg-light-300 disabled:cursor-not-allowed",
            error && "border-red",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
