import React, { useEffect, useState } from "react";
import { commonLabels, profileLabels } from "@/lib/labels";
import Fire from "@/components/images/svgs/Fire";
import Heart from "@/components/images/svgs/Heart";
import Image from "next/image";
import { noProduct, outOfStock } from "@/components/images";
import WrapAmount from "@/components/wrapper/WrapAmount";
import FilledHeart from "@/components/images/svgs/FilledHeart";
import useFavouriteProductList from "@/hooks/useFavourite";
import useAddOrRemoveFavourite from "@/hooks/useAddOrRemoveFavourite";
import LoaderProduct from "@/components/loaders/LoaderProduct";
import { useBasket } from "@/components/context/BasketContext";
import useCartItems from "@/hooks/useCartItems";

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
interface ProfileFavouriteProps {
  isMobile?: boolean;
}

export default function ProfileFavourite({ isMobile }: ProfileFavouriteProps) {
  const { addOrRemoveFavourite } = useAddOrRemoveFavourite();
  const { addToBasketHandler, isLoading } = useBasket();
  const { reloadCart } = useCartItems();
  const [loading, favouriteProduct, reload] = useFavouriteProductList();
  const [liked, setLiked] = useState<boolean[]>(
    Array(favouriteProduct.length).fill(true)
  );
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (favouriteProduct.length > 0) {
      const initialQuantities = favouriteProduct.reduce((acc, p) => {
        acc[p.prod_id] = p.basket_quantity ?? 0;
        return acc;
      }, {} as { [key: number]: number });

      setQuantities(initialQuantities);
    }
  }, [favouriteProduct]);

  // const handleQuantityChange = (index: number, newQuantity: number) => {
  //   if (newQuantity < 0) return;
  //   setQuantities((prev) => {
  //     const newQuantities = [...prev];
  //     if (index >= newQuantities.length) return prev;
  //     newQuantities[index] = newQuantity;
  //     return newQuantities;
  //   });
  // };

  const handleQuantityChange = async (
    prodId: number,
    newQuantity: number,
    step: number,
    sku: string
  ) => {
    if (newQuantity < 0) return;

    setQuantities((prev) => ({ ...prev, [prodId]: newQuantity }));

    if (newQuantity === 0) {
      // Remove from basket
      await addToBasketHandler({
        prod_id: prodId,
        action: "product-remove",
        quantity: 0,
        only_free_prod: 0,
      });
    } else if (newQuantity > (quantities[prodId] || 0)) {
      // Increment
      await addToBasketHandler({
        prod_id: prodId,
        action: "add",
        flag: "add",
        quantity: newQuantity,
        prod_sku: sku,
      });
    } else {
      // Decrement
      await addToBasketHandler({
        prod_id: prodId,
        action: "add",
        flag: "remove",
        quantity: newQuantity,
        prod_sku: sku,
      });
    }
    if (reloadCart) await reloadCart();
  };

  const handleLikeToggle = (index: number) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  const handleFavourite = async (prodId: number, action: "add" | "remove") => {
    await addOrRemoveFavourite(prodId, action);
    reload();
  };

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] bg-[var(--color-light-gray)] shadow-sm ${
          isMobile
            ? "max-h-[770px] border-t-0 rounded-t-none rounded-b-xl"
            : "max-h-[1000px] rounded-xl"
        }`}
      >
        {/* Header */}
        {!isMobile && (
          <div className="flex justify-between items-center px-6 py-6">
            <h3 className="font-bold text-[16px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]">
              {profileLabels.myFavourite}
            </h3>
          </div>
        )}

        {/* Product Grid */}
        <div className="overflow-hidden rounded-xl">
          <div
            className={`custom-scrollbar ${
              isMobile
                ? "max-h-[690px] px-2 pt-8 pb-8"
                : "max-h-[900px] px-8 pb-8 pt-4"
            }`}
          >
            <div
              className={`flex flex-wrap justify-center ${
                isMobile ? "gap-4" : "gap-6"
              }`}
            >
              {loading ? (
                <LoaderProduct count={4} />
              ) : favouriteProduct.length > 0 ? (
                favouriteProduct.map((p, idx) => {
                  const step =
                    p.prod_box_size && p.prod_box_size > 0
                      ? p.prod_box_size
                      : 1;
                  return (
                    <div
                      key={p.prod_id}
                      className="rounded-lg flex flex-col items-center text-center relative cursor-pointer w-24 sm:w-32 md:w-40"
                    >
                      {/* Image */}
                      <div className="relative mb-1 sm:mb-2 w-full">
                        <div className="relative h-24 w-full sm:h-32 md:h-40 rounded-md border border-[var(--color-red)] overflow-hidden">
                          <Image
                            // src={
                            //   p.images_prod_image
                            //     ? `${imageBaseUrl}/medium/${p.images_prod_image}`
                            //     : noProduct
                            // }
                            src={
                              p.gcerp_product_status
                                ? p.default_image
                                  ? `${imageBaseUrl}/medium/${p.default_image}`
                                  : noProduct
                                : outOfStock
                            }
                            alt={p.prod_name}
                            fill
                            className="object-contain rounded p-4"
                          />

                          {/* Bottom controls */}
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                            {/* Quantity Controls */}
                            <div className="relative w-16 h-5 flex items-center justify-center overflow-hidden">
                              {/* Single + Button (quantity 0) */}
                              <button
                                className={`absolute left-0 w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full text-[var(--color-white)] text-sm cursor-pointer transition-all duration-300 ease-in-out ${
                                  (quantities[p.prod_id] || 0) === 0
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-90 pointer-events-none"
                                }
                              ${
                                !p.gcerp_product_status
                                  ? "opacity-50 cursor-not-allowed bg-[var(--color-disabled)]"
                                  : "bg-[var(--color-red)]"
                              }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(
                                    p.prod_id,
                                    (quantities[p.prod_id] || 0) + step,
                                    step,
                                    p.prod_sku
                                  );
                                }}
                                disabled={!p.gcerp_product_status}
                              >
                                +
                              </button>

                              {/* Full Counter (quantity > 0) */}
                              <div
                                className={`absolute left-0 flex items-center rounded-full text-[var(--color-white)] h-5 sm:h-5 transition-all duration-300 ease-in-out overflow-hidden ${
                                  (quantities[p.prod_id] || 0) > 0
                                    ? "opacity-100 px-1 sm:px-1 scale-x-100"
                                    : "opacity-0 px-0 scale-x-0 pointer-events-none"
                                } ${
                                  !p.gcerp_product_status
                                    ? "opacity-50 cursor-not-allowed bg-[var(--color-disabled)]"
                                    : "bg-[var(--color-red)]"
                                }`}
                                style={{ transformOrigin: "left" }}
                              >
                                <button
                                  className="w-4 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(
                                      p.prod_id,
                                      (quantities[p.prod_id] || 0) - step,
                                      step,
                                      p.prod_sku
                                    );
                                  }}
                                  disabled={!p.gcerp_product_status}
                                >
                                  -
                                </button>
                                <span className="px-0 text-[10px] sm:text-xs w-5 text-center">
                                  {quantities[p.prod_id] || 0}
                                </span>
                                <button
                                  className="w-4 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(
                                      p.prod_id,
                                      (quantities[p.prod_id] || 0) + step,
                                      step,
                                      p.prod_sku
                                    );
                                  }}
                                  disabled={!p.gcerp_product_status}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <FilledHeart
                              className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-red)] cursor-pointer"
                              fill=""
                              onClick={() =>
                                handleFavourite(p.prod_id, "remove")
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <p className="text-xs sm:text-sm font-medium">
                        {p.prod_name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {p.cat_name || ""}
                      </p>

                      <div className="w-full font-bold text-[var(--color-red)] mt-1">
                        <div className="flex justify-center items-center text-xs sm:text-sm font-medium">
                          <span className="text-base sm:text-lg md:text-[19px]">
                            <WrapAmount value={p.fixed_price} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">
                  {commonLabels.noFavourites}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
