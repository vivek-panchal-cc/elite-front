import { ErrorResponse, Response } from "@/types";
import { api } from "../client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/AuthStoreDealer";
import { setToken } from "@/lib/utils";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  is2FAEnabled: boolean;
  isShowOtpScreen: boolean;
}

export const login = async ({
  queryKey,
  payload,
}: {
  queryKey: string;
  payload: LoginPayload;
}): Promise<Response<any>> => {
  try {
    const response = await api.post<Response<any>>(queryKey, payload);
    toast.success(response.data.message || "Login success!");

    const loginData = response.data.data;
    const { dealer, user, token } = loginData;
    setToken(token);
    // Set user and dealer data in the auth store
    useAuthStore.getState().setAuthData({ dealer, user, token });
    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    const errMsg = err.response?.data?.message ?? err.message;
    toast.error(errMsg);
    throw new Error(errMsg);
  }
};

/**
 * TODO: Call login hook in component
 * STEP 1:  
 *  interface LoginMutationInput {
      queryKey: string;
      payload: LoginPayload;
    }
 *  const { isPending, mutateAsync } = useMutation<
      Response<LoginResponse>,
      Error,
      LoginMutationInput
    >({
      mutationFn: (payload) => login(payload),
    });
    STEP 2:
 *  const onSubmit = async (data: SigninSchemaType) => {
      await mutateAsync({ queryKey: API_ENDPOINT.SIGNIN, payload: data });
    };
 */
