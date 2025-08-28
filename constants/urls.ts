// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/dealer/login",
  REGISTER: "/dealer/register",
  LOGOUT: "/dealer/logout",
  REFRESH_TOKEN: "/refresh-token",
  FORGOT_PASSWORD: "/dealer/forgot-password",
  RESET_PASSWORD: "/reset-password",
  GET_PROFILE: "/dealer/profile",
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: "/dealer/get-user-details",
  UPDATE_PROFILE: "/dealer/update-details",
  CHANGE_PASSWORD: "/change-password",
} as const;

// Product endpoints
export const PRODUCT_ENDPOINTS = {
  PRODUCT_LIST: "orders/product-list",
  DETAILS: (id: string) => `/details/${id}`,
  CATEGORIES: "orders/cat-type-list",
  ADD_OR_REMOVE_FAVOURITE: "/favorites/add-favorite",
  FAVOURITE_PRODUCT_LIST: "/favorites/favorite-list",
} as const;

export const PROFILE = {
  BRANCH_LIST: "/branches",
  BRANCH_CREATE: "/branches/create",
  BRANCH_UPDATE: (id: string) => `/branches/edit/${id}`,
  BRANCH_DELETE: (id: string) => `/branches/delete/${id}`,
  COMPANY: "/company",
  COMPANY_ADD: "/company/add-company",
};

// Generate full URLs with base path
export const generateUrl = (basePath: string, endpoint: string) =>
  `${basePath}${endpoint}`;
