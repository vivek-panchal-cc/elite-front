"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/ButtonUI";
import { IconBack, IconLoader } from "@/components/images/icons";
import { Download } from "lucide-react";
import { checkoutLabels, profileLabels } from "@/lib/labels";
import useOrderHistoryDetail from "@/hooks/useOrderHistoryDetails";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { noProduct } from "@/components/images";
import DropdownDetail from "@/components/ui/DropdownDetail";
import LoaderOrderHistoryDetail from "@/components/loaders/LoaderOrderHistoryDetail";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

interface OrderHistoryDetailsProps {
  order_id: number;
  onBack: () => void;
  isMobile?: boolean;
  loadingId: number | null;
  handleInvoiceDownload: (order_id: number) => void;
}

const OrderHistoryDetails: React.FC<OrderHistoryDetailsProps> = ({
  order_id,
  onBack,
  isMobile,
  loadingId,
  handleInvoiceDownload,
}) => {
  const [loading, orderDetails, reload] = useOrderHistoryDetail(order_id);

  if (!order_id) return null;

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] ${
          isMobile ? "border-t-0 rounded-t-none rounded-b-xl" : "rounded-xl"
        } bg-[var(--color-light-gray)] shadow-sm`}
      >
        {loading ? (
          <div className="w-full p-4 py-8 sm:p-6">
            <LoaderOrderHistoryDetail />
          </div>
        ) : (
          <div className="w-full p-4 py-8 sm:p-6">
            {/* Header */}
            <div className="flex max-[425px]:flex-col flex-row sm:flex-row justify-between items-start sm:items-start gap-3 sm:gap-0 mb-0">
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={onBack}
                >
                  <IconBack className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                </button>
                <span className="text-[var(--color-blue)] text-[18px] sm:text-[25px] font-semibold">
                  {profileLabels.profileOrderHistory}
                </span>
              </div>

              <Button
                className={`h-[28px] flex justify-center items-center gap-2 text-[var(--color-white)] bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[12px] sm:text-[12px] leading-[30px] font-medium !px-3 sm:!px-5 py-1 rounded-xl ${
                  loadingId === order_id
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={loadingId === order_id}
                onClick={() => handleInvoiceDownload(order_id)}
              >
                {loadingId === order_id ? (
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
              </Button>
            </div>

            {/* Order Info */}
            <div className="text-[12px] font-medium leading-[18px] sm:leading-[38px] my-4 sm:my-0">
              {profileLabels.profileOrderHistoryLabel.orderHistoryDetails.order}{" "}
              <span className="underline">#{orderDetails?.ord_id}</span>{" "}
              {
                profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                  .placedOn
              }{" "}
              <span className="underline">
                {orderDetails && orderDetails.ord_datetime
                  ? new Date(orderDetails.ord_datetime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : ""}
              </span>{" "}
              {
                profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                  .currently
              }{" "}
              <span className="underline capitalize">
                {orderDetails?.status?.pay_status_label}.
              </span>
            </div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Left Side - Product List */}
              <div className="flex-1 rounded-[10px]">
                <div className="flex justify-between px-4 sm:px-6 text-[14px] font-bold leading-[38px] border-b-2 gap-4 border-[var(--table-border)] rounded-t-[10px] sticky">
                  <span className="w-[80%]">
                    {
                      profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                        .product
                    }
                  </span>
                  <span className="w-[20%] text-center">
                    {
                      profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                        .total
                    }
                  </span>
                </div>

                <div className="divide-y-2 divide-[var(--table-border)] overflow-y-auto max-h-[400px] custom-scrollbar sm:mb-3">
                  {orderDetails?.carts.map((item) => (
                    <div
                      key={item.cart_id}
                      className="flex justify-between items-center px-4 sm:px-6 py-4 gap-4"
                    >
                      <div className="flex items-center gap-4 w-[80%]">
                        <div className="relative border border-[var(--table-border)] rounded-md p-2 flex-shrink-0 h-10 w-10 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-12 lg:w-12 flex items-center justify-center">
                          <div className="overflow-hidden rounded-md h-full w-full">
                            <Image
                              src={
                                item.product.images[0]?.prod_image
                                  ? `${imageBaseUrl}/medium/${item.product.images[0].prod_image}`
                                  : noProduct
                              }
                              alt="Product"
                              fill
                              className="object-contain rounded p-1"
                            />
                          </div>
                          <span className="absolute -top-2 -right-2 bg-[var(--color-red)] text-white text-[10px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-md">
                            {item.qty}
                          </span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-[12px] font-medium leading-tight block break-words">
                            {item.product.prod_name}
                          </span>
                        </div>
                      </div>
                      <span className="text-[12px] font-medium leading-tight items-start w-[20%] text-center">
                        <WrapAmount value={item.price * item.qty} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Order Summary */}
              <div className="lg:w-[269px] bg-[var(--color-white)] border border-[var(--color-red)] rounded-2xl px-3 py-5 lg:py-6 h-fit">
                <p className="text-[var(--color-blue)] font-extrabold text-[12px] leading-tight mb-2 px-3">
                  {
                    profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                      .orderNo
                  }
                  <span className="text-[var(--color-blue)] font-medium">
                    {orderDetails?.ord_id}
                  </span>
                </p>
                <hr className="border-t border-[var(--table-border)] my-3" />

                <div className="text-[12px] font-medium leading-[24px] mb-3 px-3">
                  <p>
                    <span className="font-bold">
                      {
                        profileLabels.profileOrderHistoryLabel
                          .orderHistoryDetails.orderDate
                      }
                    </span>{" "}
                    {orderDetails && orderDetails.ord_datetime
                      ? new Date(orderDetails.ord_datetime).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </p>
                  <p>
                    <span className="font-bold">
                      {
                        profileLabels.profileOrderHistoryLabel
                          .orderHistoryDetails.orderEmail
                      }
                    </span>{" "}
                    {orderDetails?.user.user_email}
                  </p>
                  <p>
                    <span className="font-bold">
                      {
                        profileLabels.profileOrderHistoryLabel
                          .orderHistoryDetails.orderShipping
                      }
                    </span>{" "}
                    3-5 Days
                  </p>
                  <p>
                    <span className="font-bold">
                      {
                        profileLabels.profileOrderHistoryLabel
                          .orderHistoryDetails.orderPayMethod
                      }
                    </span>{" "}
                    Credit/Debit Card
                  </p>
                </div>

                <hr className="border-t border-[var(--table-border)] my-3" />

                <div className="text-[12px] font-medium leading-[18px] mb-2 px-3">
                  <p className="flex justify-between sm:pr-8">
                    <span className="font-bold">
                      {
                        profileLabels.profileOrderHistoryLabel
                          .orderHistoryDetails.orderSubTotal
                      }
                    </span>{" "}
                    <WrapAmount value={Number(orderDetails?.sub_total)} />
                  </p>
                  <p className="flex justify-between sm:pr-8">
                    <span className="font-bold">
                      {
                        profileLabels.profileOrderHistoryLabel
                          .orderHistoryDetails.orderDelivery
                      }
                    </span>{" "}
                    <WrapAmount value={Number(orderDetails?.tariff_value)} />
                  </p>
                  {orderDetails?.discount_value && (
                    <p className="flex justify-between sm:pr-8">
                      <span className="font-bold">
                        {
                          profileLabels.profileOrderHistoryLabel
                            .orderHistoryDetails.orderDiscount
                        }
                      </span>{" "}
                      <WrapAmount
                        value={Number(-orderDetails?.discount_value)}
                      />
                    </p>
                  )}
                </div>

                <hr className="border-t border-[var(--table-border)] my-3" />

                <p className="flex justify-between sm:pr-10 text-[16px] font-bold text-[var(--color-red)] leading-[18px] px-3">
                  {
                    profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                      .orderTotal
                  }
                  <span className="ml-2">
                    <WrapAmount value={Number(orderDetails?.ord_total_amt)} />
                  </span>
                </p>
                <div className="max-[768px]:block hidden">
                  <DropdownDetail
                    label={
                      profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                        .billingAddress
                    }
                    options={[
                      {
                        content: (
                          <p className="text-[12px] font-medium text-[var(--color-black)] leading-[18px]">
                            {orderDetails?.user.user_fname}{" "}
                            {orderDetails?.user.user_lname}
                            <br />
                            {orderDetails?.user.user_address1}
                            <br />
                            {orderDetails?.user.user_address2}
                            <br />
                            {orderDetails?.user.user_city}
                            <br />
                            {orderDetails?.user.user_county}
                            <br />
                            {orderDetails?.user.user_post}
                          </p>
                        ),
                        selectable: false,
                      },
                    ]}
                    onSelect={() => {}}
                    classBtnLabel="text-[12px] font-semibold leading-[18px]"
                    classDropdown="mt-3"
                  />
                  <DropdownDetail
                    label={
                      profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                        .shippingAddress
                    }
                    options={[
                      {
                        content: (
                          <p className="text-[12px] font-medium text-[var(--color-black)]">
                            {orderDetails?.user.user_s_fname}{" "}
                            {orderDetails?.user.user_s_lname}
                            <br />
                            {orderDetails?.user.user_s_address1}
                            <br />
                            {orderDetails?.user.user_s_address2}
                            <br />
                            {orderDetails?.user.user_s_city}
                            <br />
                            {orderDetails?.user.user_s_county}
                            <br />
                            {orderDetails?.user.user_s_post}
                          </p>
                        ),
                        selectable: false,
                      },
                    ]}
                    onSelect={() => {}}
                    classBtnLabel="text-[12px] font-semibold leading-[18px]"
                    classDropdown="mt-3"
                  />
                </div>
              </div>
            </div>
            {/* Address Section */}
            <div className="max-[768px]:hidden flex flex-col sm:flex-row justify-start gap-6 px-4 sm:px-6 py-4">
              <div>
                <p className="text-[var(--color-blue)] font-bold text-[16px] mb-1">
                  {
                    profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                      .billingAddress
                  }
                </p>
                <p className="text-[12px] font-medium text-[var(--color-black)]">
                  {orderDetails?.user.user_fname}{" "}
                  {orderDetails?.user.user_lname}
                  <br />
                  {orderDetails?.user.user_address1}
                  <br />
                  {orderDetails?.user.user_address2}
                  <br />
                  {orderDetails?.user.user_city}
                  <br />
                  {orderDetails?.user.user_county}
                  <br />
                  {orderDetails?.user.user_post}
                </p>
              </div>

              <div>
                <p className="text-[var(--color-blue)] font-bold text-[16px] mb-1">
                  {
                    profileLabels.profileOrderHistoryLabel.orderHistoryDetails
                      .shippingAddress
                  }
                </p>
                <p className="text-[12px] font-medium text-[var(--color-black)]">
                  {orderDetails?.user.user_s_fname}{" "}
                  {orderDetails?.user.user_s_lname}
                  <br />
                  {orderDetails?.user.user_s_address1}
                  <br />
                  {orderDetails?.user.user_s_address2}
                  <br />
                  {orderDetails?.user.user_s_city}
                  <br />
                  {orderDetails?.user.user_s_county}
                  <br />
                  {orderDetails?.user.user_s_post}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryDetails;
