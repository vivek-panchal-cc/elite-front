"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getToken,
  setToken as setTokenUtil,
  removeToken as removeTokenUtil,
} from "./utils";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Just load the token, no need to handle redirect here
  useEffect(() => {
    const currentToken = getToken();
    setToken(currentToken);
    setIsAuthenticated(!!currentToken);
  }, [pathname]);

  const login = (newToken: string) => {
    setTokenUtil(newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    router.push("/dashboard"); // or any route you want after login
  };

  const logout = () => {
    removeTokenUtil();
    setToken(null);
    setIsAuthenticated(false);
    router.push("/"); // go to landing page after logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
