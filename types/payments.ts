export interface Card {
  id: number;
  dealer_id: number;
  transaction_reference: string;
  token_id: string;
  token_href: string;
  last4: string;
  card_type: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
  token_expire_date_time: string;
  address1: string;
  address2: string;
  address3: string;
  postalCode: string;
  city: string;
  state: string;
  countryCode: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

interface UserAddress {
  line1: string | "";
  city: string | "";
  postCode: string | "";
}

interface UserDetails {
  name: string;
  address: UserAddress;
}

export interface OrderSummary {
  sub_total: number | 0;
  total_vat: number | 0;
  delivery_charge: number | 0;
  redeem_amount: number | 0;
  grand_total: number | 0;
  dealerId: number | 0;
  userDetails: UserDetails;
}

export interface CheckoutContextType {
  // canProceed: boolean;
  proceedToCheckout: (order: OrderSummary) => void;
  resetCheckout: () => void;
  order?: OrderSummary;
  setOrder: (order: OrderSummary) => void;
  cardAction: (cardId: string, action: "default" | "delete") => void;
  payInstant: (data: PayWithExistingToken) => void;
}

export interface OrderStatus {
  transaction_reference: string;
}

export interface PayWithExistingToken {
  token_id: number | string;
  grand_total: number;
}

export interface PayInstantResponse {
  isSuccess?: boolean;
  transactionReference?: string;
}

export interface Transfer {
  transfer_amount: number;
  paypal_email?: string;
  confirm_paypal_email?: string;
  receivable_amount?: number;
  paypal_fee?: number;
  avaialble_balance?: number;
}
