import * as React from "react";
import { cn } from "@/lib/utils";
import Arrow from "../images/svgs/Arrow";

interface SidebarNavItem {
  title: string;
  icon?: React.ReactNode;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
  activeIndex?: number; // controlled from parent
  onItemSelect?: (index: number) => void;
}

export function SidebarNav({
  className,
  items,
  activeIndex,
  onItemSelect,
  ...props
}: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col gap-2", className)} {...props}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={item.title}
            onClick={() => onItemSelect?.(index)}
            className={cn(
              "group flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all h-[35px] w-full text-left cursor-pointer",
              isActive
                ? "bg-[var(--color-red)] text-white shadow-md border-none"
                : "bg-[var(--color-light-gray)] text-[var(--color-black)] hover:bg-[var(--color-red)] hover:text-white hover:border-none border border-[var(--color-side-bar)]"
            )}
          >
            {item.icon && (
              <span
                className={cn(
                  "text-lg transition-colors",
                  isActive
                    ? "text-white"
                    : "text-[var(--color-red)] group-hover:text-white"
                )}
              >
                {item.icon}
              </span>
            )}
            {item.title}
            <Arrow className="ml-auto text-inherit" stroke="currentColor" />
          </button>
        );
      })}
    </nav>
  );
}
