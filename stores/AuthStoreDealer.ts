import { create } from "zustand";
import { useEffect } from "react";

interface Dealer {
  dealer_id: number;
  dealer_name: string;
  dealer_email: string;
  dealer_ref: string;
  current_amount_bal: number;
  paypal_transfer_eligible: any;
  simply_user_ref: any;
  gcerpid: any;
  // Add other fields you use as needed
}

interface User {
  user_id: number;
  user_email: string;
  user_fname: string;
  user_lname: string;
  user_cname: string;
  user_address1: string;
  user_address2: string;
  user_country: string;
  user_county: string;
  user_city: string;
  user_post: string;
  user_phone: string;
  user_s_fname: string;
  user_s_lname: string;
  user_s_cname: string;
  user_s_address1: string;
  user_s_address2: string;
  user_s_country: string;
  user_s_county: string;
  user_s_city: string;
  user_s_post: string;
  user_s_phone: string;
  user_type: string;
  user_ref_number: string;
  user_credit: number;
  user_buyable_credit: number;
  gc_block_status: number;
  user_token: string;
}

interface AuthState {
  dealer: Dealer | null;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuthData: (data: { dealer: Dealer; user: User; token: string }) => void;
  refreshUserData: () => Promise<void>;
  logout: () => void;
}

import { getToken } from "@/lib/utils";
import { apiRequest } from "@/lib/apiRequest";
import { mapProfileToDealer, mapProfileToUser } from "@/types/profile";

// Get initial state from storage and cookies
const getStoredAuthData = () => {
  if (typeof window !== "undefined") {
    const token = getToken();
    const storedUser = localStorage.getItem("user");
    const storedDealer = localStorage.getItem("dealer");

    return {
      token,
      user: storedUser ? JSON.parse(storedUser) : null,
      dealer: storedDealer ? JSON.parse(storedDealer) : null,
    };
  }
  return { token: null, user: null, dealer: null };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...getStoredAuthData(),
  isLoading: false,

  setAuthData: ({ dealer, user, token }) => {
    // Save to storage
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("dealer", JSON.stringify(dealer));
    }
    set({ dealer, user, token });
  },

  refreshUserData: async () => {
    try {
      set({ isLoading: true });
      const response = await apiRequest.getProfile();

      if (response.data?.data) {
        const profileData = mapProfileToUser(response.data.data.user);
        const profileDataDealer = mapProfileToDealer(response.data.data.dealer);
        set({ user: profileData, dealer: profileDataDealer });
        localStorage.setItem("user", JSON.stringify(profileData));
        localStorage.setItem("dealer", JSON.stringify(profileDataDealer));
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    // Clear storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("dealer");
    }
    set({ dealer: null, user: null, token: null });
  },
}));

// Create a wrapped version of the store that automatically refreshes user data
export const useAuthStoreWithAutoRefresh = () => {
  const store = useAuthStore();

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    let isMounted = true;

    const fetchData = async () => {
      const currentToken = getToken();
      if (currentToken && !store.isLoading && isMounted) {
        await store.refreshUserData();
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return store;
};
