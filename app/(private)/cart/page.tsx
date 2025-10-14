"use client";

import PrivateLayout from "../PrivateLayout";
import Image from "next/image";
import { Button } from "@/components/ui/ButtonUI";
import { X } from "lucide-react";
import { noProduct } from "@/components/images";
import { altTextLabels, cartLabels, commonLabels } from "@/lib/labels";
import {
  CAT_TYPE_ID,
  CURRENCY_SYMBOL,
  ELITE_WALLET,
  NEW_CARD,
  SAVED_CARD,
} from "@/lib/constants/all";
import Breadcrumb from "@/components/ui/Breadrumb";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoaderDiv from "@/components/loaders/LoaderDiv";
import { useBasket } from "@/components/context/BasketContext";
import useCartItems from "@/hooks/useCartItems";
import { CartMeta, CartSummary } from "@/types/cart";
import LoaderItems from "@/components/loaders/LoaderItems";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { ProductAddToBasketParams } from "@/types/product";
import Modal from "@/components/ui/Modal";
import FreeProductsModal from "@/components/pages/FreeProductsModal";
import { useCheckout } from "@/components/context/CheckoutContext";
import { apiRequest } from "@/lib/apiRequest";
import { useLoader } from "@/components/providers/loader-provider";
import useCartSummary from "@/hooks/useCartSummary";
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

const Cart = () => {
  const router = useRouter();
  const { setIsLoading } = useLoader();
  const { proceedToCheckout } = useCheckout();
  const { dealer, reloadUser, setReloadUser } = useAuthStoreWithAutoRefresh();
  const { clearCart, updateRedeemAmountBasket, addToBasketHandler } =
    useBasket();
  const { reloadCartSummary } = useCartSummary();
  const { loadingCart, cartItems, reloadCart } = useCartItems();
  const { items, meta, summary } = cartItems ?? {
    items: [],
    meta: {} as CartMeta,
    summary: {} as CartSummary,
  };
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [amountInput, setAmountInput] = useState<string>("");
  const [originalGrandTotal, setOriginalGrandTotal] = useState<number>(0);
  const [freeProductsModal, setFreeProductsModal] = useState<boolean>(false);
  const [freeProductsData, setFreeProductsData] = useState<any[]>([]);
  const [freeProductsQueue, setFreeProductsQueue] = useState<any[]>([]);
  const [currentFreeIndex, setCurrentFreeIndex] = useState<number>(0);
  const [pendingUpdate, setPendingUpdate] = useState<any>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (dealer?.current_amount_bal) {
      setBalance(dealer.current_amount_bal);
    }
  }, [dealer]);

  useEffect(() => {
    if ((dealer?.current_amount_bal ?? 0) > 0 && balance <= 0) {
      if (setReloadUser) setReloadUser(!reloadUser);
    }
  }, [dealer, balance]);

  useEffect(() => {
    if (
      summary?.grand_total !== undefined &&
      summary?.discount_value !== undefined
    ) {
      setOriginalGrandTotal(summary.grand_total + summary.discount_value);
    }
  }, [summary?.grand_total, summary?.discount_value]);

  useEffect(() => {
    const grandTotal = Number(summary?.grand_total) || 0;
    const discount = Number(summary?.discount_value) || 0;
    setOriginalGrandTotal(grandTotal + discount);
  }, [summary?.grand_total, summary?.discount_value]);

  useEffect(() => {
    if (items && items.length > 0) {
      const initialQuantities: { [key: number]: number } = {};
      items.forEach((item) => {
        initialQuantities[item.basket_id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [items]);

  const handleUpdateQuantity = async (
    prod_id: number,
    basket_id: number,
    newQuantity: number,
    prod_sku: string
  ) => {
    if (newQuantity === 0) return;
    let response: any = null;

    response = await addToBasketHandler({
      prod_id,
      basket_id,
      action: "add",
      quantity: newQuantity,
      prod_sku,
      only_free_prod: 0,
    });
    if (response?.success && response.statusCode === 200) {
      if (response?.data?.length > 0) {
        setFreeProductsData(response.data);
        setFreeProductsQueue(response.data);
        setCurrentFreeIndex(0);
        setPendingUpdate({ basket_id, newQuantity });
      } else {
        setQuantities((prev) => ({
          ...prev,
          [basket_id]: Math.max(0, newQuantity),
        }));
        setAmount(0);
        setAmountInput("0");
        if (reloadCart) await reloadCart();
        if (reloadCartSummary) await reloadCartSummary();
        if (setReloadUser) await setReloadUser(!reloadUser);
      }
    } else {
      toast.warning(response.message);
    }
  };

  const handleCloseFreeModal = async (data?: {
    prodId: number;
    quantity: number;
    sku: string;
    freeProdDiscId: number;
  }) => {
    if (!data) return null;
    let response: any = null;
    const payload = {
      action: "add",
      prod_id: data.prodId,
      quantity: data.quantity,
      prod_sku: data.sku,
      flag: "addFreeProduct",
      options: {
        freeProdDiscId: data.freeProdDiscId,
      },
    } as const;
    response = await addToBasketHandler(payload as ProductAddToBasketParams);
    if (response?.success && response.statusCode === 200) {
      if (currentFreeIndex < freeProductsQueue.length - 1) {
        setFreeProductsQueue([]);
        setTimeout(() => {
          setCurrentFreeIndex((prev) => prev + 1);
          setFreeProductsQueue(freeProductsData);
        }, 300);
      } else {
        // last modal → clear queue
        setFreeProductsQueue([]);
        setCurrentFreeIndex(0);

        if (pendingUpdate) {
          const { basket_id, newQuantity } = pendingUpdate;
          setQuantities((prev) => ({
            ...prev,
            [basket_id]: Math.max(0, newQuantity),
          }));
          if (reloadCart) await reloadCart();
          if (reloadCartSummary) await reloadCartSummary();
          setPendingUpdate(null);
        }
      }
    } else {
      toast.warning(response.message);
    }
  };

  const handleClearCart = async () => {
    setAmount(0);
    setAmountInput("0");
    await clearCart();
    if (reloadCart) await reloadCart();
    if (reloadCartSummary) await reloadCartSummary();
  };

  const removeSingleRecord = async (
    basket_id: number,
    basket_prod_sku: string
  ) => {
    setAmount(0);
    setAmountInput("0");
    await addToBasketHandler({
      basket_id: basket_id,
      action: "remove",
      prod_sku: basket_prod_sku,
    });
    if (reloadCart) await reloadCart();
    if (reloadCartSummary) await reloadCartSummary();
    if (setReloadUser) await setReloadUser(!reloadUser);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(CURRENCY_SYMBOL, "");
    val = val.replace(/[^0-9.]/g, "");

    const parts = val.split(".");
    if (parts.length > 2) {
      val = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[1]?.length > 2) {
      val = parts[0] + "." + parts[1].slice(0, 2);
    }

    if (val === "") {
      setAmount(0);
      setAmountInput("");
      return;
    }

    const num = parseFloat(val);
    if (!isNaN(num)) {
      const maxBalance = balance ?? 0;
      // const maxCartTotal = summary.grand_total ?? 0;
      // const maxAllowed = Math.min(maxBalance, maxCartTotal);
      const maxCartTotal = originalGrandTotal || summary.grand_total || 0;
      const maxAllowed = Math.min(maxBalance, maxCartTotal);

      const clamped = Math.min(num, maxAllowed);
      setAmount(clamped);

      if (clamped === num || val.endsWith(".")) {
        setAmountInput(val);
      } else {
        setAmountInput(clamped.toFixed(2));
      }
    } else {
      setAmount(0);
      setAmountInput(val);
    }
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
    if (reloadCartSummary) await reloadCartSummary();
    setBalance((prev) => prev - value);
    setAmount(0);
    setAmountInput("0");
  };

  const handleProceedToCheckout = async () => {
    if (items.length <= 0) return;
    let freeShopping = false;
    if (summary.grand_total <= 0) {
      freeShopping = true;
    }
    const hasOutOfStock = items.some((item) => item.is_out_of_stock);
    if (hasOutOfStock) {
      toast.warning(
        "Some items in your cart are out of stock. Please remove them before proceeding."
      );
      return;
    }
    const orderData = {
      sub_total: summary.sub_total || 0,
      total_vat: summary.vat || 0,
      delivery_charge: summary.delivery_charge || 0,
      redeem_amount: summary.discount_value || 0,
      grand_total: summary.grand_total || 0,
      dealerId: dealer?.dealer_id || 0,
      userDetails: {
        name: dealer?.dealer_name || "",
        address: {
          line1: "",
          city: "",
          postCode: "",
        },
      },
    };
    const paymentInitiate = async () => {
      if (!orderData) return;
      setIsLoading(true);
      try {
        const { data } = await apiRequest.paymentInitiate({
          is_free_shopping: freeShopping,
        });
        if (!data.success) throw data.message;
        if (data.data.is_free_shopping) {
          router.push("/thank-you?orderId=" + data.data?.orderId);
        } else if (!data.data.is_free_shopping) {
          if (data.data.nextStep === NEW_CARD) {
            const { data } = await apiRequest.createPayment(orderData);
            if (!data.success) throw data.message;
            if (data.data.paymentUrl) {
              window.location.href = data.data.paymentUrl;
            }
          } else if (data.data.nextStep === SAVED_CARD) {
            await proceedToCheckout(orderData);
            router.push("/checkout");
          }
        }
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    paymentInitiate();
  };
  return (
    // <PrivateLayout>
    <div className="max-w-7xl mx-auto w-full">
      <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        <div className="flex-1 space-y-4 py-6">
          <div className="flex items-center justify-between space-y-2 mb-2 px-2">
            <div className="[&_nav]:text-[14px] md:[&_nav]:text-[18px] [&_a]:text-[var(--color-blue)] [&_span]:text-[var(--color-blue)] [&_li]:text-[var(--color-blue)] pb-4 font-bold leading-[27px]">
              <Breadcrumb separator=">" />
              {/* {cartLabels.shoppingCart} */}
            </div>
          </div>

          {/* Two-column layout for content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Product Table - spans 2 columns */}
            <div className="lg:col-span-2 w-full overflow-x-auto custom-scrollbar">
              <div className="md:min-w-[700px]">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] items-center border-b pb-2 text-sm font-medium text-[var(--color-gray)] px-2 gap-2">
                  <span className="min-w-[150px] mr-20">
                    {cartLabels.products}
                  </span>
                  <span className="min-w-[60px] text-left mr-8">
                    {cartLabels.price}
                  </span>
                  <span className="text-left min-w-[100px] mr-8">
                    {cartLabels.sku}
                  </span>
                  <span className="text-left mr-8">{cartLabels.quantity}</span>
                  <span className="text-left mr-8">{cartLabels.subtotal}</span>
                  {items.length > 0 && (
                    <span className="flex justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-[50px] h-7 w-20 hover:bg-red-700 flex items-center justify-center gap-1"
                        onClick={handleClearCart}
                      >
                        <X className="w-3.5 h-3.5" />
                        <span className="text-[10px]">
                          {cartLabels.clearCart}
                        </span>
                      </Button>
                    </span>
                  )}
                </div>

                {/* Table Body */}
                <div className="max-h-[580px] overflow-y-auto custom-scrollbar">
                  {loadingCart ? (
                    [...Array(4)].map((_, idx) => (
                      <div key={idx} className="rounded-[10px] p-2">
                        <LoaderItems />
                      </div>
                    ))
                  ) : items && items.length > 0 ? (
                    items.map((item, i) => {
                      const step =
                        item.box_size && item.box_size > 0 ? item.box_size : 1;
                      return (
                        <div
                          key={i}
                          className={`flex flex-col gap-2 border-b py-4 text-sm px-2 md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] md:items-center ${
                            item.is_out_of_stock
                              ? "opacity-50 bg-[var(--color-light-gray)]"
                              : ""
                          }`}
                        >
                          {/* Product image + name + (Price + SKU on mobile) */}
                          <div className="flex flex-col">
                            {/* Product image + name + details */}
                            <div className="flex gap-4">
                              {/* Product Image */}
                              <div className="flex-shrink-0 self-start md:self-center w-[60px] h-[60px] flex items-center justify-center bg-white border border-gray-200 rounded">
                                <Image
                                  src={
                                    item.basket_prod_image
                                      ? `${imageUrl}/medium/${item.basket_prod_image}`
                                      : noProduct
                                  }
                                  alt={item.basket_prod_name || "Product"}
                                  width={60}
                                  height={60}
                                  className="rounded w-full h-full p-2 object-contain transition-transform duration-200 hover:scale-105"
                                />
                              </div>

                              {/* Name + price + sku */}
                              <div className="flex flex-col justify-center mr-2">
                                <span className="font-medium text-[12px] sm:text-[14px] min-w-[150px] break-words">
                                  {item.basket_prod_name}
                                </span>
                                {item.is_out_of_stock && (
                                  <div className="flex items-center gap-2 sm:gap-0 flex-wrap">
                                    <span className="p-1 text-[10px] bg-[var(--color-red)] text-[var(--color-white)] px-2 rounded-xl">
                                      {cartLabels.outOfStock}
                                    </span>
                                    {/* <span className="text-xs text-[var(--color-gray)]">
                                  {cartLabels.basket}: {item.quantity}
                                </span> */}
                                    <span className="text-xs text-[var(--color-gray)]">
                                      {cartLabels.stock}:{" "}
                                      {item.prod_stock_quantity}
                                    </span>
                                  </div>
                                )}

                                {/* Mobile-only price + sku */}
                                <div className="md:hidden flex flex-col mt-1 gap-1">
                                  <span className="text-[#888888] text-[12px]">
                                    <WrapAmount value={item.price} />
                                  </span>
                                  <span className="text-[#444444] text-[12px]">
                                    {item.basket_prod_sku}
                                  </span>
                                  <div className="flex items-center justify-start gap-2">
                                    <div className="flex items-center border rounded-full overflow-hidden h-6 w-auto text-xs">
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.product_prod_id,
                                            item.basket_id,
                                            (quantities[item.basket_id] || 0) -
                                              step,
                                            item.basket_prod_sku
                                          )
                                        }
                                        disabled={
                                          item.basket_is_free_product === 1
                                        }
                                        className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                                      >
                                        –
                                      </button>
                                      <input
                                        type="text"
                                        className="w-8 h-full text-center border-x text-xs"
                                        value={
                                          quantities[item.basket_id] ??
                                          item.quantity
                                        }
                                        readOnly
                                      />
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.product_prod_id,
                                            item.basket_id,
                                            (quantities[item.basket_id] || 0) +
                                              step,
                                            item.basket_prod_sku
                                          )
                                        }
                                        disabled={
                                          item.basket_is_free_product === 1
                                        }
                                        className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <div className="text-left md:text-right text-[#888888] text-[12px]">
                                      <WrapAmount value={item.total} />
                                    </div>
                                  </div>
                                  <div className="flex justify-start md:justify-center">
                                    <button
                                      key={item.basket_id}
                                      className="text-[12px] text-[var(--color-red)] hover:text-red-700 cursor-pointer"
                                      onClick={() =>
                                        removeSingleRecord(
                                          item.basket_id,
                                          item.basket_prod_sku
                                        )
                                      }
                                    >
                                      {commonLabels.remove}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price (desktop only) */}
                          <div className="hidden md:block text-left text-[#888888] mr-8 min-w-[60px]">
                            <WrapAmount value={item.price} />
                          </div>

                          {/* SKU (desktop only) */}
                          <div className="hidden md:block text-left text-[#444444] min-w-[100px] mr-8">
                            {item.basket_prod_sku}
                          </div>

                          {/* Quantity */}
                          <div className="hidden md:flex items-left justify-start md:justify-left mr-2">
                            <div className="flex items-center border rounded-full overflow-hidden h-6 w-auto text-xs">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.product_prod_id,
                                    item.basket_id,
                                    (quantities[item.basket_id] || 0) - step,
                                    item.basket_prod_sku
                                  )
                                }
                                disabled={
                                  item.basket_is_free_product === 1 ||
                                  item.cat_type_id === CAT_TYPE_ID
                                }
                                className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                              >
                                –
                              </button>
                              <input
                                type="text"
                                className="w-8 h-full text-center border-x text-xs"
                                value={quantities[item.basket_id] || 0}
                                readOnly
                              />
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.product_prod_id,
                                    item.basket_id,
                                    (quantities[item.basket_id] || 0) + step,
                                    item.basket_prod_sku
                                  )
                                }
                                disabled={
                                  item.basket_is_free_product === 1 ||
                                  item.cat_type_id === CAT_TYPE_ID
                                }
                                className="px-2 h-full text-[var(--color-gray)] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Subtotal */}
                          <div className="hidden md:block text-left md:text-left mr-8 text-[#888888]">
                            <WrapAmount value={item.total} />
                          </div>

                          {/* Remove button */}
                          {items.length > 0 && (
                            <div className="hidden md:flex justify-start md:justify-center">
                              <button
                                key={item.basket_id}
                                className="text-[var(--color-red)] hover:text-red-700 cursor-pointer"
                                // className={`cursor-pointer ${
                                //   item.basket_is_free_product === 0
                                //     ? "text-[var(--color-red)] hover:text-red-700"
                                //     : "text-[var(--color-smooth-gray)] hover:text-[var(--color-smooth-gray)]-700"
                                // }`}
                                onClick={() =>
                                  removeSingleRecord(
                                    item.basket_id,
                                    item.basket_prod_sku
                                  )
                                }
                                // disabled={item.basket_is_free_product === 1}
                              >
                                <X size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      {cartLabels.cartEmpty}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Wallet & Summary */}
            <div
              className={`lg:border-t lg:border-[var(--table-border)] space-y-4 lg:pt-4 lg:-ml-[24px] lg:pl-[24px] ${
                loadingCart || items.length <= 0 ? "lg:mt-7" : "lg:mt-9"
              }`}
            >
              {/* Wallet */}
              <div className="border rounded-lg p-4 shadow-[0_0_10px_rgba(0,0,0,0.10)] pl-[30px] pr-[30px]">
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
                <p className="text-[12px] text-[var(--color-black)] mb-2 text-center">
                  {cartLabels.amountLeftInEliteWallet}:{" "}
                  <span className="text-[var(--color-red)] font-semibold">
                    {" "}
                    <WrapAmount value={balance} />
                  </span>
                </p>
                <div className="">
                  <Input
                    type="text"
                    className="max-h-[29px] text-[14px] sm:text-[16px] font-bold mb-2 border rounded-[60px] p-1 text-center"
                    value={`${CURRENCY_SYMBOL} ${amountInput}`}
                    disabled={items.length <= 0}
                    onChange={handleAmountChange}
                  />
                </div>
                <Button
                  className="w-full max-h-[29px] text-[12px] text-[var(--color-white)] rounded-[50px] font-normal"
                  disabled={items.length <= 0 || amount <= 0}
                  onClick={() => handleReedemBasket(amount)}
                >
                  {cartLabels.redeemEliteWalletRewards}
                </Button>
              </div>

              {/* Order Summary */}
              <div className="border rounded-lg p-4 pb-6 shadow-[0_0_10px_rgba(0,0,0,0.10)] space-y-3 px-[30px]">
                <h3 className="text-[12px] font-medium text-[var(--color-black)] mb-1 border-b p-2 pt-1">
                  {cartLabels.orderDetails}
                </h3>
                <div className="text-[12px] text-[#444444] p-2 pb-0">
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

                <h3 className="text-[12px] font-medium text-[var(--color-black)] mt-4 mb-1 border-b p-2">
                  {cartLabels.cartSummary}
                </h3>
                <div className="text-[12px] text-[#444444] p-2 pb-0">
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

                <div className="flex justify-between text-[14px] font-semibold mt-2 p-2 pb-0 mb-2">
                  <span>{cartLabels.total}</span>
                  <span className="text-[var(--color-black)]">
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
                    className="w-full max-h-[32px] text-[12px] font-normal bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] rounded-[50px]"
                    disabled={items.length <= 0}
                    onClick={handleProceedToCheckout}
                  >
                    {cartLabels.proceedToPayment}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full max-h-[32px] rounded-[50px] text-[12px] font-bold"
                    onClick={() => router.push("/order")}
                  >
                    {cartLabels.continueShopping}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {freeProductsQueue.length > 0 && (
        <Modal
          isOpen={true}
          onClose={() => handleCloseFreeModal()}
          classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
          isClose={false}
        >
          <FreeProductsModal
            setModalClose={handleCloseFreeModal}
            products={freeProductsQueue[currentFreeIndex]}
          />
        </Modal>
      )}
    </div>
    // </PrivateLayout>
  );
};

export default Cart;
