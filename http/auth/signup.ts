import { ErrorResponse, Response } from "@/types";
import { api } from "../client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/AuthStore";

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  companyName: string;
  country: string;
  region: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
}

export interface SignupResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  is2FAEnabled: boolean;
  isBasicInfoProvided: boolean;
  emailVerifiedAt: string | null;
  image: string | null;
  googleId: string | null;
  microsoftId: string | null;
  twoFactorSecret: string | null;
  createdAt: string;
  updatedAt: string;
  profileStatus: "pending" | "approved" | "rejected" | "disabled";
  deletedAt: string | null;
  showVerifyEmailScreen: boolean;
  otpToken: string;
}

export const signup = async ({
  queryKey,
  payload,
}: {
  queryKey: string;
  payload: SignupPayload;
}): Promise<Response<SignupResponse>> => {
  try {
    const response = await api.post<Response<SignupResponse>>(
      queryKey,
      payload
    );
    toast.success(response.data.msg);
    const userData = response.data.data;
    useAuthStore.getState().setUserRegistrationDetails({
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mobile: userData.mobile,
      is2FAEnabled: userData.is2FAEnabled,
      isBasicInfoProvided: userData.isBasicInfoProvided,
      emailVerifiedAt: userData.emailVerifiedAt,
      image: userData.image,
      googleId: userData.googleId,
      microsoftId: userData.microsoftId,
      twoFactorSecret: userData.twoFactorSecret,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      profileStatus: userData.profileStatus,
      deletedAt: userData.deletedAt,
      showVerifyEmailScreen: userData.showVerifyEmailScreen,
      otpToken: userData.otpToken,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    const err = error as ErrorResponse;
    const errMsg =
      err.response?.data?.msg ??
      err.response?.data?.errors?.[0]?.msg ??
      err.message;
    toast.error(errMsg);
    throw new Error(errMsg);
  }
};
