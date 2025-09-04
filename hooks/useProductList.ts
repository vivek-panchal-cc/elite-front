import { apiRequest } from "@/lib/apiRequest";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface ProductListParams {
  cat_type_id?: number;
  title?: string;
}

type UseProductListReturn = [boolean, Product];

const useProductList = ({
  cat_type_id,
  title = "",
}: ProductListParams): UseProductListReturn => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<Product>({} as Product);

  useEffect(() => {
    setProductList({} as Product);

    if (cat_type_id == null && title.trim() === "") {
      return;
    }

    const handler = setTimeout(
      async () => {
        setLoading(true);
        try {
          const { data } = await apiRequest.getProducts({
            cat_type_id: cat_type_id ?? 0,
            title: title.trim(),
          });

          if (!data.success) throw new Error(data.message);
          setProductList(data.data || ({} as Product));
        } catch (error) {
          console.error(error);
          setProductList({} as Product);
        } finally {
          setLoading(false);
        }
      },
      title ? 500 : 0
    );

    return () => clearTimeout(handler);
  }, [cat_type_id, title]);

  return [loading, productList];
};

export default useProductList;
