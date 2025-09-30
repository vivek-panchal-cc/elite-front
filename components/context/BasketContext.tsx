"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosResponse } from "axios";
import { apiRequest, ApiResponse } from "@/lib/apiRequest";
import {
  Product,
  ProductAddToBasketParams,
  ProductRedeemAmount,
} from "@/types/product";
import { toast } from "sonner";
import Modal from "../ui/Modal";
import ProductDetailsModal from "../pages/ProductDetailsModal";

interface BasketContextType {
  isLoading: boolean;
  addToBasketHandler: (
    params: ProductAddToBasketParams
  ) => Promise<ApiResponse | null>;
  clearCart: () => Promise<ApiResponse | null>;
  updateRedeemAmountBasket: (
    params: ProductRedeemAmount
  ) => Promise<ApiResponse | null>;
  handleProductDetails: (details: any) => void;
  handleDownloadInvoice: (id: number) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<boolean>(false);
  const [details, setDetails] = useState<Product | null>(null);

  const addToBasketHandler = async (
    params: ProductAddToBasketParams
  ): Promise<ApiResponse | null> => {
    setIsLoading(true);
    try {
      const { data } = await apiRequest.addToBasket(params);
      if (!data.success && data.statusCode === 200) throw data.message;
      if (!data.success && data.statusCode === 201) return data;
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
      // toast.success(data.message);
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

  const handleProductDetails = async (details: any) => {
    setProductDetails(true);
    setDetails(details);
  };

  const clearBasketProvider = () => {
    setProductDetails(false);
    setDetails(null);
  };

  const handleDownloadInvoice = async (id: number) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const { data } = await apiRequest.downloadInvoice(id);
      if (!data.success) throw data.message;
      const { base64, fileName } = data.data;
      const extension = fileName?.split(".")?.[1] || "";
      const dtnow = new Date().toISOString();
      const linkSource = `data:application/${extension};base64,${base64}`;
      const downloadLink = document.createElement("a");
      const fileFullName = `${id}_${dtnow}.${extension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileFullName;
      downloadLink.click();
    } catch (error) {
      if (typeof error === "string") toast.error(error);
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
        handleProductDetails,
        handleDownloadInvoice,
      }}
    >
      {children}
      {details && (
        <Modal
          isOpen={productDetails}
          onClose={clearBasketProvider}
          classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
          isClose={false}
        >
          <ProductDetailsModal
            setModalClose={clearBasketProvider}
            details={details}
          />
        </Modal>
      )}
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
