import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";

export interface TCategory {
  cat_type_id: number;
  cat_type_name: string;
  icon?: string;
  product_count: string;
}

const useCategoryTypeList = ({ title = "" }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<TCategory[]>([]);

  const getCategoryType = async (title: string) => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getCategory({ title });
      if (!data.success) throw data.message;
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title === "") {
      getCategoryType(title);
      return;
    }
    const timeOut = setTimeout(() => {
      getCategoryType(title);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [title?.trim()]);

  return [loading, categories] as const;
};

export default useCategoryTypeList;
