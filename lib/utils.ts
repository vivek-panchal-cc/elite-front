import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Token utilities for authentication
export function setToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/;`;
  }
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/;";
  }
}

// export function getToken() {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("token");
// }

export function getToken() {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  if (match) return match[2];
  return null;
}
