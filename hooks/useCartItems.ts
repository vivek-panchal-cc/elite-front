import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { CartData } from "@/types/cart";
import { cartEvents } from "@/lib/events/cartEvents";

const useCartItems = () => {
  const [loadingCart, setLoadingCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartData | null>(null);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reloadCart = () => {
    setReloadFlag((cs) => !cs);
  };

  const getCartItems = async () => {
    setLoadingCart(true);
    try {
      const { data } = await apiRequest.cartItems();
      if (!data.success) throw data.message;
      setCartItems(data.data || null);
      cartEvents.emit(data.data || null);
    } catch (error) {
      setCartItems(null);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [reloadFlag]);

  return { loadingCart, cartItems, reloadCart };
};

export default useCartItems;
