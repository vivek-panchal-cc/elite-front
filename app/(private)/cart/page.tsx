"use client";

import PrivateLayout from "../PrivateLayout";
import Image from "next/image";
import { Button } from "@/components/ui/ButtonUI";
import { X } from "lucide-react";
import { productTwo } from "@/components/images";
import { altTextLabels, cartLabels } from "@/lib/labels";
import { ELITE_WALLET } from "@/lib/constants/all";
import Breadcrumb from "@/components/ui/Breadrumb";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { qty: 10 },
    { qty: 1 },
    { qty: 100 },
    { qty: 1 },
    { qty: 8 },
    { qty: 4 },
    { qty: 3 },
    { qty: 2 },
    { qty: 7 },
  ]);

  const handleQtyChange = (index: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, qty: Math.max(0, item.qty + change) } // prevent negative qty
          : item
      )
    );
  };
  return (
    <PrivateLayout>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold">
          <Breadcrumb />
          {/* {cartLabels.shoppingCart} */}
        </h2>
      </div>

      {/* Two-column layout for content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product Table - spans 2 columns */}
        <div className="lg:col-span-2 w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[700px]">
            {/* Table Header */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] items-center border-b pb-2 text-sm font-medium text-[var(--color-gray)] px-2">
              <span>{cartLabels.products}</span>
              <span className="text-center">{cartLabels.price}</span>
              <span className="text-center">{cartLabels.sku}</span>
              <span className="text-center">{cartLabels.quantity}</span>
              <span className="text-right">{cartLabels.subtotal}</span>
              <span className="ml-5 flex justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-[50px] px-4 py-2 text-sm lg:px-4 lg:py-2 lg:text-sm md:px-3 md:py-1.5 md:text-xs sm:px-2 sm:py-1 sm:text-[10px]"
                >
                  <X className="lg:w-4 lg:h-4 md:w-3.5 md:h-3.5 sm:w-3 sm:h-3" />
                  <span className="">{cartLabels.clearCart}</span>
                </Button>
              </span>
            </div>

            {/* Table Body */}
            <div className="max-h-[591px] overflow-y-auto custom-scrollbar">
              {cartItems.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] items-center border-b py-4 text-sm px-2"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={productTwo}
                      alt="Product"
                      width={25}
                      height={25}
                      className="rounded"
                    />
                    <span className="font-medium">
                      {cartLabels.juceBarRaspberryEdition}
                    </span>
                  </div>
                  <div className="text-center">
                    <WrapAmount value={6.6} />
                  </div>
                  <div className="text-center">8000806291318</div>
                  <div className="text-center flex items-center justify-center">
                    <button
                      onClick={() => handleQtyChange(i, -1)}
                      className="px-2 py-1 border rounded-tl-full rounded-bl-full cursor-pointer text-[var(--color-gray)]"
                    >
                      –
                    </button>
                    <input
                      type="number"
                      className="w-10 py-1 border-t border-b text-center"
                      value={item.qty}
                      readOnly
                    />
                    <button
                      onClick={() => handleQtyChange(i, 1)}
                      className="px-2 py-1 border rounded-tr-full rounded-br-full cursor-pointer text-[var(--color-gray)]"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right font-semibold">
                    <WrapAmount value={6.6 * item.qty} />
                  </div>
                  <div className="ml-5 flex justify-center">
                    <button className="text-[var(--color-red)] hover:text-red-700">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Wallet & Summary */}
        <div className="space-y-5">
          {/* Wallet */}
          <div className="border rounded-md p-4 shadow-sm pl-[30px] pr-[30px]">
            <h3 className="flex justify-center text-sm font-medium text-[var(--color-gray)] mb-2">
              {/* {cartLabels.eliteWallet} */}
              <Image
                src={ELITE_WALLET}
                alt={altTextLabels.eliteLogo}
                width={115}
                height={44}
                className="object-contain"
                priority
              />
            </h3>
            <p className="text-sm text-[var(--color-black)] mb-2 text-center">
              {cartLabels.amountLeftInEliteWallet}:{" "}
              <span className="text-[var(--color-red)] font-semibold">
                {" "}
                <WrapAmount value={6.6} />
                396.50
              </span>
            </p>
            <div className="text-[16px] font-bold mb-2 border rounded-[60px] p-1 text-center">
              <WrapAmount value={60} />
            </div>
            <Button className="w-full text-white rounded-[50px]">
              {cartLabels.redeemEliteWalletRewards}
            </Button>
          </div>

          {/* Order Summary */}
          <div className="border rounded-md p-4 shadow-sm space-y-3 pl-[30px] pr-[30px]">
            <h3 className="text-sm font-medium text-[var(--color-black)] mb-1 border-b p-2">
              {cartLabels.orderDetails}
            </h3>
            <div className="text-sm text-[#444444] p-2 pb-0">
              <div className="flex justify-between">
                <span>{cartLabels.totalUnits}</span>
                <span>120</span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.totalSKUs}</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.subtotal}</span>
                <span>
                  {" "}
                  <WrapAmount value={756} />
                </span>
              </div>
            </div>

            <h3 className="text-sm font-medium text-[var(--color-black)] mt-4 mb-1 border-b p-2">
              {cartLabels.cartSummary}
            </h3>
            <div className="text-sm text-[#444444] p-2 pb-0">
              <div className="flex justify-between">
                <span>{cartLabels.delivery}</span>
                <span>
                  {" "}
                  <WrapAmount value={10} />
                </span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.subtotal}</span>
                <span>
                  {" "}
                  <WrapAmount value={756} />
                </span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.vat}</span>
                <span>
                  {" "}
                  <WrapAmount value={4} />
                </span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.eliteRewards}</span>
                <span className="text-[var(--color-red)]">
                  - <WrapAmount value={60} />
                </span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold mt-4 p-2 pb-0 mb-0">
              <span>{cartLabels.total}</span>
              <span className="text-[var(--color-red)]">
                {" "}
                <WrapAmount value={710} />
              </span>
            </div>

            <div className="space-y-2 mt-0">
              <Button className="w-full bg-[var(--color-red)] hover:bg-[#c6143f] text-white rounded-[50px]">
                {cartLabels.proceedToPayment}
              </Button>
              <Button variant="outline" className="w-full rounded-[50px]">
                {cartLabels.continueShopping}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Cart;
