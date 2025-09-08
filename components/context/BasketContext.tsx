"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosResponse } from "axios";
import { apiRequest, ApiResponse } from "@/lib/apiRequest";
import { ProductAddToBasketParams } from "@/types/product";

interface BasketContextType {
  isLoading: boolean;
  addToBasketHandler: (
    params: ProductAddToBasketParams
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

  return (
    <BasketContext.Provider value={{ isLoading, addToBasketHandler }}>
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
