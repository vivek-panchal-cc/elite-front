"use client";

import { Button } from "@/components/ui/ButtonUI";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { CustomLink } from "@/components/ui/CustomLink";
import Image from "next/image";
import { useState } from "react";
import {
  burgerMenu,
  burgerMenuArrow,
  closeIcon,
  images,
  shoppingCart,
} from "@/components/images";
import {
  navigationLabels,
  commonLabels,
  altTextLabels,
  profileLabels,
} from "@/lib/labels";
import Modal from "../ui/Modal";
import LoginForm from "../pages/login-form/LoginForm";
import RegistrationForm from "../pages/registration-form/RegistrationForm";
import Logout from "../pages/logout/Logout";
import { useAuthContext } from "@/lib/AuthProvider";
import ResetPassword from "../pages/reset-password/ResetPasswordForm";
import ProfileMenu from "../ui/ProfileMenu";
import WrapAmount from "../wrapper/WrapAmount";

const publicNavigationItems = [
  { name: navigationLabels.offers, href: "/offers" },
  { name: navigationLabels.vapeProducts, href: "/vape-products" },
  { name: navigationLabels.contactUs, href: "/contact" },
];

const privateNavigationItems = [
  { name: navigationLabels.home, href: "/dashboard" },
  { name: navigationLabels.orders, href: "/order" },
  { name: navigationLabels.claim, href: "/claim" },
  { name: navigationLabels.transfer, href: "/transfer" },
  { name: navigationLabels.vapeProducts, href: "/vape-products" },
  { name: navigationLabels.reports, href: "/reports" },
  { name: navigationLabels.contactUs, href: "/contact" },
];

export function HeaderLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const { isAuthenticated, token } = useAuthContext();

  const navigationItems = isAuthenticated
    ? privateNavigationItems
    : publicNavigationItems;
  const cartItemCount = 5; // Replace with actual cart count from your cart state

  return (
    <header className="bg-[var(--color-soft-white)] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-[12px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center mr-4 md:mr-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={images.elite_logo}
                alt={altTextLabels.eliteLogo}
                width={237}
                height={51}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right side - Navigation and Buttons */}
          <div className="flex items-center ml-auto space-x-3 sm:space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              {navigationItems.map((item) => (
                <CustomLink
                  key={item.name}
                  href={item.href}
                  className="text-[#363848] px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </CustomLink>
              ))}
            </nav>

            {/* Cart Icon - Only show when NOT authenticated */}
            {isAuthenticated && (
              <Link href="/cart" className="relative flex items-center">
                <div className="flex items-center">
                  {/* Cart Icon Section */}
                  <div className="relative bg-[#10499E] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-y border-l border-[#10499E]">
                    <Image
                      src={shoppingCart}
                      alt="shopping cart"
                      className="h-4 w-4 sm:h-6 sm:w-6 ml-[-4px] sm:ml-[-6px]"
                      priority
                    />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -left-2 sm:-left-3 bg-[#F14A29] text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-semibold">
                        {cartItemCount}
                      </span>
                    )}
                  </div>

                  {/* Amount Section */}
                  <div className="bg-[var(--color-soft-white)] border-2 border-[#10499E] rounded-r-full ml-[-8px] sm:ml-[-10px] h-6 sm:h-8 px-2 sm:px-3 flex items-center">
                    <span className="text-[#10499E] font-bold text-[12px] sm:text-[16px] pr-1 sm:pr-2">
                      <WrapAmount value={"50.0"} />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* User Actions */}
            <ProfileMenu
              isAuthenticated={isAuthenticated}
              setLoginOpen={setLoginOpen}
              setLogoutOpen={setLogoutOpen}
            />

            {/* Mobile menu button */}
            <button
              className="md:hidden flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <Image
                  src={closeIcon}
                  alt="close"
                  className="h-[25px] w-[25px] min-w-[25px] min-h-[25px]"
                />
              ) : (
                <Image
                  src={burgerMenu}
                  alt="Menu"
                  className="h-[25px] w-[25px] min-w-[25px] min-h-[25px]"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-4">
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <CustomLink
                key={item.name}
                href={item.href}
                className="flex justify-between text-[#363848] px-10 py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
                <Image
                  src={burgerMenuArrow}
                  alt="Menu arrow"
                  className="h-[15px] w-[10px]"
                />
              </CustomLink>
            ))}

            <div className="mt-4 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              {isAuthenticated ? (
                <Button
                  className="px-8 mt-5 bg-[#ED174B] text-[var(--color-soft-white)] rounded-[50px]"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setLogoutOpen(true);
                  }}
                >
                  {commonLabels.logout}
                </Button>
              ) : (
                <Button
                  className="px-8 mt-5 bg-[#10499E] text-[var(--color-soft-white)] rounded-[50px]"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setLoginOpen(true);
                  }}
                >
                  {commonLabels.login}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <LoginForm
          setLoginClose={setLoginOpen}
          setSignUpOpen={setSignUpOpen}
          setResetPasswordOpen={setResetPasswordOpen}
        />
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        classStyle=""
        isClose={true}
      >
        <RegistrationForm setRegistrationClose={setSignUpOpen} />
      </Modal>

      {/* Logout Modal */}
      <Modal
        isOpen={isLogoutOpen}
        onClose={() => setLogoutOpen(false)}
        classStyle=""
        isClose={false}
      >
        <Logout setLogoutOpen={setLogoutOpen} />
      </Modal>
      <Modal
        isOpen={resetPasswordOpen}
        onClose={() => setResetPasswordOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <ResetPassword setLoginClose={setResetPasswordOpen} />
      </Modal>
    </header>
  );
}
