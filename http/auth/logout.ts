import { ErrorResponse, Response } from "@/types";
import { api } from "../client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/AuthStoreDealer";
import { removeToken, setToken } from "@/lib/utils";

export const logout = async ({
  queryKey,
  setIsAuthenticated,
}: {
  queryKey: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Response<any>> => {
  try {
    const response = await api.post<Response<any>>(queryKey);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // toast.success(response.data.message);
    removeToken();
    setIsAuthenticated(false);
    useAuthStore.getState().logout();
    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    const errMsg = err.response?.data?.message ?? err.message;
    // toast.error(errMsg || "Logout failed");
    throw new Error(errMsg);
  }
};
