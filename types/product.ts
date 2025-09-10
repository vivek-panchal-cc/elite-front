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
  box_size: number | null;
  prod_stock: number;
  upload_prod_sku: string;
  prod_original_price: number;
  prod_image?: string | null;
  is_favorite?: number | null;
  basket_quantity: number | null;
  category: Category[];
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

export interface OrderHistory {
  o_ord_id: number;
  o_ord_datetime: string;
  o_userId: number;
  o_total: number;
  status: "processing" | "completed" | "cancelled" | string;
}

export interface ProductAddToBasketParams {
  prod_id: number;
  action: "add" | "product-remove" | "remove";
  flag?: "add" | "remove";
  quantity: number;
  only_free_prod?: number;
  prod_sku?: string;
}

export interface ProductRedeemAmount {
  amount: number;
}
