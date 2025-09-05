import React, { useState, useEffect } from "react";
import { apiRequest, OrderHistoryReqParams } from "@/lib/apiRequest";
import { OrderHistory } from "@/types/product";

const useOrderHistory = (params: OrderHistoryReqParams) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getOrderHistory = async () => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getOrderHistory(params);
      if (!data.success) throw data.message;
      setOrderHistory(data.data.result || []);
    } catch (error) {
      setOrderHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, [reloadFlag, JSON.stringify(params)]);

  return [loading, orderHistory, reload] as const;
};

export default useOrderHistory;
