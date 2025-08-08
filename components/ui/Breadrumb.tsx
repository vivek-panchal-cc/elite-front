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
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link href="/" className="hover:underline text-blue-600 font-medium">
            Home
          </Link>
        </li>
        {breadcrumbLinks.map((crumb, idx) => (
          <React.Fragment key={crumb.href}>
            <li>/</li>
            <li>
              {idx === breadcrumbLinks.length - 1 ? (
                <span className="text-gray-500">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:underline text-blue-600"
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
