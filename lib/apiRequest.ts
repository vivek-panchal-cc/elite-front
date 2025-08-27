import { AxiosResponse } from "axios";
import * as apiUrl from "@/constants/urls";
import {
  axiosAuthInstance,
  axiosUserInstance,
  axiosProductInstance,
} from "@/http/axios-interceptor";
import { BranchAdd } from "@/types/branches";
import { CompanyAdd } from "@/types/company";

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginOtpParams {
  mobile_number: string;
  country_code: string;
}

interface ApiResponse<T = any> {
  success: any;
  status: boolean;
  message: string;
  data: T;
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
  email: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface ProductGetParams {
  cat_type_id: number;
  title: string;
}

const register = (
  data: DealerRegistrationData
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.AUTH_ENDPOINTS.REGISTER, data);
};

const changePassword = (
  data: DealerChangePassword
): Promise<AxiosResponse<ApiResponse>> => {
  return axiosAuthInstance.post(apiUrl.USER_ENDPOINTS.CHANGE_PASSWORD, data);
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
  data: Record<string, any>
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

const getProductDetails = (id: string): Promise<AxiosResponse<ApiResponse>> => {
  return axiosProductInstance.get(apiUrl.PRODUCT_ENDPOINTS.DETAILS(id));
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

// Export all API functions in a single object
export const apiRequest = {
  // Auth
  login,
  logout,
  loginOtp,
  register,
  changePassword,
  forgotPassword,
  resetPassword,

  // User
  getProfile,
  updateProfile,

  // Products
  getProducts,
  getProductDetails,
  getCategory,

  // Profile
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
  getCompany,
  addCompany,
} as const;

// Export type for the apiRequest object
export type ApiRequest = typeof apiRequest;

// Export individual functions as well if needed
export {
  login,
  logout,
  loginOtp,
  register,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  getProducts,
  getProductDetails,
  getCategory,
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
  getCompany,
  addCompany,
};
