export interface BasketItem {
  basket_additional_discount_code: string;
  basket_additional_discount_value: number;
  basket_additional_preorder: number;
  basket_additional_ship_comp_id: number;
  basket_additional_ship_tariff_value: number;
  basket_addon_id: string;
  basket_cat_type_group_id: number | null;
  basket_cc_payment: number;
  basket_credit_price: number;
  basket_discount_price: number;
  basket_dom_id: number;
  basket_gift_prod_id: number;
  basket_id: number;
  basket_insurance_id: number;
  basket_insurance_price: number;
  basket_is_free_product: number;
  basket_is_simply: number;
  basket_offer_id: number;
  basket_offer_price: number;
  basket_paypal_payment: number;
  basket_price: number;
  basket_prod_image: string;
  basket_prod_name: string;
  basket_prod_sku: string;
  basket_product_vat: number;
  basket_quantity: number;
  basket_reward_payment: number;
  basket_session_id: string;
  basket_unique_prod_disc_id: string;
  basket_user_id: number;
  box_size: number | null;
  cat_type_id: number;
  category_type_group_cat_type_group_id: number;
  category_type_group_delivery_charge: number;
  category_type_group_no_charge_threshold: number;
  category_type_group_sequence: number;

  category_types_cat_type_id: number;
  category_types_cat_type_name: string;

  ins_float_rate1: number | null;
  ins_name: string | null;
  ins_total: string | number; // your sample shows "" sometimes, number other times
  is_out_of_stock: boolean;
  insurance_ins_float_rate1: number | null;
  insurance_ins_float_rate2: number | null;
  insurance_ins_float_rate3: number | null;

  is_simply: number;

  price: number;
  prod_credit_total: number;
  prod_sku: string;

  product_box_size: number;
  product_is_simply: number;
  product_prod_credit: number;
  product_prod_id: number;
  product_prod_insurance_id: number;
  product_prod_sku: string;
  product_prod_stock_qty: number;
  product_vat_flag: number;
  prod_stock_quantity: number;
  quantity: number;
  total: number;
}

export interface CartSummary {
  vat: number;
  redeem_amount: number;
  discount_value: number;
  sub_total: number;
  offer_discount: number;
  grand_total: number;
  preorder: number;
  units: number;
  sku_count: number;
  delivery_charge: number;
}

export interface CartMeta {
  ins_total: number;
  prod_credit: number;
  ship_price: number;
  shipping_method: number;
  discount_value: number;
  is_simply_flag: number;
}

export interface CartData {
  items: BasketItem[];
  summary: CartSummary;
  meta: CartMeta;
}

export interface CartSummaryResponse {
  sub_total: number | string;
  quantity: number | string;
  units: number | string;
}
