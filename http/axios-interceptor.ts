import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { storageRequest } from "@/lib/helpers/storageRequests";
import {
  browserName,
  fullVersion,
  timeZone,
} from "@/lib/helpers/headerRequests";
import {
  addPendingRequest,
  removePendingRequest,
} from "@/lib/helpers/requestManager";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/AuthStore";

interface ApiErrorResponse {
  message?: string;
  data?: {
    redirect_to?: string;
    system_option_manual_kyc_status?: string;
  };
}

// Create axios instances for different services
export const axiosAuthInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
});

export const axiosUserInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
});

export const axiosProductInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
});

// Request interceptor
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const countryTimeZone = storageRequest.getTimeZone();
  const country_time_zone = countryTimeZone
    ? countryTimeZone.country_time_zone
    : null;
  const token = storageRequest.getAuth();

  config.headers = config.headers || new axios.AxiosHeaders();

  config.headers["Os-Version"] = `${browserName}/${fullVersion}`;
  config.headers["Device-Type"] = "web";
  config.headers["User-Timezone"] = country_time_zone || timeZone;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
};

// Response interceptor
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

let isToastShown = false;

const handleRedirect = (
  path: string,
  message?: string,
  additionalParams: Record<string, string> = {}
) => {
  const url = new URL(path, window.location.origin);
  if (message) url.searchParams.set("message", message);

  for (const [key, value] of Object.entries(additionalParams)) {
    url.searchParams.set(key, value);
  }

  window.location.href = url.toString();
};

// Error interceptor
const responseErrorInterceptor = (error: AxiosError<ApiErrorResponse>) => {
  const errResponse = error.response;
  if (!errResponse) {
    if (error.code === "ERR_CANCELED") return Promise.reject(error);
    console.error("No response received:", error);
    return Promise.reject(error);
  }

  const { status, data } = errResponse;
  const token = storageRequest.getAuth();
  const message = data?.message;

  // Handle only 401 Unauthorized status
  if (status === 401) {
    if (token && message) {
      toast.error(message); // Changed to error toast since it's an unauthorized error
    }
    storageRequest.removeAuth();
    useAuthStore.getState().logout();
    window.location.href = "/login";
  }

  return Promise.reject(error);
};

// Apply interceptors to all instances
[axiosAuthInstance, axiosUserInstance, axiosProductInstance].forEach(
  (instance: AxiosInstance) => {
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(
      responseInterceptor,
      responseErrorInterceptor
    );
  }
);

export const api = axiosAuthInstance; // For backward compatibility
export default api;
