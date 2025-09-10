// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/dealer/login",
  REGISTER: "/dealer/register",
  CHECK_DEALER_EXISTS: "dealer/check-dealer-exist",
  VERIFY_DEALER: "/dealer/verify-dealer",
  RE_REGISTER_REQ_DEALER: "/dealer/re-register-req",
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
  CHANGE_PASSWORD: "/dealer/change-password",
} as const;

// Product endpoints
export const PRODUCT_ENDPOINTS = {
  PRODUCT_LIST: "orders/product-list",
  DETAILS: (id: string) => `/details/${id}`,
  CATEGORIES: "orders/cat-type-list",
  ADD_OR_REMOVE_FAVOURITE: "/favorites/add-favorite",
  FAVOURITE_PRODUCT_LIST: "/favorites/favorite-list",
  TOP_PRODUCTS_OF_WEEK: "/orders/top-products-of-week",
  ORDER_HISTORY: "/orders/order-history",
  ORDER_ADD_TO_BASKET: "/orders/add-to-basket",
  CLEAR_CART: "/orders/cart",
  CART_LIST: "/orders/cart-list",
  UPDATE_REDEEM_AMOUNT: "orders/update-redeem-amount",
} as const;

export const PROFILE = {
  BRANCH_LIST: "/branches",
  BRANCH_CREATE: "/branches/create",
  BRANCH_UPDATE: (id: string) => `/branches/edit/${id}`,
  BRANCH_DELETE: (id: string) => `/branches/delete/${id}`,
  COMPANY: "/company",
  COMPANY_ADD: "/company/add-company",
  MY_REWARDS: "/dealer/my-rewards",
  DEALER_SUMMARY: (id: number) => `/dealer/dealer-summary/${id}`,
  DEALER_GRAPH: "/dealer/get-rewards",
  DEALER_LATEST_OFFER: "/dealer/get-latest-offers",
  DEALER_TOP_CATEGORY: "/dealer/top-categories",
};

// Generate full URLs with base path
export const generateUrl = (basePath: string, endpoint: string) =>
  `${basePath}${endpoint}`;
