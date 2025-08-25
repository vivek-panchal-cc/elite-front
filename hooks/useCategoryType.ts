import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";

interface Category {
  cat_type_id: number;
  cat_type_name: string;
}

const useCategoryTypeList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategoryType = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getCategory();
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
    getCategoryType();
  }, []);

  return [loading, categories] as const;
};

export default useCategoryTypeList;
