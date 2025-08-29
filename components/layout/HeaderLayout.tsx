"use client";

import { Button } from "@/components/ui/ButtonUI";
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
import LoaderDiv from "../loaders/LoaderDiv";

const publicNavigationItems = [
  { name: navigationLabels.offers, href: "/offers" },
  // { name: navigationLabels.vapeProducts, href: "/vape-products" },
  { name: navigationLabels.contactUs, href: "/contact" },
];

const privateNavigationItems = [
  { name: navigationLabels.home, href: "/dashboard" },
  { name: navigationLabels.orders, href: "/order" },
  { name: navigationLabels.claim, href: "/claim" },
  { name: navigationLabels.transfer, href: "/transfer" },
  // { name: navigationLabels.vapeProducts, href: "/vape-products" },
  { name: navigationLabels.reports, href: "/reports" },
  { name: navigationLabels.contactUs, href: "/contact" },
];

export function HeaderLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const { isAuthenticated, loading } = useAuthContext();

  const navigationItems = isAuthenticated
    ? privateNavigationItems
    : publicNavigationItems;
  const cartItemCount = 5; // Replace with actual cart count from your cart state

  return (
    <header className="bg-[var(--color-soft-white)] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-[12px] sm:px-[20px] md:px-[30px] lg:px-[60px] py-3">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center mr-4 md:mr-0 md:justify-start justify-center flex-1">
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
            {!loading ? (
              <nav className="hidden md:flex">
                {navigationItems.map((item) => (
                  <CustomLink
                    key={item.name}
                    href={item.href}
                    className="text-[var(--color-dark-gray)] px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </CustomLink>
                ))}
              </nav>
            ) : (
              <div className="hidden md:flex space-x-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <LoaderDiv
                    key={i}
                    height="20"
                    width="80"
                    uniqueKey="loader-nav"
                  />
                ))}
              </div>
            )}

            {/* Cart Icon - Only show when NOT authenticated */}
            {isAuthenticated && (
              <Link
                href="/cart"
                className="relative items-center hidden md:flex lg:flex xl:flex 2xl:flex"
              >
                <div className="flex items-center">
                  {/* Cart Icon Section */}
                  <div className="relative bg-[var(--color-blue)] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-y border-l border-[var(--color-blue)]">
                    <Image
                      src={shoppingCart}
                      alt="shopping cart"
                      className="h-4 w-4 sm:h-6 sm:w-6 ml-[-4px] sm:ml-[-6px]"
                      priority
                    />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -left-2 sm:-left-3 bg-[#E15325] text-[var(--color-white)] text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-semibold">
                        {cartItemCount}
                      </span>
                    )}
                  </div>

                  {/* Amount Section */}
                  <div className="bg-[var(--color-soft-white)] border-2 border-[var(--color-blue)] rounded-r-full ml-[-8px] sm:ml-[-10px] h-6 sm:h-8 px-2 sm:px-3 flex items-center">
                    <span className="text-[var(--color-blue)] font-bold text-[12px] sm:text-[16px] pr-1 sm:pr-2">
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
        <div className="md:hidden pt-4 flex flex-col h-[50vh]">
          {/* Scrollable navigation items */}
          <nav className="flex-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <CustomLink
                key={item.name}
                href={item.href}
                className="flex justify-between text-[var(--color-dark-gray)] px-10 py-2 text-sm font-medium"
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
            {isAuthenticated && (
              <nav className="flex-1 overflow-y-auto">
                <CustomLink
                  key="cart"
                  href="/cart"
                  className="flex justify-between text-[var(--color-dark-gray)] px-10 py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {profileLabels.cart}
                  <Image
                    src={burgerMenuArrow}
                    alt="Menu arrow"
                    className="h-[15px] w-[10px]"
                  />
                </CustomLink>
                <CustomLink
                  key="profile"
                  href="/profile"
                  className="flex justify-between text-[var(--color-dark-gray)] px-10 py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {profileLabels.myProfile}
                  <Image
                    src={burgerMenuArrow}
                    alt="Menu arrow"
                    className="h-[15px] w-[10px]"
                  />
                </CustomLink>
              </nav>
            )}
          </nav>

          {/* Sticky button section */}
          <div className="sticky bottom-0 py-4 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            {isAuthenticated ? (
              <Button
                className="px-8 bg-[var(--color-red)] text-[var(--color-soft-white)] rounded-[50px]"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setLogoutOpen(true);
                }}
              >
                {commonLabels.logout}
              </Button>
            ) : (
              <Button
                className="px-8 bg-[var(--color-blue)] text-[var(--color-soft-white)] rounded-[50px]"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setLoginOpen(true);
                }}
              >
                {commonLabels.login}
              </Button>
            )}
          </div>
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
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <RegistrationForm
          setRegistrationClose={setSignUpOpen}
          setLogin={setLoginOpen}
        />
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
