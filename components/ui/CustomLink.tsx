"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import clsx from "clsx";

interface CustomLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean; // optional exact match toggle
}

export function CustomLink({
  children,
  className = "",
  activeClassName = "text-[var(--color-red)] font-medium", // default active styles
  exact = false,
  ...props
}: CustomLinkProps) {
  const pathname = usePathname();

  // Check if the current route is active
  const isActive = exact
    ? pathname === props.href
    : pathname === props.href || pathname.startsWith(`${props.href}/`);

  return (
    <Link
      {...props}
      className={clsx(
        "transition-colors duration-200 link-hover",
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
}
