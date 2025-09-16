"use client"; // If using Next.js App Router

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean); // remove empty strings

  const breadcrumbLinks = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      href,
      label,
    };
  });

  return (
    <nav className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[var(--color-gray)]">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link
            href="/"
            className="hover:underline text-[var(--color-blue)] font-medium"
          >
            Dashboard
          </Link>
        </li>
        {breadcrumbLinks.map((crumb, idx) => (
          <React.Fragment key={crumb.href}>
            <li>/</li>
            <li>
              {idx === breadcrumbLinks.length - 1 ? (
                <span className="text-[var(--color-gray)]">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:underline text-[var(--color-blue)]"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
