"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/AuthProvider";
import { apiRequest } from "@/lib/apiRequest";
import { removeToken } from "@/lib/utils";
import { useAuthStore } from "@/stores/AuthStoreDealer";

export default function LogoutPage() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiRequest.logout();
        if (!data.success) {
          throw new Error(data.message);
        }
        removeToken();
        setIsAuthenticated(false);
        useAuthStore.getState().logout();
        router.push("/");
      } catch (error: any) {
        if (typeof error === "string") return console.log(error);
      }
    })();
  }, [router]);

  return null;
}
