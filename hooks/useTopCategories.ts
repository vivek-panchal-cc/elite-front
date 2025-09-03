import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { TopCategory } from "@/types/product";

const useTopCategories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [topCategory, setTopCategory] = useState<TopCategory[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getTopCategory = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getTopCategory();
      if (!data.success) throw data.message;
      setTopCategory(data.data || []);
    } catch (error) {
      setTopCategory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopCategory();
  }, [reloadFlag]);

  return [loading, topCategory, reload] as const;
};

export default useTopCategories;
