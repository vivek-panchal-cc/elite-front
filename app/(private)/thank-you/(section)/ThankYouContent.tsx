"use client";

import { useBasket } from "@/components/context/BasketContext";
import { noProduct, spinner } from "@/components/images";
import { IconLoader } from "@/components/images/icons";
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
  const { isLoading, clearCart, handleDownloadInvoice } = useBasket();
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

  return (
    <div className="max-w-7xl mx-auto w-full py-8 sm:py-16">
      <div className="items-center px-[30px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        <>
          <div className="hidden sm:block border border-[rgba(0,0,0,0.5)] rounded-xl sm:rounded-3xl p-4 sm:p-6">
            <h2 className="font-bold text-[20px] sm:text-[22px] text-[var(--color-blue)]">
              {checkoutLabels.orderUpdates}
            </h2>
            <p className="text-[12px] sm:text-[18px] text-[var(--color-black)] mt-1 leading-[18px]">
              {checkoutLabels.emailNot}
            </p>
          </div>
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="sm:space-y-4">
              <div className="border border-[rgba(0,0,0,0.5)] rounded-xl sm:rounded-3xl p-4 sm:p-6 leading-[18px]">
                <h2 className="font-bold text-[20px] sm:text-[22px] text-[var(--color-blue)]">
                  {checkoutLabels.orderDetails}
                </h2>

                <div className="mt-2">
                  <p className="text-[12px] sm:text-[12px] text-[var(--color-black)] leading-[18px] font-medium">
                    {checkoutLabels.orderNo}
                  </p>
                  <p className="text-[16px] sm:text-[18px] font-normal text-[var(--color-black)] leading-[18px]">
                    {ord_id}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-[12px] sm:text-[12px] text-[var(--color-black)] leading-[18px] font-medium">
                    {checkoutLabels.orderDate}
                  </p>
                  <p className="text-[16px] sm:text-[18px] font-normal text-[var(--color-black)] leading-[18px]">
                    {formatDate(ord_datetime)}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block border border-[rgba(0,0,0,0.5)] rounded-xl sm:rounded-3xl p-4 sm:p-6">
                <h2 className="font-bold text-[20px] sm:text-[22px] text-[var(--color-blue)]">
                  {checkoutLabels.info}
                </h2>
                <div className="mt-2">
                  <p className="text-[10px] sm:text-[12px] text-[var(--color-black)] leading-[18px] font-medium">
                    {checkoutLabels.checkOutInfo}
                  </p>
                  <p className="text-[12px] sm:text-[18px] text-[var(--color-black)] font-normal leading-[22px]">
                    {user_email}
                  </p>
                </div>
                <div className="flex flex-row gap-4 sm:gap-10 mt-3">
                  <div>
                    <h3 className="text-[10px] sm:text-[12px] text-[var(--color-black)] leading-[18px] font-medium">
                      {checkoutLabels.shippingAdd}
                    </h3>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_s_fname} {user_s_lname}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_s_address1}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_s_address2}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_s_city}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_s_county}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_s_post}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-[12px] text-[var(--color-black)] leading-[18px] font-medium">
                      {checkoutLabels.billingAdd}
                    </h3>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_fname} {user_lname}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_address1}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_address2}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_city}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_county}
                    </p>
                    <p className="text-[12px] sm:text-[18px] leading-[22px]">
                      {user_post}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[rgba(0,0,0,0.5)] rounded-xl sm:rounded-3xl flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 sm:pb-2">
                <h2 className="font-bold text-[20px] sm:text-[22px] text-[var(--color-blue)]">
                  {checkoutLabels.yourCart}
                </h2>
                <button
                  className={`flex justify-center items-center gap-2 text-[var(--color-white)] text-[12px] sm:text-[12px] font-semibold h-[28px] px-3 py-1 rounded-xl bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] leading-[21px] ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isLoading}
                  onClick={() =>
                    handleDownloadInvoice && handleDownloadInvoice(ord_id)
                  }
                >
                  {isLoading ? (
                    <>
                      <IconLoader className="h-4 w-4 animate-spin" />
                      {checkoutLabels.downloading}
                    </>
                  ) : (
                    <>
                      <Download className="h-3 w-3" />
                      {checkoutLabels.downloadInvoice}
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 custom-scrollbar overflow-x-auto max-h-70 p-4 pt-0 sm:p-0">
                <div className="flex flex-col gap-3 sm:hidden">
                  {carts.map((cart: any) => (
                    <div
                      key={cart.cart_id}
                      className="border border-[var(--color-red)] rounded-2xl p-3 flex items-center gap-3"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md border border-[var(--color-light-gray)] bg-[var(--color-light-gray)]">
                        <div className="overflow-hidden rounded-md h-full w-full">
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
                        <span className="absolute -top-2 -right-2 bg-[var(--color-red)] text-white text-[8px] font-bold rounded-full h-[22px] w-[22px] flex items-center justify-center shadow-md">
                          {cart.qty}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between flex-1">
                        <span className="font-semibold text-[var(--color-black)] text-[12px]">
                          {cart.product.prod_name}
                        </span>
                        <span className="font-normal text-[rgba(0,0,0,0.5)] text-[10px]">
                          {cart.product.prod_sku}
                        </span>
                        <span className="text-[var(--color-red)] font-bold text-[14px]">
                          <WrapAmount value={cart.price * cart.qty} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden sm:block custom-scrollbar overflow-x-auto max-h-66 px-4 sm:px-6 z-10">
                  <table className="w-full text-left text-[10px] sm:text-[12px] text-[var(--color-black)] border-collapse">
                    <thead className="bg-[var(--color-white)] sticky top-0 z-10 border-b-2 border-[var(--table-border)]">
                      <tr>
                        <th className="pb-2 bg-[var(--color-white)] sm:w-[400px] md:w-[500px] lg:w-[300px]">
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
                          <td className="py-4 flex items-center gap-6">
                            <div className="relative h-24 w-24 sm:h-24 sm:w-24 md:h-24 md:w-24 lg:h-16 lg:w-16 flex-shrink-0 rounded-md border border-[var(--color-light-gray)]">
                              <div className="overflow-hidden rounded-md h-full w-full">
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
                              <span className="absolute -top-2 -right-2 bg-[var(--color-red)] text-white text-[10px] font-bold rounded-full h-[22px] sm:w-[22px] flex items-center justify-center shadow-md">
                                {cart.qty}
                              </span>
                            </div>
                            <span
                              className="text-[var(--color-black)] font-medium md:text-[14px] lg:text-[16px] mr-6 block whitespace-normal break-words leading-tight"
                              title={cart.product.prod_name}
                            >
                              {cart.product.prod_name}
                            </span>
                          </td>
                          <td className="text-[rgba(0,0,0,0.5)] text-[14px] font-normal">
                            {cart.product.prod_sku}
                          </td>
                          <td className="text-[var(--color-red)] text-[14px] font-normal">
                            <WrapAmount value={cart.price * cart.qty} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t-1 text-[12px] border-[rgba(0,0,0,0.5)] sm:text-[14px] p-3 sm:p-2 px-6 sm:px-10 bg-[var(--color-light-gray)] rounded-b-3xl space-y-1">
                <div className="flex justify-between text-[14px] sm:text-[14px] text-[var(--color-gray)]">
                  <span>{checkoutLabels.subTotal}</span>
                  <span>
                    <WrapAmount value={sub_total} />
                  </span>
                </div>
                <div className="flex justify-between text-[14px] sm:text-[14px] text-[var(--color-gray)]">
                  <span>{checkoutLabels.vat}</span>
                  <span>
                    <WrapAmount value={vat_charges} />
                  </span>
                </div>
                <div className="flex justify-between text-[14px] sm:text-[14px] text-[var(--color-gray)]">
                  <span>{checkoutLabels.delivery}</span>
                  <span>
                    <WrapAmount value={tariff_value} />
                  </span>
                </div>
                <div className="flex justify-between text-[14px] sm:text-[14px] text-[var(--color-black)]">
                  <span>{checkoutLabels.discValue}</span>
                  <span>
                    - <WrapAmount value={discount_value} />
                  </span>
                </div>
                <div className="flex justify-between font-bold text-[var(--color-red)] text-[16px]">
                  <span>{checkoutLabels.total}</span>
                  <span>
                    <WrapAmount value={ord_total_amt} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="block sm:hidden mt-4 border border-[rgba(0,0,0,0.5)] rounded-xl sm:rounded-3xl p-4 sm:p-6">
            <h2 className="font-bold text-[20px] sm:text-[22px] text-[var(--color-blue)]">
              {checkoutLabels.info}
            </h2>
            <div className="mt-2">
              <p className="text-[12px] sm:text-[12px] font-medium text-[var(--color-black)] leading-[18px]">
                {checkoutLabels.checkOutInfo}
              </p>
              <p className="text-[16px] sm:text-[14px] font-medium text-[var(--color-black)] leading-[22px]">
                {user_email}
              </p>
            </div>
            <div className="flex flex-row gap-4 sm:gap-10 mt-3">
              <div>
                <h3 className="text-[12px] sm:text-[12px] text-[var(--color-black)] font-medium leading-[18px]">
                  {checkoutLabels.shippingAdd}
                </h3>
                <p className="text-[16px] sm:text-[14px]">
                  {user_s_fname} {user_s_lname}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_s_address1}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_s_address2}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_s_city}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_s_county}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_s_post}
                </p>
              </div>
              <div>
                <h3 className="text-[12px] sm:text-[12px] text-[var(--color-black)] font-medium leading-[18px]">
                  {checkoutLabels.billingAdd}
                </h3>
                <p className="text-[16px] sm:text-[14px]">
                  {user_fname} {user_lname}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_address1}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_address2}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_city}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_county}
                </p>
                <p className="text-[16px] sm:text-[14px] font-normal leading-[22px]">
                  {user_post}
                </p>
              </div>
            </div>
          </div>
          <div className="block sm:hidden mt-4 border border-[rgba(0,0,0,0.5)] rounded-xl sm:rounded-3xl p-4 sm:p-6">
            <h2 className="font-bold text-[20px] sm:text-[20px] text-[var(--color-blue)]">
              {checkoutLabels.orderUpdates}
            </h2>
            <p className="text-[16px] sm:text-[16px] text-[var(--color-black)] mt-1 leading-[18px]">
              {checkoutLabels.emailNot}
            </p>
          </div>
        </>
      </div>
    </div>
  );
}
