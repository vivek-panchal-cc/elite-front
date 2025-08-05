import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "@/http/axios-interceptor";
import { AUTH_ENDPOINTS } from "@/constants/urls";
import {
  DealerRegistrationData,
  DealerRegistrationResponse,
} from "@/types/dealer";

export const DealerService = {
  /**
   * Register a new dealer
   * @param data - Dealer registration form data
   */
  register: (
    data: DealerRegistrationData
  ): Promise<AxiosResponse<DealerRegistrationResponse>> => {
    // Transform the data to match the API format
    const formData = {
      dealer_ref: data.dealer_ref,
      dealer_name: data.dealer_name,
      dealer_email: data.dealer_email,
      dealer_password: data.dealer_password,
      dealer_address1: data.dealer_address1,
      dealer_address2: data.dealer_address2 || "",
      dealer_city: data.dealer_city,
      postcode: data.postcode,
      dealer_mobile: data.dealer_mobile,
    };

    return axiosAuthInstance.post(AUTH_ENDPOINTS.REGISTER, formData);
  },
};
