export interface DealerRegistrationData {
  dealer_ref: string;
  dealer_name: string;
  dealer_password: string;
  dealer_email: string;
  dealer_mobile: string;
  postcode: string;
  dealer_city: string;
  dealer_address1: string;
  dealer_address2?: string;
  captcha: boolean;
  marketing: boolean;
  agree: boolean;
}

export interface DealerRegistrationResponse {
  status: boolean;
  message: string;
  data: {
    dealer: {
      id: string;
      dealer_ref: string;
      dealer_name: string;
      dealer_email: string;
      // Add other response fields as needed
    };
  };
}

export interface RewardInfo {
  dealer_name: string;
  reward_balance: number;
  last_10_transactions_amount: number;
  redeem_points: number;
  available_points: number;
}
