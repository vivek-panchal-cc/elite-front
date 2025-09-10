"use client";

import PrivateLayout from "../PrivateLayout";
import Image from "next/image";
import { Button } from "@/components/ui/ButtonUI";
import { X } from "lucide-react";
import { noProduct } from "@/components/images";
import { altTextLabels, cartLabels, commonLabels } from "@/lib/labels";
import { CURRENCY_SYMBOL, ELITE_WALLET } from "@/lib/constants/all";
import Breadcrumb from "@/components/ui/Breadrumb";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoaderDiv from "@/components/loaders/LoaderDiv";
import { useBasket } from "@/components/context/BasketContext";
import useCartItems from "@/hooks/useCartItems";
import { CartMeta, CartSummary } from "@/types/cart";
import LoaderItems from "@/components/loaders/LoaderItems";
import {
  useAuthStore,
  useAuthStoreWithAutoRefresh,
} from "@/stores/AuthStoreDealer";
import { Input } from "@/components/ui/Input";
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

const Cart = () => {
  const router = useRouter();
  const { dealer } = useAuthStoreWithAutoRefresh();
  const { clearCart, updateRedeemAmountBasket } = useBasket();
  const { loadingCart, cartItems, reloadCart } = useCartItems();
  const { items, meta, summary } = cartItems ?? {
    items: [],
    meta: {} as CartMeta,
    summary: {} as CartSummary,
  };
  const [balance, setBalance] = useState<number>(
    dealer?.current_amount_bal ?? 0
  );
  const [amount, setAmount] = useState<number>(dealer?.current_amount_bal ?? 0);

  const [cartItemsData, setCartItems] = useState([
    { qty: 10, name: "Jucce Bar Raspberry Edition" },
    { qty: 1, name: "Jucce Bar" },
    { qty: 100, name: "Raspberry Edition" },
    { qty: 1, name: "Jucce Edition" },
    { qty: 8, name: "Jucce Bar Raspberry" },
    { qty: 4, name: "Jucce" },
    { qty: 3, name: "Bar" },
    { qty: 2, name: "Edition" },
    { qty: 7, name: "Raspberry" },
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

  const handleClearCart = async () => {
    await clearCart();
    if (reloadCart) await reloadCart();
  };

  // const handleReedemBasket = async (value: number) => {
  //   const result = await updateRedeemAmountBasket({ amount: value });
  //   if (result) {
  //     const authStore = useAuthStore.getState();
  //     const dealer = authStore.dealer;
  //     const user = authStore.user;
  //     const token = authStore.token;

  //     if (dealer && user && token) {
  //       const updatedDealer = {
  //         ...dealer,
  //         current_amount_bal: dealer.current_amount_bal - value,
  //       };
  //       useAuthStore.getState().setAuthData({
  //         dealer: updatedDealer,
  //         user,
  //         token,
  //       });
  //     }
  //   }
  //   if (reloadCart) await reloadCart();
  // };

  const handleReedemBasket = async (value: number) => {
    await updateRedeemAmountBasket({ amount: value });
    if (reloadCart) await reloadCart();
    setBalance((prev) => prev - value);
    setAmount(0);
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
          <div className="md:min-w-[700px]">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] items-center border-b pb-2 text-sm font-medium text-[var(--color-gray)] px-2">
              <span>{cartLabels.products}</span>
              <span className="text-center">{cartLabels.price}</span>
              <span className="text-left">{cartLabels.sku}</span>
              <span className="text-center">{cartLabels.quantity}</span>
              <span className="text-right">{cartLabels.subtotal}</span>
              {items.length > 0 && (
                <span className="flex justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-[50px] h-7 w-20 hover:bg-red-700 flex items-center justify-center gap-1"
                    onClick={handleClearCart}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{cartLabels.clearCart}</span>
                  </Button>
                </span>
              )}
            </div>

            {/* Table Body */}
            <div className="max-h-[611px] overflow-y-auto custom-scrollbar">
              {loadingCart ? (
                [...Array(4)].map((_, idx) => (
                  <div key={idx} className="rounded-[10px] p-2">
                    <LoaderItems />
                  </div>
                ))
              ) : items && items.length > 0 ? (
                items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 border-b py-4 text-sm px-2 md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] md:items-center"
                  >
                    {/* Product image + name + (Price + SKU on mobile) */}
                    <div className="flex flex-col">
                      {/* Product image + name + details */}
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 self-start md:self-center">
                          <Image
                            src={
                              item.basket_prod_image
                                ? `${imageUrl}/medium/${item.basket_prod_image}`
                                : noProduct
                            }
                            alt="Product"
                            width={60}
                            height={60}
                            className="rounded md:w-[60px] md:h-[60px] object-contain"
                          />
                        </div>

                        {/* Name + price + sku */}
                        <div className="flex flex-col justify-center">
                          <span className="font-medium">
                            {item.basket_prod_name}
                          </span>

                          {/* Mobile-only price + sku */}
                          <div className="md:hidden flex flex-col mt-1 gap-1">
                            <span className="text-[#888888]">
                              <WrapAmount value={item.price} />
                            </span>
                            <span className="text-[#444444]">
                              {item.basket_prod_sku}
                            </span>
                            <div className="flex items-center justify-start gap-2">
                              <div className="flex items-center border rounded-full overflow-hidden h-6 w-auto text-xs">
                                <button
                                  onClick={() => handleQtyChange(i, -1)}
                                  className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                                >
                                  –
                                </button>
                                <input
                                  type="text"
                                  className="w-8 h-full text-center border-x text-xs"
                                  value={item.quantity}
                                  readOnly
                                />
                                <button
                                  onClick={() => handleQtyChange(i, 1)}
                                  className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-left md:text-right text-[#888888]">
                                <WrapAmount value={item.total} />
                              </div>
                            </div>
                            <div className="flex justify-start md:justify-center">
                              <button className="text-[var(--color-red)] hover:text-red-700 cursor-pointer">
                                {commonLabels.remove}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price (desktop only) */}
                    <div className="hidden md:block text-center text-[#888888]">
                      <WrapAmount value={item.price} />
                    </div>

                    {/* SKU (desktop only) */}
                    <div className="hidden md:block text-left text-[#444444]">
                      {item.basket_prod_sku}
                    </div>

                    {/* Quantity */}
                    <div className="hidden md:flex items-center justify-start md:justify-center">
                      <div className="flex items-center border rounded-full overflow-hidden h-6 w-auto text-xs">
                        <button
                          onClick={() => handleQtyChange(i, -1)}
                          className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                        >
                          –
                        </button>
                        <input
                          type="text"
                          className="w-8 h-full text-center border-x text-xs"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          onClick={() => handleQtyChange(i, 1)}
                          className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="hidden md:block text-left md:text-right text-[#888888]">
                      <WrapAmount value={item.total} />
                    </div>

                    {/* Remove button */}
                    {items.length > 0 && (
                      <div className="hidden md:flex justify-start md:justify-center">
                        <button className="text-[var(--color-red)] hover:text-red-700 cursor-pointer">
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  {cartLabels.cartEmpty}
                </div>
              )}
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
                <WrapAmount value={balance} />
              </span>
            </p>
            <div className="">
              <Input
                type="text"
                className="text-[16px] font-bold mb-2 border rounded-[60px] p-1 text-center"
                value={`${CURRENCY_SYMBOL}${amount}`}
                disabled={items.length <= 0}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  const maxAmount = balance ?? 0;
                  const maxDigits = maxAmount.toString().length;
                  const limitedVal = val.slice(0, maxDigits);
                  const num = limitedVal ? parseInt(limitedVal, 10) : 0;
                  setAmount(Math.min(num, maxAmount));
                }}
              />
            </div>
            <Button
              className="w-full text-[12px] md:text-sm text-[var(--color-white)] rounded-[50px]"
              // disabled={items.length <= 0 || amount <= 0}
              onClick={() => handleReedemBasket(amount)}
            >
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
                <span>
                  {loadingCart ? (
                    <LoaderDiv height={20} width={50} />
                  ) : (
                    summary.units
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.totalSKUs}</span>
                <span>
                  {" "}
                  {loadingCart ? (
                    <LoaderDiv height={20} width={50} />
                  ) : (
                    summary.sku_count
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.subtotal}</span>
                <span>
                  {" "}
                  {loadingCart ? (
                    <LoaderDiv height={20} width={50} />
                  ) : (
                    <WrapAmount value={summary.sub_total} />
                  )}
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
                  {loadingCart ? (
                    <LoaderDiv height={20} width={50} />
                  ) : (
                    <WrapAmount value={summary.delivery_charge} />
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.subtotal}</span>
                <span>
                  {" "}
                  {loadingCart ? (
                    <LoaderDiv height={20} width={50} />
                  ) : (
                    <WrapAmount value={summary.sub_total} />
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{cartLabels.vat}</span>
                <span>
                  {" "}
                  {loadingCart ? (
                    <LoaderDiv height={20} width={50} />
                  ) : (
                    <WrapAmount value={summary.vat} />
                  )}
                </span>
              </div>
              {summary.offer_discount > 0 && (
                <div className="flex justify-between">
                  <span>{cartLabels.offerDiscount}</span>
                  <span>
                    {" "}
                    {loadingCart ? (
                      <LoaderDiv height={20} width={50} />
                    ) : (
                      <WrapAmount value={summary.offer_discount} />
                    )}
                  </span>
                </div>
              )}
              {summary.discount_value ? (
                <div className="flex justify-between">
                  <span>{cartLabels.eliteRewards}</span>
                  <span className="text-[var(--color-red)]">
                    - <WrapAmount value={summary.discount_value} />
                  </span>
                </div>
              ) : null}
            </div>

            <div className="flex justify-between text-lg font-semibold mt-4 p-2 pb-0 mb-0">
              <span>{cartLabels.total}</span>
              <span className="text-[var(--color-red)]">
                {" "}
                {loadingCart ? (
                  <LoaderDiv height={20} width={50} />
                ) : (
                  <WrapAmount value={summary.grand_total} />
                )}
              </span>
            </div>

            <div className="space-y-2 mt-0">
              <Button
                className="w-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] rounded-[50px]"
                disabled={items.length <= 0}
              >
                {cartLabels.proceedToPayment}
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-[50px]"
                onClick={() => router.push("/order")}
              >
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
