import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { Button } from "./ButtonUI";
import { commonLabels, profileLabels } from "@/lib/labels";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
  isAuthenticated: boolean;
  setLoginOpen: (open: boolean) => void;
  setLogoutOpen: (open: boolean) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isAuthenticated,
  setLoginOpen,
  setLogoutOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/profile");
    setIsOpen(false);
  };

  return isAuthenticated ? (
    <div className="relative hidden md:inline-block" ref={dropdownRef}>
      {/* Profile Icon */}
      <button
        className="w-10 h-10 rounded-full bg-white border flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <User className="text-[var(--color-black)] w-5 h-5" />
      </button>

      {/* Dropdown (on click) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-30 bg-white border rounded-md shadow-md z-50 divide-y divide-[#E9E9E9]">
          <button
            className="w-full text-center font-medium px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
            onClick={handleProfileOpen}
          >
            {profileLabels.myProfile}
          </button>
          <button
            className="w-full text-[var(--color-red)] font-medium text-center px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
            onClick={() => {
              setLogoutOpen(true);
              setIsOpen(false);
            }}
            role="menuitem"
          >
            {commonLabels.logout}
          </button>
        </div>
      )}
    </div>
  ) : (
    <Button
      className="hidden md:inline-flex bg-[var(--color-blue)] text-[var(--color-soft-white)] rounded-[50px]"
      onClick={() => setLoginOpen(true)}
    >
      {commonLabels.login}
    </Button>
  );
};

export default ProfileMenu;
