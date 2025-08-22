import * as React from "react";
import { cn } from "@/lib/utils";
import Arrow from "../images/svgs/Arrow";
import { profileLabels } from "@/lib/labels";

interface SidebarNavItem {
  title: string;
  icon?: React.ReactNode;
  renderContent?: React.ReactNode;
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
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileOrTablet(isMobile);
      if (isMobile) {
        setExpandedIndex(activeIndex ?? null);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const handleClick = (index: number) => {
    if (isMobileOrTablet) {
      setExpandedIndex((prev) => (prev === index ? null : index));
      onItemSelect?.(index);
    } else {
      onItemSelect?.(index);
    }
  };

  return (
    <nav
      className={cn(
        "flex flex-col",
        isMobileOrTablet ? "gap-6" : "gap-2",
        className
      )}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = !isMobileOrTablet && index === activeIndex;
        const isExpanded = isMobileOrTablet && expandedIndex === index;

        return (
          <div key={item.title} className="flex flex-col">
            <button
              key={item.title}
              onClick={() => handleClick(index)}
              className={cn(
                "relative z-10 group flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all h-[35px] w-full text-left cursor-pointer",
                isMobileOrTablet
                  ? "h-[50px] border border-[var(--color-red)]"
                  : "h-[35px] border border-[var(--color-side-bar)]",
                isActive || isExpanded
                  ? "bg-[var(--color-red)] text-[var(--color-white)] shadow-md border-none"
                  : "bg-[var(--color-light-gray)] text-[var(--color-black)] hover:bg-[var(--color-red)] hover:text-[var(--color-white)] hover:border-none"
              )}
            >
              {item.icon && (
                <span
                  className={cn(
                    "text-lg transition-colors",
                    isActive || isExpanded
                      ? "text-[var(--color-white)]"
                      : "text-[var(--color-red)] group-hover:text-[var(--color-white)]"
                  )}
                >
                  {item.icon}
                </span>
              )}
              {item.title}
              {(!isMobileOrTablet ||
                (isMobileOrTablet &&
                  item.title !== profileLabels.profLogout)) && (
                <span
                  className={cn(
                    "ml-auto transition-transform duration-300",
                    isMobileOrTablet
                      ? isExpanded
                        ? "rotate-270"
                        : "rotate-90"
                      : ""
                  )}
                >
                  <Arrow className="text-inherit" stroke="currentColor" />
                </span>
              )}
            </button>
            {item.renderContent && (
              <>
                {isMobileOrTablet
                  ? isExpanded && (
                      <div className="-mt-2">{item.renderContent}</div>
                    )
                  : isActive && (
                      <div className="-mt-2">{item.renderContent}</div>
                    )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
