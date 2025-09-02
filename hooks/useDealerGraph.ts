import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { ChartApiResponse } from "@/types/chart";

const useDealerGraph = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dealerGraphData, setDealerGraphData] =
    useState<ChartApiResponse | null>(null);

  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getDealerGraphData = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getDealerGraph();
      if (!data.success) throw data.message;
      setDealerGraphData(data);
    } catch (error) {
      setDealerGraphData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDealerGraphData();
  }, [reloadFlag]);

  return [loading, dealerGraphData, reload] as const;
};

export default useDealerGraph;
