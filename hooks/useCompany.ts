import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Company } from "@/types/company";

const useCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<Company[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getCompany = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getCompany();
      if (!data.success) throw data.message;
      setCompany(data.data || []);
    } catch (error) {
      setCompany([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompany();
  }, [reloadFlag]);

  return [loading, company, reload] as const;
};

export default useCompany;
