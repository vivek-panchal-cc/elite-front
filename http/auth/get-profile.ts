import { api } from "@/http/client";
import { AUTH_ENDPOINTS } from "@/constants/urls";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types";

export interface GetProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  is2FAEnabled: boolean;
  mobile: string;
  profileStatus: "pending" | "approved" | "rejected" | "disabled";
  // Add other fields as needed
}

export const getProfile = () => {
  return api.get<ApiResponse<GetProfileResponse>>(AUTH_ENDPOINTS.GET_PROFILE);
};
