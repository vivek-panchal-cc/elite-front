"use client";

import { checkoutLabels } from "@/lib/labels";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TryAgain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("transactionReference");
  const orderId = searchParams.get("orderId");
  console.log('orderId: ', orderId);

  useEffect(() => {
    if (!referenceId && !orderId) {
      router.replace("/cart");
    }
  }, [referenceId, orderId, router]);

  if (!referenceId && !orderId) return null;

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-6 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center  p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-red)]">
          {checkoutLabels.tryAgainMsg}
        </h1>
      </div>
    </div>
  );
}
