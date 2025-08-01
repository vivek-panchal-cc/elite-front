import { SignupPayload } from "@/http/auth/signup";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  is2FAEnabled: boolean;
  isShowOtpScreen: boolean;
}

export interface Auth {
  email: string;
  password: string;
}

export interface UserRegistrationDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  is2FAEnabled: boolean;
  isBasicInfoProvided: boolean;
  emailVerifiedAt: null | string;
  image: null | string;
  googleId: null | string;
  microsoftId: null | string;
  twoFactorSecret: null | string;
  createdAt: string;
  updatedAt: string;
  id: string;
  profileStatus: "pending" | "approved" | "rejected" | "disabled";
  deletedAt: null | string;
  showVerifyEmailScreen: boolean;
  otpToken: string;
}

export interface AuthState {
  user: null | User;
  auth: null | Auth;
  userSinghupData: null | SignupPayload;
  userRegistrationDetails: null | UserRegistrationDetails;
  setUser: (user: User) => void;
  setAuth: (auth: Auth) => void;
  setUserRegistrationDetails: (
    userRegistrationDetails: UserRegistrationDetails
  ) => void;
  setUserSignupPayload: (userPayload: SignupPayload) => void;
  resetAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => {
    return {
      user: null,
      auth: null,
      userRegistrationDetails: null,
      userSinghupData: null,
      setUser: (payload: User) => {
        return set({ user: payload });
      },
      setAuth: (auth: Auth) => {
        return set({ auth: auth });
      },
      setUserRegistrationDetails: (
        userRegistrationDetails: UserRegistrationDetails
      ) => {
        return set({ userRegistrationDetails: userRegistrationDetails });
      },
      setUserSignupPayload: (userSignupPayload: SignupPayload) => {
        set({ userSinghupData: userSignupPayload });
      },
      logout: () => {
        set({ user: null });
        set({ auth: null });
      },
      resetAuth: () => {
        set({ auth: null });
      },
    };
  })
);

/**
 * TODO: How to use auth in component
 *  const auth = useAuthStore((state) => state.auth);
 */