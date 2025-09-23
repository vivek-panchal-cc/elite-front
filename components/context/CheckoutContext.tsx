"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import {
  CheckoutContextType,
  OrderSummary,
  PayWithExistingToken,
} from "@/types/payments";
import { useLoader } from "../providers/loader-provider";
import { apiRequest } from "@/lib/apiRequest";
import { toast } from "sonner";

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { setIsLoading } = useLoader();
  const [order, setOrder] = useState<OrderSummary | undefined>(undefined);

  const proceedToCheckout = (data: OrderSummary) => {
    if (!data) return null;
    setOrder(data);
  };

  const resetCheckout = () => {
    setOrder(undefined);
  };

  const cardAction = async (cardId: string, action: "default" | "delete") => {
    if (!cardId) return;
    setIsLoading(true);
    try {
      const apiMap = {
        default: apiRequest.setAsDefaultCard,
        delete: apiRequest.deleteCard,
      };
      const { data } = await apiMap[action](cardId);
      if (!data.success) throw data.message;
      toast.success(data.message);
    } catch (error: any) {
      if (typeof error === "string") return toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const payInstant = async (data: PayWithExistingToken) => {
    if (!data) return;
    setIsLoading(true);
    let payload = {
      token_id: data.token_id,
      grand_total: data.grand_total,
    };
    try {
      const { data } = await apiRequest.payWithExistingToken(payload);
      if (!data.success) throw data.message;
      toast.success(data.message);
    } catch (error: any) {
      if (typeof error === "string") return toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        proceedToCheckout,
        resetCheckout,
        order,
        setOrder,
        cardAction,
        payInstant,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context)
    throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
};
