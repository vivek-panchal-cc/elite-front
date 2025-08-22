import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          "text-[var(--color-black)] file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-full border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          error
            ? "border-[var(--color-red)] ring-red-500/20"
            : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />

      {typeof error === "string" && error && (
        <div className="text-[var(--color-red)] text-sm mt-1 ml-3">{error}</div>
      )}
    </div>
  );
}

export { Input };
