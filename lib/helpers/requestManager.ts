import { AxiosRequestConfig } from "axios";

type PendingRequest = AxiosRequestConfig;

const pendingRequests = new Set<string>();

const getRequestKey = (config: PendingRequest): string => {
  const { url, method, params, data } = config;
  return [
    url || "",
    method || "",
    params ? JSON.stringify(params) : "",
    data ? JSON.stringify(data) : "",
  ].join("&");
};

export const addPendingRequest = (config: PendingRequest): boolean => {
  const requestKey = getRequestKey(config);
  if (pendingRequests.has(requestKey)) {
    return false;
  }
  pendingRequests.add(requestKey);
  return true;
};

export const removePendingRequest = (config: PendingRequest): void => {
  const requestKey = getRequestKey(config);
  pendingRequests.delete(requestKey);
};
