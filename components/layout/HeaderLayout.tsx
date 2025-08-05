"use client";

import { Button } from "@/components/ui/ButtonUI";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { images } from "@/components/images";
import { navigationLabels, commonLabels, altTextLabels } from "@/lib/labels";
import Modal from "../ui/Modal";
import LoginForm from "../pages/login-form/LoginForm";
import RegistrationForm from "../pages/registration-form/RegistrationForm";
import Logout from "../pages/logout/Logout";
import { useAuth } from "@/lib/useAuth";

const publicNavigationItems = [
  { name: navigationLabels.offers, href: "/offers" },
  { name: navigationLabels.vapeProducts, href: "/vape-products" },
  { name: navigationLabels.contactUs, href: "/contact" },
];

const privateNavigationItems = [
  { name: navigationLabels.dashboard, href: "/dashboard" },
  { name: navigationLabels.orders, href: "/orders" },
  { name: navigationLabels.products, href: "/products" },
  { name: navigationLabels.contactUs, href: "/contact" },
];

export function HeaderLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const { isAuthenticated, token } = useAuth();

  const navigationItems = isAuthenticated
    ? privateNavigationItems
    : publicNavigationItems;
  const cartItemCount = 0; // You can replace this with actual cart count from your cart state

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex items-center space-x-4 ml-auto">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Cart Icon - Only show when authenticated */}
            {isAuthenticated && (
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-purple-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Actions */}
            {isAuthenticated ? (
              <Button
                className="bg-[var(--color-blue)] text-[var(--color-soft-white)] rounded-[50px]"
                onClick={() => setLogoutOpen(true)}
              >
                {commonLabels.logout}
              </Button>
            ) : (
              <Button
                className="bg-[var(--color-blue)] text-[var(--color-soft-white)] rounded-[50px]"
                onClick={() => setLoginOpen(true)}
              >
                {commonLabels.login}
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        classStyle=""
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <LoginForm setLoginClose={setLoginOpen} setSignUpOpen={setSignUpOpen} />
      </Modal>
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        classStyle="w-full sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[700px]"
        isClose={true}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <RegistrationForm />
      </Modal>
      <Modal
        isOpen={isLogoutOpen}
        onClose={() => setLogoutOpen(false)}
        classStyle=""
        isClose={false}
      >
        <div style={{ color: "red", fontWeight: "bold" }}></div>
        <Logout setLogoutOpen={setLogoutOpen} />
      </Modal>
    </header>
  );
}
