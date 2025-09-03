import { ErrorResponse, Response } from "@/types";
import api from "../axios-interceptor";

export interface CountryResponse {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export const countries = async ({
  queryKey,
  signal,
}: {
  queryKey: readonly string[];
  signal: AbortSignal;
}): Promise<Response<CountryResponse[]>> => {
  try {
    const [apiEndpoint] = queryKey;
    const response = await api.get<Response<CountryResponse[]>>(apiEndpoint, {
      signal,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as ErrorResponse;
    const errMsg = err.response?.data?.message ?? err.message;
    throw new Error(errMsg);
  }
};

/**
 * TODO: Call countries hook in component
 * STEP 1:
 *  const { isLoading, data } = useQuery({
      queryKey: [API_ENDPOINT.COUNTRIES],
      queryFn: ({ queryKey, signal }) => countries({ queryKey, signal }),
    });
 */
