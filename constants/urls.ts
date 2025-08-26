// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/dealer/login",
  REGISTER: "/dealer/register",
  LOGOUT: "/dealer/logout",
  REFRESH_TOKEN: "/refresh-token",
  FORGOT_PASSWORD: "/dealer/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: "/profile",
  UPDATE_PROFILE: "/update-profile",
  CHANGE_PASSWORD: "/change-password",
} as const;

// Product endpoints
export const PRODUCT_ENDPOINTS = {
  PRODUCT_LIST: "orders/product-list",
  DETAILS: (id: string) => `/details/${id}`,
  CATEGORIES: "orders/cat-type-list",
} as const;

export const PROFILE = {
  BRANCH_LIST: "/branches",
  BRANCH_CREATE: "/branches/create",
  BRANCH_UPDATE: (id: string) => `/branches/edit/${id}`,
  BRANCH_DELETE: (id: string) => `/branches/delete/${id}`,
};

// Generate full URLs with base path
export const generateUrl = (basePath: string, endpoint: string) =>
  `${basePath}${endpoint}`;
