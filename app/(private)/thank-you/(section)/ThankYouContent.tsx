"use client";

import { useBasket } from "@/components/context/BasketContext";
import { noProduct, spinner } from "@/components/images";
import Download from "@/components/images/svgs/Download";
import { useLoader } from "@/components/providers/loader-provider";
import WrapAmount from "@/components/wrapper/WrapAmount";
import useCartItems from "@/hooks/useCartItems";
import { apiRequest } from "@/lib/apiRequest";
import { formatDate } from "@/lib/constants/all";
import { checkoutLabels } from "@/lib/labels";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export default function ThankYouContent({
  orderCollection,
}: {
  orderCollection: any;
}) {
  const router = useRouter();
  const { clearCart } = useBasket();
  const { reloadCart } = useCartItems();
  const { setIsLoading } = useLoader();
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("transactionReference");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  // const [orderCollection, setOrderCollection] = useState<any>(null);
  const {
    ord_id,
    ord_datetime,
    user,
    carts = [],
    tariff_value,
    sub_total,
    discount_value,
    ord_total_amt,
    vat_charges,
  } = orderCollection || {};

  const {
    user_email,
    user_fname,
    user_lname,
    user_address1,
    user_address2,
    user_city,
    user_county,
    user_post,
    user_s_fname,
    user_s_lname,
    user_s_address1,
    user_s_address2,
    user_s_city,
    user_s_county,
    user_s_post,
  } = user || {};

  // useEffect(() => {
  //   if (!isOrderPlaced) return;
  //   (async () => {
  //     if (isOrderPlaced) {
  //       if (clearCart) await clearCart();
  //       if (reloadCart) await reloadCart();
  //     }
  //   })();
  // }, [isOrderPlaced]);

  // useEffect(() => {
  //   if (!referenceId) router.replace("/cart");
  // }, [referenceId, router]);

  // useEffect(() => {
  //   if (!referenceId) return;
  //   let interval: NodeJS.Timeout;
  //   let retryCount = 0;
  //   const maxRetries = 10;

  //   const checkOrderStatus = async () => {
  //     try {
  //       const { data } = await apiRequest.checkOrderStatus({
  //         transaction_reference: referenceId,
  //       });
  //       if (data?.success && data?.data?.isOrderPlaced) {
  //         setIsOrderPlaced(true);
  //         clearInterval(interval);
  //         getOrderDetails();
  //       }
  //       retryCount++;
  //       if (retryCount >= maxRetries) {
  //         clearInterval(interval);
  //         router.replace("/cart");
  //       }
  //     } catch (error: any) {
  //       router.replace("/cart");
  //     }
  //   };
  //   checkOrderStatus();
  //   interval = setInterval(checkOrderStatus, 1000);
  //   return () => clearInterval(interval);
  // }, [referenceId]);

  // const getOrderDetails = async () => {
  //   if (!referenceId) return;
  //   setIsLoading(true);
  //   try {
  //     const { data } = await apiRequest.getOrderDetails({
  //       transaction_reference: referenceId,
  //     });
  //     if (!data.success) throw data.message;
  //     setOrderCollection(data.data);
  //   } catch (error: any) {
  //     if (typeof error === "string") return toast.error(error);
  //     router.replace("/cart");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
                      {ord_id}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                      {checkoutLabels.orderDate}
                    </p>
                    <p className="text-[12px] sm:text-[14px] font-medium">
                      {formatDate(ord_datetime)}
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
                      {user_email}
                    </p>
                  </div>
                  <div className="flex flex-row gap-4 sm:gap-10 mt-3">
                    <div>
                      <h3 className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                        {checkoutLabels.shippingAdd}
                      </h3>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_s_fname} {user_s_lname}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_s_address1}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_s_address2}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_s_city}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_s_county}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_s_post}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                        {checkoutLabels.billingAdd}
                      </h3>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_fname} {user_lname}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_address1}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_address2}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">{user_city}</p>
                      <p className="text-[12px] sm:text-[14px]">
                        {user_county}
                      </p>
                      <p className="text-[12px] sm:text-[14px]">{user_post}</p>
                    </div>
                  </div>
                </div>
              </div>

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

                <div className="flex-1 custom-scrollbar overflow-x-auto max-h-70 p-4 sm:p-0">
                  <div className="flex flex-col gap-3 sm:hidden">
                    {carts.map((cart: any) => (
                      <div
                        key={cart.cart_id}
                        className="border border-[var(--color-red)] rounded-2xl p-3 flex items-center gap-3"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md border border-[var(--color-light-gray)] bg-[var(--color-light-gray)] overflow-hidden">
                          <Image
                            src={
                              cart.product.images[0]?.prod_image
                                ? `${imageBaseUrl}/medium/${cart.product.images[0].prod_image}`
                                : noProduct
                            }
                            alt="Product"
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex flex-col justify-between flex-1">
                          <span className="font-semibold text-[var(--color-black)] text-[12px]">
                            {cart.product.prod_name}
                          </span>
                          <span className="text-[var(--color-red)] font-bold text-[12px]">
                            <WrapAmount value={cart.price} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

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
                        {carts.map((cart: any) => (
                          <tr key={cart.cart_id}>
                            <td className="py-2 flex items-center gap-2">
                              <div className="relative h-16 w-24 sm:h-32 sm:w-32 md:h-30 md:w-30 lg:h-16 lg:w-16 rounded-md border border-[var(--color-light-gray)] overflow-hidden">
                                <Image
                                  src={
                                    cart.product.images[0]?.prod_image
                                      ? `${imageBaseUrl}/medium/${cart.product.images[0].prod_image}`
                                      : noProduct
                                  }
                                  alt="Product"
                                  fill
                                  className="object-contain rounded p-1"
                                />
                              </div>
                              <span className="text-[var(--color-black)] font-semibold mr-2">
                                {cart.product.prod_name}
                              </span>
                            </td>
                            <td className="text-[var(--color-gray)]">
                              {cart.product.prod_sku}
                            </td>
                            <td className="text-[var(--color-red)]">
                              <WrapAmount value={cart.price} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t-2 text-[12px] sm:text-[14px] p-3 sm:p-2 sm:px-10 bg-[var(--color-light-gray)] rounded-b-3xl space-y-1">
                  <div className="flex justify-between text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                    <span>{checkoutLabels.subTotal}</span>
                    <span>
                      <WrapAmount value={sub_total} />
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                    <span>{checkoutLabels.vat}</span>
                    <span>
                      <WrapAmount value={vat_charges} />
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-[12px] text-[var(--color-gray)]">
                    <span>{checkoutLabels.delivery}</span>
                    <span>
                      <WrapAmount value={tariff_value} />
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-[12px] text-[var(--color-black)]">
                    <span>{checkoutLabels.discValue}</span>
                    <span>
                      - <WrapAmount value={discount_value} />
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[var(--color-red)]">
                    <span>{checkoutLabels.total}</span>
                    <span>
                      <WrapAmount value={ord_total_amt} />
                    </span>
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
