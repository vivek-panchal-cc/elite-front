import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { Branch } from "@/types/branches";

const useBranchList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [branch, setBranch] = useState<Branch[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getBranches = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getBranches();
      if (!data.success) throw data.message;
      setBranch(data.data || []);
    } catch (error) {
      console.error("Error fetching branch:", error);
      setBranch([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBranches();
  }, [reloadFlag]);

  return [loading, branch, reload] as const;
};

export default useBranchList;
