import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import Arrow from "../images/svgs/Arrow";
import { cn } from "@/lib/utils";

interface DropdownOption {
  label?: string;
  content?: ReactNode;
  selectable?: boolean;
}

interface DropdownDetailProps {
  label: string;
  options: DropdownOption[];
  onSelect?: (option: string) => void;
  classBtnLabel: string;
  classDropdown: string;
}

export default function DropdownDetail({
  label,
  options,
  onSelect,
  classBtnLabel,
  classDropdown,
}: DropdownDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyles, setDropdownStyles] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Position the dropdown (when opened)
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownStyles({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Dropdown menu JSX
  const dropdownMenu = (
    <div
      className="absolute z-[9999] mt-1 bg-[var(--color-white)] border border-[var(--color-light-gray)] rounded-md shadow-lg"
      style={{
        position: "absolute",
        top: dropdownStyles?.top ?? 0,
        left: dropdownStyles?.left ?? 0,
        width: dropdownStyles?.width ?? "auto",
      }}
    >
      {options.map((option, index) =>
        option.selectable ? (
          <button
            key={index}
            type="button"
            className={`w-full text-left px-4 py-2 hover:bg-[var(--color-light-gray)] ${classBtnLabel}`}
            onClick={() => {
              if (option.label) setSelected(option.label);
              setIsOpen(false);
              if (onSelect && option.label) onSelect(option.label);
            }}
          >
            {option.label}
          </button>
        ) : (
          <div key={index} className="px-4 py-2 cursor-default">
            {option.content}
          </div>
        )
      )}
    </div>
  );

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      <button
        type="button"
        className={`w-full h-[28px] flex items-center justify-between rounded-full border border-[var(--color-blue)] bg-transparent px-4 py-2 cursor-pointer ${classBtnLabel} ${classDropdown}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span
          className={cn(
            "ml-auto transition-transform duration-300",
            isOpen ? "rotate-270" : "rotate-90"
          )}
        >
          <Arrow className="text-inherit h-[9px] w-[9px]" stroke="currentColor" />
        </span>
      </button>

      {/* Render dropdown via portal */}
      {isOpen && dropdownStyles && createPortal(dropdownMenu, document.body)}
    </div>
  );
}
