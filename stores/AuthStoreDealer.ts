import { create } from "zustand";

interface Dealer {
  dealer_id: number;
  dealer_name: string;
  dealer_email: string;
  dealer_ref: string;
  // Add other fields you use as needed
}

interface User {
  user_id: number;
  user_email: string;
  user_fname: string;
  user_lname: string;
  // Add other fields you use as needed
}

interface AuthState {
  dealer: Dealer | null;
  user: User | null;
  token: string | null;
  setAuthData: (data: { dealer: Dealer; user: User; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  dealer: null,
  user: null,
  token: null,

  setAuthData: ({ dealer, user, token }) => set({ dealer, user, token }),

  logout: () => set({ dealer: null, user: null, token: null }),
}));
