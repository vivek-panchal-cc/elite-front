import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { TopProduct } from "@/types/product";

const useTopProductsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [topProductList, setTopProductList] = useState<TopProduct[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getTopProducts = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.topProductsOfTheWeek();
      if (!data.success) throw data.message;
      setTopProductList(data.data || []);
    } catch (error) {
      setTopProductList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopProducts();
  }, [reloadFlag]);

  return [loading, topProductList, reload] as const;
};

export default useTopProductsList;
