import { ErrorResponse, Response } from "@/types";
import { api } from "../client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/AuthStore";

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
}): Promise<Response<LoginResponse>> => {
  try {
    const response = await api.post<Response<LoginResponse>>(
      queryKey,
      payload
    );
    toast.success(response.data.msg);
    const loginData = response.data.data;
    const user = {
      email: loginData.email,
      firstName: loginData.firstName,
      lastName: loginData.lastName,
      id: loginData.id,
      is2FAEnabled: loginData.is2FAEnabled,
      isShowOtpScreen: loginData.isShowOtpScreen,
    };
    useAuthStore.getState().setUser(user);
    useAuthStore
      .getState()
      .setAuth({ email: payload.email, password: payload.password });
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as ErrorResponse;
    const errMsg = err.response?.data?.msg ?? err.message;
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