import { apiRequest } from "@/lib/apiRequest";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface ProductListParams {
  cat_type_id?: number;
  title?: string;
}

type UseProductListReturn = [boolean, Product, () => void];

const useProductList = ({
  cat_type_id,
  title = "",
}: ProductListParams): UseProductListReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<Product>({} as Product);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const retrieveProductList = async (cat_type_id: number, title: string) => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getProducts({
        cat_type_id,
        title,
      });

      if (!data.success) throw new Error(data.message);
      setProductList(data.data || {});
    } catch (error) {
      console.error(error);
      setProductList({} as Product);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cat_type_id == null && title.trim() === "") return;

    const timeOut = setTimeout(
      () => {
        if (typeof cat_type_id === "number") {
          retrieveProductList(cat_type_id, title.trim());
        }
      },
      title ? 1000 : 0
    );

    return () => clearTimeout(timeOut);
  }, [cat_type_id, title?.trim(), reloadFlag]);

  return [loading, productList, reload];
};

export default useProductList;
