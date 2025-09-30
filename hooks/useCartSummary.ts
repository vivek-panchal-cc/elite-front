import React, { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { CartSummaryResponse } from "@/types/cart";
import { cartSummaryEvents } from "@/lib/events/cartSummaryEvents";

const useCartSummary = () => {
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [cartSummary, setCartSummary] = useState<CartSummaryResponse | null>(
    null
  );
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reloadCartSummary = () => {
    setReloadFlag((cs) => !cs);
  };

  const getCartSummary = async () => {
    setLoadingSummary(true);
    try {
      const { data } = await apiRequest.cartSummary();
      if (!data.success) throw data.message;
      setCartSummary(data.data || null);
      cartSummaryEvents.emit(data.data || null);
    } catch (error) {
      setCartSummary(null);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    getCartSummary();
  }, [reloadFlag]);

  return { loadingSummary, cartSummary, reloadCartSummary } as const;
};

export default useCartSummary;
