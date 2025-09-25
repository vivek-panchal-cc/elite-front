import { AxiosResponse } from "axios";
import * as apiUrl from "@/constants/urls";
import {
  axiosAuthInstance,
  axiosUserInstance,
  axiosProductInstance,
} from "@/http/axios-interceptor";
import { BranchAdd } from "@/types/branches";
import { CompanyAdd } from "@/types/company";
import { UserDetails } from "@/types/profile";
import { objectToFormData } from "./constants/all";
import { ProductAddToBasketParams, ProductRedeemAmount } from "@/types/product";
import {
  OrderStatus,
  OrderSummary,
  PayWithExistingToken,
  Transfer,
} from "@/types/payments";

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginOtpParams {
  mobile_number: string;
  country_code: string;
}

export interface ApiResponse<T = any> {
  success: any;
  status: boolean;
  message: string;
  data: T;
  result?: T;
  statusCode?: number;
}

// API Request Functions
const login = (
  creds: LoginCredentials
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.LOGIN, creds);
};

const logout = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.LOGOUT);
};

const loginOtp = (
  params: LoginOtpParams
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.LOGIN, params);
};

interface DealerRegistrationData {
  dealer_ref: string;
  dealer_name: string;
  dealer_email: string;
  dealer_password: string;
  dealer_address1: string;
  dealer_address2?: string;
  dealer_city: string;
  postcode: string;
  dealer_mobile: string;
  captcha: boolean;
  marketing: boolean;
  term_and_condition: boolean;
}

interface ForgotPasswordData {
  email: string;
}
interface DealerChangePassword {
  old_password: string;
  new_password: string;
}

interface ProductGetParams {
  cat_type_id: number;
  title: string;
}

export interface OrderHistoryReqParams {
  limit?: number;
  orderBy?: "ASC" | "DESC";
  page?: number;
  sortBy?: string;
}

const register = (
  data: DealerRegistrationData
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.REGISTER, data);
};

const checkDealerExists = (data: {
  dealer_acc: string;
}): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(
    apiUrl.AUTH_ENDPOINTS.CHECK_DEALER_EXISTS,
    data
  );
};

const verifyDealer = (data: {
  dealer_acc: string;
  postcode: string;
}): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.VERIFY_DEALER, data);
};

const sendContactDetails = (
  values: Record<string, any>
): Promise<AxiosResponse<ApiResponse>> => {
  const formData = objectToFormData(values);
  return axiosAuthInstance.post(
    apiUrl.AUTH_ENDPOINTS.RE_REGISTER_REQ_DEALER,
    formData
  );
};

const changePassword = (
  data: DealerChangePassword
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.put(apiUrl.USER_ENDPOINTS.CHANGE_PASSWORD, data);
};

const forgotPassword = (
  email: ForgotPasswordData
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.FORGOT_PASSWORD, email);
};

const resetPassword = (data: {
  token: string;
  password: string;
  password_confirmation: string;
}): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.RESET_PASSWORD, data);
};

const getProfile = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosUserInstance.get(apiUrl.USER_ENDPOINTS.PROFILE);
};

const updateProfile = (
  data: UserDetails
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosUserInstance.put(apiUrl.USER_ENDPOINTS.UPDATE_PROFILE, data);
};

const getCategory = (data: {
  title: string;
}): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PRODUCT_ENDPOINTS.CATEGORIES, data);
};

const getProducts = (
  data: ProductGetParams
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PRODUCT_ENDPOINTS.PRODUCT_LIST, data);
};

const addToBasket = (
  data: ProductAddToBasketParams
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(
    apiUrl.PRODUCT_ENDPOINTS.ORDER_ADD_TO_BASKET,
    data
  );
};

const topProductsOfTheWeek = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(
    apiUrl.PRODUCT_ENDPOINTS.TOP_PRODUCTS_OF_WEEK
  );
};

const getProductDetails = (id: string): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(apiUrl.PRODUCT_ENDPOINTS.DETAILS(id));
};

const addOrRemoveFavourite = (data: {
  prodId: number;
  action: "add" | "remove";
}): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(
    apiUrl.PRODUCT_ENDPOINTS.ADD_OR_REMOVE_FAVOURITE,
    data
  );
};

const getFavouriteProduct = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(
    apiUrl.PRODUCT_ENDPOINTS.FAVOURITE_PRODUCT_LIST
  );
};

const getBranches = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.BRANCH_LIST);
};

const addBranch = (data: BranchAdd): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.BRANCH_CREATE, data);
};

const updateBranch = (
  id: string,
  data: BranchAdd
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.put(apiUrl.PROFILE.BRANCH_UPDATE(id), data);
};

const deleteBranch = (id: string): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.delete(apiUrl.PROFILE.BRANCH_DELETE(id));
};

const getCompany = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(apiUrl.PROFILE.COMPANY);
};

const addCompany = (data: CompanyAdd): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.COMPANY_ADD, data);
};

const getRewards = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.MY_REWARDS);
};

const getDealerSummary = (id: number): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(apiUrl.PROFILE.DEALER_SUMMARY(id));
};

const getDealerGraph = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.DEALER_GRAPH);
};

const getDealerLatestOffer = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(apiUrl.PROFILE.DEALER_LATEST_OFFER);
};

const getTopCategory = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.DEALER_TOP_CATEGORY);
};

const getDealerRewardPoints = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.DEALER_REWARD_POINTS);
};

const getDealerActivation = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PROFILE.DEALER_ACTIVATION);
};

const getOrderHistory = (
  data: OrderHistoryReqParams
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(
    apiUrl.PRODUCT_ENDPOINTS.ORDER_HISTORY,
    data
  );
};

const clearCart = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.delete(apiUrl.PRODUCT_ENDPOINTS.CLEAR_CART);
};

const updateRedeemAmount = (
  data: ProductRedeemAmount
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.put(
    apiUrl.PRODUCT_ENDPOINTS.UPDATE_REDEEM_AMOUNT,
    data
  );
};

const cartItems = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PRODUCT_ENDPOINTS.CART_LIST);
};

// Payments
const getCardList = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(apiUrl.PAYMENT.CARD_LIST);
};

const paymentInitiate = (): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PAYMENT.PAYMENT_INITIATE);
};

const createPayment = (
  data: OrderSummary
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PAYMENT.PAYMENT_PAGE, data);
};

const checkOrderStatus = (
  data: OrderStatus
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.PAYMENT.ORDER_STATUS, data);
};

const getOrderDetails = (
  params: Record<string, string | number>
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(apiUrl.PAYMENT.ORDER_DETAILS, { params });
};

const setAsDefaultCard = (id: string): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.put(apiUrl.PAYMENT.CARD_ACTION(id));
};

const deleteCard = (id: string): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.delete(apiUrl.PAYMENT.CARD_ACTION(id));
};

const payWithExistingToken = (
  data: PayWithExistingToken
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(
    apiUrl.PAYMENT.PAY_WITH_EXISTING_TOKEN,
    data
  );
};

const transferSimply = (
  data: Transfer
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.TRANSFER.TRANSFER_SIMPLY, data);
};

const transferGCERP = (data: Transfer): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.TRANSFER.TRANSFER_GCERP, data);
};

const transferPaypal = (
  data: Transfer
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.post(apiUrl.TRANSFER.TRANSFER_PAYPAL, data);
};

// Export all API functions in a single object
export const apiRequest = {
  // Auth
  login,
  logout,
  loginOtp,
  register,
  checkDealerExists,
  verifyDealer,
  sendContactDetails,
  changePassword,
  forgotPassword,
  resetPassword,

  // User
  getProfile,
  updateProfile,

  // Products
  getProducts,
  addToBasket,
  getProductDetails,
  getCategory,
  addOrRemoveFavourite,
  getFavouriteProduct,

  // Profile
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
  getCompany,
  addCompany,
  getRewards,
  getDealerSummary,
  topProductsOfTheWeek,
  getDealerGraph,
  getDealerLatestOffer,
  getTopCategory,
  getOrderHistory,
  clearCart,
  cartItems,
  updateRedeemAmount,
  getCardList,
  createPayment,
  paymentInitiate,
  checkOrderStatus,
  getOrderDetails,
  setAsDefaultCard,
  deleteCard,
  payWithExistingToken,
  getDealerRewardPoints,
  getDealerActivation,
  transferSimply,
  transferGCERP,
  transferPaypal,
} as const;

// Export type for the apiRequest object
export type ApiRequest = typeof apiRequest;

// Export individual functions as well if needed
export {
  login,
  logout,
  loginOtp,
  register,
  checkDealerExists,
  verifyDealer,
  sendContactDetails,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  getProducts,
  addToBasket,
  getProductDetails,
  addOrRemoveFavourite,
  getFavouriteProduct,
  getCategory,
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
  getCompany,
  addCompany,
  getRewards,
  getDealerSummary,
  topProductsOfTheWeek,
  getDealerGraph,
  getDealerLatestOffer,
  getTopCategory,
  getOrderHistory,
  clearCart,
  cartItems,
  updateRedeemAmount,
  getCardList,
  createPayment,
  paymentInitiate,
  checkOrderStatus,
  getOrderDetails,
  setAsDefaultCard,
  deleteCard,
  payWithExistingToken,
  getDealerRewardPoints,
  getDealerActivation,
  transferSimply,
  transferGCERP,
  transferPaypal,
};
