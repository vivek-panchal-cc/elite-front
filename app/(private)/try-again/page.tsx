"use client";

import IconTryAgain from "@/components/images/svgs/TryAgain";
import { checkoutLabels } from "@/lib/labels";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TryAgain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("transactionReference");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!referenceId && !orderId) {
      router.replace("/cart");
    }
  }, [referenceId, orderId, router]);

  if (!referenceId && !orderId) return null;

  return (
    <div className="max-w-7xl mx-auto w-full p-12 sm:p-48 flex items-center justify-center">
      <div className="flex flex-row sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
        {/* Icon */}
        <div className="flex-shrink-0 text-[var(--color-red)]">
          <IconTryAgain className="w-[66px] h-[60px] sm:w-[107px] sm:h-[99px]"/>
        </div>

        {/* Text Section */}
        <div>
          <h1 className="text-left text-[16px] sm:text-[38px] font-bold text-[var(--color-red)] leading-[100%]">
            {checkoutLabels.tryAgain}
          </h1>
          <p
            className="text-left text-[12px] sm:text-[22px] font-semibold sm:font-bold text-[var(--color-blue)] leading-[100%] mt-1 tracking-[-1%] sm:tracking-[0%]"
            dangerouslySetInnerHTML={{ __html: checkoutLabels.tryAgainMsg }}
          ></p>
        </div>
      </div>
    </div>
  );
}
