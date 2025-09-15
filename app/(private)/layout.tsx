"use client";
import useCartItems from "@/hooks/useCartItems";
import { useAuthContext } from "@/lib/AuthProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();
  const {} = useCartItems();

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
