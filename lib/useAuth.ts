import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "./utils";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const currentToken = getToken();
      setToken(currentToken);
      setIsAuthenticated(!!currentToken);
      if (!currentToken && window.location.pathname.startsWith("/dashboard")) {
        router.replace("/");
      }
    };
    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return { isAuthenticated, token };
}
