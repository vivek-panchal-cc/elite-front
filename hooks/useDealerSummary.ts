import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { DealerInfo } from "@/types/dealerSummary";

const useDealerSummary = (dealer_id: number = 0) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dealerSummary, setDealerSummary] = useState<DealerInfo | null>(null);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getRewards = async (dealer_id: number) => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getDealerSummary(dealer_id);
      if (!data.success) throw data.message;
      setDealerSummary(data.data || []);
    } catch (error) {
      setDealerSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRewards(dealer_id);
  }, [reloadFlag]);

  return [loading, dealerSummary, reload] as const;
};

export default useDealerSummary;
