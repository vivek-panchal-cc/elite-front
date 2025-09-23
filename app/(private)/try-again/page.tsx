"use client";

import { apiRequest } from "@/lib/apiRequest";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TryAgain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("transactionReference");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    if (!referenceId) router.replace("/cart");
  }, [referenceId, router]);

  useEffect(() => {
    if (!referenceId) return;
    let interval: NodeJS.Timeout;

    const checkOrderStatus = async () => {
      try {
        const { data } = await apiRequest.checkOrderStatus({
          transaction_reference: referenceId,
        });
        if (data?.success && data?.data?.isOrderPlaced) {
          setIsOrderPlaced(true);
          clearInterval(interval);
        }
      } catch (error: any) {
        // router.replace("/cart");
      }
    };
    checkOrderStatus();
    interval = setInterval(checkOrderStatus, 1000);
    return () => clearInterval(interval);
  }, [referenceId]);

  if (!referenceId) return null;

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-6 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center  p-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-green)]">
          Thank You! 🎉
        </h1>
        <p className="mt-4 text-[var(--color-gray)]">
          Your payment was successful.
        </p>

        <p className="mt-2 text-sm sm:text-base text-[var(--color-gray)]">
          Transaction Reference:{" "}
          <span className="font-mono text-[var(--color-blue)]">
            {referenceId}
          </span>
        </p>

        {!isOrderPlaced ? (
          <p className="mt-4 text-yellow-600 font-medium">
            ⏳ Confirming your order...
          </p>
        ) : (
          <p className="mt-4 text-[var(--color-green)] font-medium">
            ✅ Your order has been placed successfully!
          </p>
        )}
      </div>
    </div>
  );
}
