import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "@/http/client";
// import { useAuthStore } from "@/stores/auth-store";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

// let isRefreshing = false;

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // const originalRequest = error.config as AxiosRequestConfigWithRetry;
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   if (!isRefreshing) {
    //     isRefreshing = true;
    //     try {
    //       await api.post("/users/refresh");
    //       console.log("Token refreshed");
    //     } catch (refreshError) {
    //       console.error("Refresh failed:", refreshError);
    //       useAuthStore.getState().logout();
    //       // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    //       return void Promise.reject(refreshError);
    //     } finally {
    //       isRefreshing = false;
    //     }
    //   }

    //   try {
    //     return await api(originalRequest);
    //   } catch (retryError) {
    //     if ((retryError as AxiosError).response?.status === 401) {
    //       useAuthStore.getState().logout();
    //     }
    //     // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    //     return Promise.reject(retryError);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default api;
