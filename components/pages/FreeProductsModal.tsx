import React, { useState } from "react";
import { Button } from "@/components/ui/ButtonUI";
import { cartLabels } from "@/lib/labels";
import Image from "next/image";
import { noProduct } from "../images";
import WrapAmount from "../wrapper/WrapAmount";
import { FreeProducts } from "@/types/product";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

interface FreeProductsProps {
  setModalClose: (data?: {
    prodId: number;
    quantity: number;
    sku: string;
    freeProdDiscId: number;
  }) => void;
  products: FreeProducts;
}

const FreeProductsModal = ({ setModalClose, products }: FreeProductsProps) => {
  const initialQuantities = products.items.reduce(
    (acc, product) => ({ ...acc, [product.prod_id]: 0 }),
    {} as Record<number, number>
  );

  const [quantities, setQuantities] =
    useState<Record<number, number>>(initialQuantities);

  const handleQuantity = (id: number, type: "inc" | "dec", maxQty: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;

      if (type === "inc") {
        // If we increase, reset all other products
        if (current < maxQty) {
          return {
            ...Object.keys(prev).reduce(
              (acc, key) => ({ ...acc, [key]: 0 }),
              {}
            ),
            [id]: current + 1,
          };
        }
      } else if (type === "dec" && current > 0) {
        // Just decrement for the current product
        return { ...prev, [id]: current - 1 };
      }

      return prev;
    });
  };

  const handleAddToBasket = () => {
    const selected = products.items.find((p) => quantities[p.prod_id] > 0);

    if (selected) {
      const qty = quantities[selected.prod_id];
      const totalUnits = qty * selected.box_size;

      setModalClose({
        prodId: selected.prod_id,
        quantity: totalUnits, // box quantity
        sku: selected.prod_sku,
        freeProdDiscId: selected.disc_id,
      });
    } else {
      setModalClose();
    }
  };

  const isButtonDisabled = !products.items.some(
    (product) => quantities[product.prod_id] === product.free_prod_qty
  );

  const maxQuantity = products.free_prod_qty;

  return (
    <div className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="p-3 md:p-3 bg-[var(--color-white)]">
        <h2 className="text-[18px] sm:text-[24px] font-bold leading-[33px] sm:leading-[52px] text-center text-[var(--color-blue)]">
          {cartLabels.freeProductsHead}
        </h2>
      </div>

      <div className="px-6 sm:px-8">
        <h2 className="text-[14px] sm:text-xl font-bold text-left text-[var(--color-black)]">
          {cartLabels.maxFreeProducts} : {maxQuantity}
        </h2>
      </div>

      {/* Product List */}
      <div className="grid max-[425px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 custom-scrollbar overflow-y-auto p-4 sm:p-6 px-6 sm:px-8 space-y-0 gap-3">
        {products.items.map((product) => {
          const qty = quantities[product.prod_id];
          return (
            <div
              key={product.prod_id}
              className="flex flex-col items-center gap-2 border border-[var(--color-red)] rounded-xl p-3"
            >
              {/* Product Image */}
              <div className="relative w-[120px] h-[82px] flex items-center justify-center">                
                <div className="rounded-md bg-[var(--color-light-gray)] overflow-hidden w-full h-full flex items-center justify-center">
                  <Image
                    src={
                      product.images.prod_image
                        ? `${imageBaseUrl}/medium/${product.images.prod_image}` //whenever data in small folder do change from medium to small
                        : noProduct
                    }
                    alt={product.prod_short_name || product.prod_name}
                    fill
                    className="object-contain"
                  />
                </div>
                {qty > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-red)] text-white text-[8px] font-bold rounded-full h-[22px] w-[22px] flex items-center justify-center shadow-md">
                    {qty * product.box_size}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-center">
                  {product.prod_short_name || product.prod_name}
                </span>
                {/* {qty > 0 && (
                  <span className="text-xs text-[var(--color-gray)] text-center">
                    {cartLabels.totalUnits} : {qty * product.box_size}
                  </span>
                )} */}
                {/* <span className="text-xs text-[var(--color-gray)]">
                <WrapAmount value={product.prod_sp_offer_price} />
              </span> */}
              </div>

              {/* Quantity Controls */}
              <div
                className={`w-full flex items-center rounded-full text-[var(--color-white)] h-6 transition-all duration-300 ease-in-out ${
                  qty > 0 ? "bg-[var(--color-red)]" : "bg-[var(--color-blue)]"
                }`}
              >
                <button
                  className="w-1/3 flex items-center justify-center text-xs cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantity(
                      product.prod_id,
                      "dec",
                      product.free_prod_qty
                    );
                  }}
                >
                  -
                </button>
                <span className="w-1/3 text-center text-xs">
                  {quantities[product.prod_id]}
                </span>
                <button
                  className="w-1/3 flex items-center justify-center text-xs cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantity(
                      product.prod_id,
                      "inc",
                      product.free_prod_qty
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Footer */}
      <div className="p-4 border-t bg-[var(--color-white)] sticky bottom-0">
        <Button
          type="submit"
          className="w-full rounded-[50px]"
          onClick={handleAddToBasket}
          disabled={isButtonDisabled}
        >
          {cartLabels.addToBasket}
        </Button>
      </div>
    </div>
  );
};

export default FreeProductsModal;
