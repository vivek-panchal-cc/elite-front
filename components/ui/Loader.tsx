import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  className?: string;
}

export const DefaultLoader: React.FC<LoaderProps> = ({
  size = "md",
  variant = "spinner",
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const renderSpinner = () => (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-primary/20 border-t-primary",
        sizeClasses[size]
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  const renderDots = () => (
    <div className="flex items-center gap-1" role="status" aria-label="Loading">
      <div
        className={cn(
          "animate-bounce rounded-full bg-primary",
          sizeClasses[size]
            .split(" ")[0]
            .replace("w-", "w-")
            .replace("h-", "h-")
        )}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className={cn(
          "animate-bounce rounded-full bg-primary",
          sizeClasses[size]
            .split(" ")[0]
            .replace("w-", "w-")
            .replace("h-", "h-")
        )}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className={cn(
          "animate-bounce rounded-full bg-primary",
          sizeClasses[size]
            .split(" ")[0]
            .replace("w-", "w-")
            .replace("h-", "h-")
        )}
        style={{ animationDelay: "300ms" }}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );

  const renderPulse = () => (
    <div
      className={cn("animate-pulse rounded-full bg-primary", sizeClasses[size])}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  const renderBars = () => (
    <div className="flex items-center gap-1" role="status" aria-label="Loading">
      <div
        className={cn(
          "animate-pulse bg-primary rounded",
          sizeClasses[size].split(" ")[0].replace("w-", "w-1"),
          "h-8"
        )}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className={cn(
          "animate-pulse bg-primary rounded",
          sizeClasses[size].split(" ")[0].replace("w-", "w-1"),
          "h-8"
        )}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className={cn(
          "animate-pulse bg-primary rounded",
          sizeClasses[size].split(" ")[0].replace("w-", "w-1"),
          "h-8"
        )}
        style={{ animationDelay: "300ms" }}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "bars":
        return renderBars();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {renderLoader()}
    </div>
  );
};

export default DefaultLoader;
