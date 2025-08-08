"use client";

import Link from "next/link";
import { ComponentProps } from "react";

interface CustomLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
}

export function CustomLink({
  children,
  className = "",
  ...props
}: CustomLinkProps) {
  return (
    <Link {...props} className={`link-hover ${className}`.trim()}>
      {children}
    </Link>
  );
}
