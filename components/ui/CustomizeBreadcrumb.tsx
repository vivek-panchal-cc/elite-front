"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CustomBreadcrumbProps {
  rootLabel?: string; // Allows changing "Home" dynamically
  separator?: string; // Allows dynamic separator like "/", ">", "→"
}

const breadcrumbNameMap: Record<string, string> = {
  cart: "Shopping Cart",
  products: "Products",
  details: "Product Details",
  profile: "User Profile",
  settings: "Settings",
};

const CustomizeBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
  rootLabel = "Home",
  separator = ">",
}) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = breadcrumbNameMap[segment] || formatLabel(segment);
    const isLast = index === pathSegments.length - 1;

    return (
      <div key={href} className="flex items-center">
        {!isLast ? (
          <Link
            href={href}
            className="text-[var(--color-blue)] hover:underline"
          >
            {label}
          </Link>
        ) : (
          <span className="text-[var(--color-blue)] font-semibold">
            {label}
          </span>
        )}
        {!isLast && (
          <span className="mx-2 text-[var(--color-blue)]">{separator}</span>
        )}
      </div>
    );
  });

  const breadcrumbList = [
    pathname !== "/" && (
      <div key="root" className="flex items-center">
        <Link href="/" className="text-[var(--color-blue)] hover:underline">
          {rootLabel}
        </Link>
        {pathSegments.length > 0 && (
          <span className="mx-2 text-[var(--color-blue)]">{separator}</span>
        )}
      </div>
    ),
    ...breadcrumbs,
  ];

  return (
    <div className="[&_a]:text-[var(--color-blue)] pb-4 font-bold leading-[27px] text-[14px] md:text-[18px] flex flex-wrap">
      {breadcrumbList}
    </div>
  );
};

function formatLabel(text: string) {
  return text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default CustomizeBreadcrumb;
