export interface OrderDetail {
  ord_id: number;
  dom_id: number;
  user: User;
  ship_comp_id: number;
  tariff_value: number;
  discount_value: number;
  vat_charges: number;
  ord_total_amt: number;
  ord_ip_addr: string;
  ord_datetime: Date;
  carts: Cart[];
  shipping_comp_detail?: any;
  status: PaymentStatus;
  sub_total: string;
  gros_total: string;
}

export interface User {
  user_id: number;
  user_email: string;
  dealer_id: number;
  user_password: string;
  user_fname: string;
  user_lname: string;
  user_cname: string;
  user_address1: string;
  user_address2: string;
  user_country: string;
  user_county: string;
  user_city: string;
  user_post: string;
  user_phone: string;
  user_s_fname: string;
  user_s_lname: string;
  user_s_cname: string;
  user_s_address1: string;
  user_s_address2: string;
  user_s_country: string;
  user_s_county: string;
  user_s_city: string;
  user_s_post: string;
  user_s_phone: string;
  user_sub_newsletter: number;
  user_discount_code: string;
  user_is_firsttime_login: number;
  user_created: string;
  user_last_updated: string | null;
  user_status: number;
  user_hear_aboutus: string;
  user_otherdetails: string;
  user_type: string;
  user_register_id: string;
  user_ref_number: string;
  user_credit: number;
  user_buyable_credit: number;
  gc_block_status: number;
  user_token: string;
  send_email_date: string | null;
}

export interface Cart {
  cart_id: number;
  prod_id: number;
  qty: number;
  price: number;
  reward_payment: number;
  status: PaymentStatus;
  tracking_number: string;
  credit_amount: number;
  reward_given: number;
  remaining_refund_amount: number;
  product: Product;
}

export interface PaymentStatus {
  pay_status_id: number;
  pay_status_label: string;
  pay_status: string;
  flag: number;
}

export interface Product {
  prod_id: number;
  cat_ids: string;
  comp_group_id: number;
  prod_name: string;
  prod_name_h2: string;
  prod_name_h3: string;
  prod_short_name: string;
  prod_seo_name: string;
  prod_model: string;
  prod_video_url: string;
  prod_purchase_price: number;
  prod_reseller_price: number;
  prod_retail_price: number;
  prod_sp_offer_price: number;
  prod_credit: number;
  prod_stock_qty: number;
  prod_gcerp_stock_qty: number;
  gcerp_daily_status: string;
  prod_alert_at_qty: number;
  prod_univ_comptability: number;
  prod_preorder: boolean;
  prod_preorder_text: string;
  prod_have_specs: boolean;
  prod_discount_flag: boolean;
  prod_ships_in: number;
  prod_mpn: string;
  prod_sku: string;
  prod_ppm_sku: string;
  prod_ean_type: string;
  prod_ean: string;
  prod_type: string;
  prod_node: number;
  prod_rating: number;
  prod_insurance_id: number;
  prod_supersaver: boolean;
  prod_best: boolean;
  prod_newarrival: boolean;
  prod_latest: boolean;
  prod_best_selling: boolean;
  prod_best_deal: boolean;
  prod_added_on: string;
  prod_bundle_ids: string;
  prod_upd_datetime: string;
  prod_status: boolean;
  is_canonical: boolean;
  is_comp_phone: boolean;
  is_excluded: boolean;
  prod_comment: string;
  canonical_tag: string;
  model_canonical_tag: string | null;
  banner_number: number | null;
  is_simply: boolean;
  vat_flag: boolean;
  box_size: number;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  prod_image: string;
  default_image: boolean;
}
