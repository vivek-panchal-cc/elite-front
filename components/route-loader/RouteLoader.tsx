"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoader } from "../providers/loader-provider";

export const RouteLoader = () => {
  const pathname = usePathname();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(true); // show loader immediately on route change

    // Wait for next tick / frame to hide loader after page renders
    requestAnimationFrame(() => {
      setIsLoading(false);
    });
  }, [pathname, setIsLoading]);

  return null;
};
