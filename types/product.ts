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
  box_size: number;
  prod_stock: number;
  upload_prod_sku: string;
  prod_original_price: number;
  prod_image?: string | null;
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
  cat_name: string;
  fixed_price: number;
  images_prod_image: string | null;
  is_favourite?: boolean;
  [key: string]: any;
}
