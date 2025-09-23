"use client";

import { useBasket } from "@/components/context/BasketContext";
import { productOne, spinner, success } from "@/components/images";
import Download from "@/components/images/svgs/Download";
import { useLoader } from "@/components/providers/loader-provider";
import useCartItems from "@/hooks/useCartItems";
import { apiRequest } from "@/lib/apiRequest";
import { checkoutLabels } from "@/lib/labels";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ThankYouContent() {
  const router = useRouter();
  const { clearCart } = useBasket();
  const { reloadCart } = useCartItems();
  const { setIsLoading } = useLoader();
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("transactionReference");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

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
          getOrderDetails();
        }
      } catch (error: any) {
        router.replace("/cart");
      }
    };
    checkOrderStatus();
    interval = setInterval(checkOrderStatus, 1000);
    return () => clearInterval(interval);
  }, [referenceId]);

  const getOrderDetails = async () => {
    if (!referenceId) return;
    setIsLoading(true);
    try {
      const { data } = await apiRequest.getOrderDetails({
        transaction_reference: referenceId,
      });
      if (!data.success) throw data.message;
    } catch (error: any) {
      if (typeof error === "string") return toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full py-10">
      <div className="items-center px-[30px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        {!isOrderPlaced && (
          <div className="flex flex-col items-center text-center">
            <div className="mt-4 flex items-center gap-2 text-yellow-600 font-medium">
              <Image
                src={spinner}
                alt="Loading..."
                width={50}
                height={50}
                className="animate-spin"
              />
              <span>{checkoutLabels.confirming}</span>
            </div>
          </div>
        )}

        {isOrderPlaced && (
          <>
            <div className="border border-[rgba(0,0,0,0.3)] rounded-xl sm:rounded-3xl p-4 sm:p-6">
              <h2 className="font-semibold text-[var(--color-blue)]">
                {checkoutLabels.orderUpdates}
              </h2>
              <p className="text-[12px] sm:text-[14px] text-[var(--color-gray)] mt-1">
                {checkoutLabels.emailNot}
              </p>
            </div>
            <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-[rgba(0,0,0,0.3)] rounded-xl sm:rounded-3xl p-4 sm:p-6">
                  <h2 className="font-semibold text-[var(--color-blue)]">
                    {checkoutLabels.orderDetails}
                  </h2>

                  <div className="mt-2">
                    <p className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                      {checkoutLabels.orderNo}
                    </p>
                    <p className="text-[12px] sm:text-[14px] font-medium">
                      45632132151431
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                      {checkoutLabels.orderDate}
                    </p>
                    <p className="text-[12px] sm:text-[14px] font-medium">
                      22-09-2025
                    </p>
                  </div>
                </div>

                <div className="border border-[rgba(0,0,0,0.3)] rounded-xl sm:rounded-3xl p-4 sm:p-6">
                  <h2 className="font-semibold text-[var(--color-blue)]">
                    {checkoutLabels.info}
                  </h2>
                  <div className="mt-2">
                    <p className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                      {checkoutLabels.checkOutInfo}
                    </p>
                    <p className="text-[12px] sm:text-[14px] font-medium">
                      LoremIpsum@gmail.com
                    </p>
                  </div>
                  <div className="flex flex-row gap-4 sm:gap-10 mt-3">
                    <div>
                      <h3 className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                        {checkoutLabels.shippingAdd}
                      </h3>
                      <p className="text-[12px] sm:text-[14px]">Test Dev</p>
                      <p className="text-[12px] sm:text-[14px]">
                        F Gyllyng Flats
                      </p>
                      <p className="text-[12px] sm:text-[14px]">Falmouth</p>
                      <p className="text-[12px] sm:text-[14px]">Cornwall</p>
                      <p className="text-[12px] sm:text-[14px]">TR11 3EZ</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                        {checkoutLabels.billingAdd}
                      </h3>
                      <p className="text-[12px] sm:text-[14px]">Test Dev</p>
                      <p className="text-[12px] sm:text-[14px]">
                        F Gyllyng Flats
                      </p>
                      <p className="text-[12px] sm:text-[14px]">Falmouth</p>
                      <p className="text-[12px] sm:text-[14px]">Cornwall</p>
                      <p className="text-[12px] sm:text-[14px]">TR11 3EZ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Your Cart */}
              <div className="border border-[rgba(0,0,0,0.3)] rounded-xl sm:rounded-3xl flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-2 p-4 sm:p-6 sm:pb-2">
                  <h2 className="font-semibold text-[var(--color-blue)]">
                    {checkoutLabels.yourCart}
                  </h2>
                  <button className="flex justify-center items-center gap-2 bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] text-[12px] sm:text-[14px] px-3 py-1 rounded-xl cursor-pointer">
                    <Download className="h-3 w-3" />
                    {checkoutLabels.downloadInvoice}
                  </button>
                </div>

                {/* Products */}
                <div className="flex-1 custom-scrollbar overflow-x-auto max-h-70 p-4 sm:p-0">
                  {/* Mobile / tablet: stacked cards */}
                  <div className="flex flex-col gap-3 sm:hidden">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="border border-[var(--color-red)] rounded-2xl p-3 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-16 rounded-md border border-[var(--color-light-gray)] overflow-hidden">
                            <Image
                              src={productOne}
                              alt="Product"
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-[var(--color-black)] text-[12px]">
                              {/* Product Name */}Crystal Pro Stand Offer
                            </span>
                            <span className="text-[var(--color-gray)] text-[10px]">
                              {/* SKU */}8008006291318
                            </span>
                          </div>
                        </div>
                        <span className="text-[var(--color-red)] font-bold">
                          £66.00
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Desktop / large screens: table */}
                  <div className="hidden sm:block custom-scrollbar overflow-x-auto max-h-70 px-4 sm:px-6 z-10">
                    <table className="w-full text-left text-[10px] sm:text-[12px] text-[var(--color-black)] border-collapse">
                      <thead className="bg-[var(--color-white)] sticky top-0 z-10 border-b-2 border-[var(--table-border)]">
                        <tr>
                          <th className="pb-2 bg-[var(--color-white)]">
                            {checkoutLabels.prod}
                          </th>
                          <th className="pb-2 bg-[var(--color-white)]">
                            {checkoutLabels.sku}
                          </th>
                          <th className="pb-2 bg-[var(--color-white)]">
                            {checkoutLabels.price}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <tr key={item}>
                            <td className="py-2 flex items-center gap-2">
                              <div className="relative h-16 w-24 sm:h-32 sm:w-32 md:h-30 md:w-30 lg:h-16 lg:w-16 rounded-md border border-[var(--color-light-gray)] overflow-hidden">
                                <Image
                                  src={productOne}
                                  alt="Product"
                                  fill
                                  className="object-contain rounded p-1"
                                />
                              </div>
                              <span className="text-[var(--color-black)] font-semibold">
                                Crystal Pro Stand Offer
                              </span>
                            </td>
                            <td className="text-[var(--color-gray)]">
                              8008006291318
                            </td>
                            <td className="text-[var(--color-red)]">£66.00</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t-2 text-[12px] sm:text-[14px] p-3 sm:p-2 sm:px-10 bg-[var(--color-light-gray)] rounded-b-3xl space-y-2">
                  <div className="flex justify-between text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                    <span>{checkoutLabels.delivery}</span>
                    <span>£10</span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                    <span>{checkoutLabels.subTotal}</span>
                    <span>£132.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-[var(--color-red)]">
                    <span>{checkoutLabels.total}</span>
                    <span>£142.00</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
