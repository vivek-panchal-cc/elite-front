"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosResponse } from "axios";
import { apiRequest, ApiResponse } from "@/lib/apiRequest";
import { ProductAddToBasketParams, ProductRedeemAmount } from "@/types/product";
import { toast } from "sonner";

interface BasketContextType {
  isLoading: boolean;
  addToBasketHandler: (
    params: ProductAddToBasketParams
  ) => Promise<ApiResponse | null>;
  clearCart: () => Promise<ApiResponse | null>;
  updateRedeemAmountBasket: (
    params: ProductRedeemAmount
  ) => Promise<ApiResponse | null>;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const addToBasketHandler = async (
    params: ProductAddToBasketParams
  ): Promise<ApiResponse | null> => {
    setIsLoading(true);
    try {
      const { data } = await apiRequest.addToBasket(params);
      if (!data.success) throw data.message;
      return data;
    } catch (error) {
      console.error("Basket API error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async (): Promise<ApiResponse | null> => {
    setIsLoading(true);
    try {
      const { data } = await apiRequest.clearCart();
      if (!data.success) throw data.message;
      toast.success(data.message);
      return data;
    } catch (error: any) {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        console.error(error);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRedeemAmountBasket = async (
    params: ProductRedeemAmount
  ): Promise<ApiResponse | null> => {
    setIsLoading(true);
    try {
      const { data } = await apiRequest.updateRedeemAmount(params);
      if (!data.success) throw data.message;
      toast.success(data.message);
      return data;
    } catch (error: any) {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        console.error(error);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasketContext.Provider
      value={{
        isLoading,
        addToBasketHandler,
        clearCart,
        updateRedeemAmountBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used inside a BasketProvider");
  }
  return context;
};
