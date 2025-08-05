// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/dealer/register",
  LOGOUT: "/logout",
  REFRESH_TOKEN: "/refresh-token",
  FORGOT_PASSWORD: "/forgot-password",
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
  LIST: "/list",
  DETAILS: (id: string) => `/details/${id}`,
  CATEGORIES: "/categories",
} as const;

// Saving Jar endpoints
export const SAVING_JAR_ENDPOINTS = {
  INVITED_MEMBER_RECURRING_DETAILS:
    "/get-invited-member-recurring-for-saving-jar",
  DASHBOARD_STATISTICS_DESCRIPTION:
    "/get-saving-jar-dashboard-stats-description",
} as const;

// Generate full URLs with base path
export const generateUrl = (basePath: string, endpoint: string) =>
  `${basePath}${endpoint}`;
