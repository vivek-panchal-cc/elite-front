"use client";
import useCartSummary from "@/hooks/useCartSummary";
import { useAuthContext } from "@/lib/AuthProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();
  const {} = useCartSummary();

  // if (!isAuthenticated) {
  //   return null;
  // }

  return <>{children}</>;
}
