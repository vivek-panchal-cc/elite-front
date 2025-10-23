import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { OrderDetail } from "@/types/orderDetails";

const useOrderHistoryDetail = (order_id: number = 0) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reload = () => {
    setReloadFlag((cs) => !cs);
  };

  const getOrderHistoryDetail = async (order_id: number) => {
    setLoading(true);
    try {
      const { data } = await apiRequest.getOrderHistoryDetail(order_id);
      if (!data.success) throw data.message;
      setOrderDetails(data.data || []);
    } catch (error) {
      setOrderDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderHistoryDetail(order_id);
  }, [reloadFlag]);

  return [loading, orderDetails, reload] as const;
};

export default useOrderHistoryDetail;
