import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { FavProduct } from "@/types/product";

const useFavouriteProductList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [favouriteProduct, setFavouriteProduct] = useState<FavProduct[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getFavouriteProduct = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getFavouriteProduct();
      if (!data.success) throw data.message;
      setFavouriteProduct(data.data || []);
    } catch (error) {
      console.error("Error fetching favouriteProduct:", error);
      setFavouriteProduct([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavouriteProduct();
  }, [reloadFlag]);

  return [loading, favouriteProduct, reload] as const;
};

export default useFavouriteProductList;
