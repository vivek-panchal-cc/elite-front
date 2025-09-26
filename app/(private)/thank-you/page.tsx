"use client";
import React, { useEffect, useState } from "react";
import ThankYouHeader from "./(section)/ThankYouHeader";
import ThankYouContent from "./(section)/ThankYouContent";
import Image from "next/image";
import { spinner } from "@/components/images";
import { checkoutLabels } from "@/lib/labels";
import { apiRequest } from "@/lib/apiRequest";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useLoader } from "@/components/providers/loader-provider";
import useCartItems from "@/hooks/useCartItems";
import { useBasket } from "@/components/context/BasketContext";

function ThankYou() {
  const router = useRouter();
  const { setIsLoading } = useLoader();
  const { clearCart } = useBasket();
  const { reloadCart } = useCartItems();
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("transactionReference");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [orderCollection, setOrderCollection] = useState<any>(null);

  useEffect(() => {
    if (!isOrderPlaced) return;
    (async () => {
      if (isOrderPlaced) {
        if (clearCart) await clearCart();
        if (reloadCart) await reloadCart();
      }
    })();
  }, [isOrderPlaced]);

  useEffect(() => {
    if (!referenceId) {
      router.replace("/cart");
      return;
    }

    let interval: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 40;

    const checkOrderStatus = async () => {
      try {
        const { data } = await apiRequest.checkOrderStatus({
          transaction_reference: referenceId,
        });

        if (data?.success && data?.data?.isOrderPlaced) {
          setIsOrderPlaced(true);
          clearInterval(interval);
          return;
        }

        retryCount++;
        if (retryCount >= maxRetries) {
          clearInterval(interval);
          router.replace("/try-again?transactionReference=" + referenceId);
        }
      } catch (error) {
        clearInterval(interval);
        router.replace("/try-again?transactionReference=" + referenceId);
      }
    };

    checkOrderStatus();
    interval = setInterval(checkOrderStatus, 1000);

    return () => clearInterval(interval);
  }, [referenceId, router]);

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!referenceId) return;
      setIsLoading(true);
      try {
        const { data } = await apiRequest.getOrderDetails({
          transaction_reference: referenceId,
        });
        if (!data.success) throw data.message;
        setOrderCollection(data.data);
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
        router.replace("/cart");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOrderPlaced && referenceId) {
      getOrderDetails();
    }
  }, [isOrderPlaced, referenceId]);

  if (!isOrderPlaced || !orderCollection) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Image
          src={spinner}
          alt="Loading..."
          width={100}
          height={100}
          className="animate-spin"
        />
        <p className="mt-4 text-yellow-600 font-medium">
          {checkoutLabels.confirming}
        </p>
      </div>
    );
  }
  return (
    <>
      <ThankYouHeader />
      <ThankYouContent orderCollection={orderCollection} />
    </>
  );
}

export default ThankYou;
