import { ErrorResponse, Response } from "@/types";
import api from "../axios-interceptor";
import { useAuthStore } from "@/stores/AuthStore";

export interface LoginResponse {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  is2FAEnabled: boolean;
  isShowOtpScreen: boolean;
}

export const getUser = async ({
  queryKey,
  signal,
}: {
  queryKey: readonly string[];
  signal: AbortSignal;
}): Promise<Response<LoginResponse>> => {
  try {
    const [apiEndpoint] = queryKey;
    const response = await api.get<Response<LoginResponse>>(apiEndpoint, {
      signal,
    });
    const userData = response.data.data;
    const user = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      id: userData.id,
      is2FAEnabled: userData.is2FAEnabled,
      isShowOtpScreen: userData.isShowOtpScreen,
    };
    useAuthStore.getState().setUser(user);
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as ErrorResponse;
    const errMsg = err.response?.data?.message ?? err.message;
    // toast.error(errMsg);
    throw new Error(errMsg);
  }
};

/**
 * TODO: Call this hook in component 
 * STEP 1:
 * 
 *  const { isLoading } = useQuery({
      queryKey: [API_ENDPOINT.SELF],
      queryFn: ({ queryKey, signal }) => getUser({ queryKey, signal }),
      enabled: shouldFetchUser,
    });
 */
