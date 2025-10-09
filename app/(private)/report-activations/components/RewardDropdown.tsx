import * as React from "react";
import { IconDown, IconCircle, IconTrophy } from "@/components/images/icons";

interface RewardsItem {
  name: string;
  gradient: string;
  color: string;
  trophyColor: string;
  downArrowColor: string;
  icon?: React.ReactNode;
  renderContent?: React.ReactNode;
  borderColor?: string;
}

interface RewardDropdownProps extends React.HTMLAttributes<HTMLElement> {
  items: RewardsItem[];
  activeIndex?: number; // controlled from parent
  onItemSelect?: (index: number) => void;
}

export function RewardDropdown({
  items,
  activeIndex,
  onItemSelect,
  ...props
}: RewardDropdownProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    setExpandedIndex(activeIndex ?? null);
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
    onItemSelect?.(index);
  };

  return (
    <>
      <nav
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6"
        {...props}
      >
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div key={item.name} className="flex flex-col">
              <button
                style={{ background: item.gradient }}
                onClick={() => handleClick(index)}
                className={`flex items-center justify-between w-full xl:w-[95%] pl-1 pr-8 py-1 rounded-full cursor-pointer ${item.color}`}
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-10.5 h-10.5">
                    <IconCircle className="w-full h-full text-gray-300" />
                    <IconTrophy
                      className={`absolute top-1/2 left-1/2 w-6 h-6 ${item.trophyColor} -translate-x-1/2 -translate-y-1/2`}
                    />
                  </div>
                  <span className="font-medium text-[12px] leading-[37px]">{item.name}</span>
                </div>
                <IconDown
                  className={`transition-transform duration-100 h-1.5 w-2.5 ${
                    item.downArrowColor
                  } ${isExpanded ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {item.renderContent && isExpanded && (
                <div
                  className={`-mt-5 border-1 ${item.borderColor} border-t-0 rounded-bl-[24px] rounded-br-[24px] xl:w-[95%] `}
                >
                  {item.renderContent}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
