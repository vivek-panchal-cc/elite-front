export interface Product {
  productList: any;
  prod_id: number;
  prod_long_name: string;
  prod_name: string;
  cat_type_id: number;
  cat_id: number;
  manuf_id: number;
  is_simply: number;
  vat_flag: number;
  prod_credit: number;
  prod_sku: string;
  prod_model: string;
  prod_purchase_price: number;
  prod_retail_price: number;
  prod_sp_offer_price: number;
  prod_stock_qty: number;
  network_id: number;
  tag: string;
  cat_name: string;
  box_size: number | null;
  prod_stock: number;
  upload_prod_sku: string;
  prod_original_price: number;
  prod_image?: string | null;
  is_favorite?: boolean | number | null;
  basket_quantity: number | null;
  gcerp_product_status: number;
  category: Category[];
  free_product_disc: FreeProductLabel[];
}

export interface FreeProductLabel {
  disc_display_name: string;
  tag: string;
}

export interface CategoryMini {
  cat_id: number;
  cat_name: string;
  is_product: number;
}

export interface Category {
  cat_id: number;
  cat_name: string;
  is_product?: number;
  productList?: Product[];
  icon?: string;
  product_count?: string;
  manufacture?: any[];
}

export interface CategoryResponse {
  category: Category[];
  is_product: number;
}

export interface SubCategory {
  cat_id: number;
  cat_name: string;
  productList: Product[];
  is_product?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FavProduct {
  prod_id: number;
  prod_name: string;
  prod_box_size: number | null;
  cat_name: string;
  fixed_price: number;
  images_prod_image: string | null;
  is_favourite?: boolean;
  basket_quantity: number | null;
  prod_sku: string;
  [key: string]: any;
}

export interface TopProduct {
  prod_id: number;
  prod_long_name: string;
  prod_name: string;
  prod_purchase_price: number;
  prod_retail_price: number;
  prod_sp_offer_price: number;
  prod_image: string;
  prod_original_price: number;
  total_sold: string;
}
export interface OfferResponse {
  image: string;
  title: string;
  url: string;
}

export interface TopCategory {
  cat_id: number;
  cat_name: string;
  cat_image: string;
  badge_name: string | null;
  badge_color: string | null;
  display_order: number;
  order_count: number;
  total_quantity: number;
}

// export interface OrderHistory {
//   o_ord_id: number;
//   o_ord_datetime: string;
//   o_userId: number;
//   o_total: number;
//   status: "processing" | "completed" | "cancelled" | string;
// }

export interface OrderHistory {
  ord_id: number;
  user: {
    user_id: number;
  };
  ord_total_amt: number;
  ord_datetime: string;
  paymentStatus: {
    pay_status_label: string;
  };
}

export interface ProductAddToBasketParams {
  basket_id?: number;
  prod_id?: number;
  action: "add" | "product-remove" | "remove";
  flag?: "add" | "remove" | "addFreeProduct";
  quantity?: number;
  only_free_prod?: number;
  prod_sku?: string;
  options?: {
    freeProdDiscId: number;
  };
}

export interface ProductRedeemAmount {
  amount: number;
}

export interface FreeProductImages {
  id: number;
  prod_image: string;
  default_image: boolean;
}

export interface FreeProductItems {
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
  prod_added_on: string; // ISO date string
  prod_bundle_ids: string;
  prod_upd_datetime: string; // ISO date string
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
  images: FreeProductImages;
  quantity: number;
  disc_id: number;
  free_prod_qty: number;
  prev_free_prod_qty: number;
}

export interface FreeProducts {
  free_prod_qty: number;
  min_cart_value: number;
  items: FreeProductItems[];
}
