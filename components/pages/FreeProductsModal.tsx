import React, { useState } from "react";
import { Button } from "@/components/ui/ButtonUI";
import { cartLabels } from "@/lib/labels";
import Image from "next/image";
import { noProduct } from "../images";
import WrapAmount from "../wrapper/WrapAmount";
import { FreeProducts } from "@/types/product";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

interface FreeProductsProps {
  setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
  products: FreeProducts[];
}

const FreeProductsModal = ({ setModalClose, products }: FreeProductsProps) => {
  const initialQuantities = products.reduce(
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

  const isButtonDisabled = !products.some(
    (product) => quantities[product.prod_id] === product.free_prod_qty
  );

  return (
    <div className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="p-4 md:p-5 border-b bg-[var(--color-blue)]">
        <h2 className="text-xl font-bold text-left text-[var(--color-white)]">
          {cartLabels.freeProductsHead}
        </h2>
      </div>

      <div className="p-4 md:p-5">
        <h2 className="text-[14px] sm:text-xl font-bold text-left text-[var(--color-black)]">
          {cartLabels.maxFreeProducts}:
        </h2>
      </div>

      {/* Product List */}
      <div className="flex-1 custom-scrollbar overflow-y-auto p-6 space-y-4">
        {products.map((product) => (
          <div
            key={product.prod_id}
            className="flex items-center gap-4 border rounded-lg p-3"
          >
            {/* Product Image */}
            <Image
              src={
                product.images.prod_image
                  ? `${imageBaseUrl}/small/${product.images.prod_image}`
                  : noProduct
              }
              alt={product.prod_short_name}
              width={60}
              height={60}
              className="object-contain rounded-md w-[60px] h-[60px]"
            />

            {/* Product Info */}
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm">
                {product.prod_short_name}
              </span>
              {/* <span className="text-xs text-[var(--color-gray)]">
                <WrapAmount value={product.prod_sp_offer_price} />
              </span> */}
            </div>

            {/* Quantity Controls */}
            <div className="flex w-20 items-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] h-6 transition-all duration-300 ease-in-out">
              <button
                className="w-1/3 flex items-center justify-center text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantity(product.prod_id, "dec", product.free_prod_qty);
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
                  handleQuantity(product.prod_id, "inc", product.free_prod_qty);
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Footer */}
      <div className="p-4 border-t bg-[var(--color-white)] sticky bottom-0">
        <Button
          type="submit"
          className="w-full rounded-[50px]"
          onClick={() => setModalClose(false)}
          disabled={isButtonDisabled}
        >
          {cartLabels.addToBasket}
        </Button>
      </div>
    </div>
  );
};

export default FreeProductsModal;
