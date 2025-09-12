import React, { useState } from "react";
import { Button } from "@/components/ui/ButtonUI";
import { cartLabels } from "@/lib/labels";
import Image from "next/image";
import { productOne } from "../images";
import WrapAmount from "../wrapper/WrapAmount";

interface FreeProduct {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface FreeProductsProps {
  setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const mockProducts: FreeProduct[] = [
  {
    id: 1,
    name: "Free Product 1",
    image: "/images/sample-product.png",
    price: 10,
  },
  {
    id: 2,
    name: "Free Product 2",
    image: "/images/sample-product.png",
    price: 20,
  },
  {
    id: 3,
    name: "Free Product 1",
    image: "/images/sample-product.png",
    price: 30,
  },
  {
    id: 4,
    name: "Free Product 2",
    image: "/images/sample-product.png",
    price: 40,
  },
  {
    id: 5,
    name: "Free Product 1",
    image: "/images/sample-product.png",
    price: 50,
  },
  {
    id: 6,
    name: "Free Product 2",
    image: "/images/sample-product.png",
    price: 60,
  },
  {
    id: 7,
    name: "Free Product 1",
    image: "/images/sample-product.png",
    price: 70,
  },
  {
    id: 8,
    name: "Free Product 2",
    image: "/images/sample-product.png",
    price: 80,
  },
];

const FreeProductsModal = ({ setModalClose }: FreeProductsProps) => {
  const initialQuantities = mockProducts.reduce(
    (acc, product) => ({ ...acc, [product.id]: 0 }),
    {} as Record<number, number>
  );

  const [quantities, setQuantities] =
    useState<Record<number, number>>(initialQuantities);

  const handleQuantity = (id: number, type: "inc" | "dec") => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const newVal = type === "inc" ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [id]: newVal };
    });
  };

  return (
    <div className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="p-4 md:p-5 border-b bg-[var(--color-blue)]">
        <h2 className="text-xl font-bold text-left text-[var(--color-white)]">
          {cartLabels.freeProductsHead}
        </h2>
      </div>

      {/* Product List */}
      <div className="flex-1 custom-scrollbar overflow-y-auto p-6 space-y-4">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 border rounded-lg p-3"
          >
            {/* Product Image */}
            <Image
              src={productOne || product.image}
              alt={product.name}
              width={60}
              height={60}
              className="rounded-md"
            />

            {/* Product Info */}
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm">{product.name}</span>
              <span className="text-xs text-[var(--color-gray)]">
                <WrapAmount value={product.price} />
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex w-20 items-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] h-6 transition-all duration-300 ease-in-out">
              <button
                className="w-1/3 flex items-center justify-center text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantity(product.id, "dec");
                }}
              >
                -
              </button>
              <span className="w-1/3 text-center text-xs">
                {quantities[product.id]}
              </span>
              <button
                className="w-1/3 flex items-center justify-center text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantity(product.id, "inc");
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
        >
          {cartLabels.addToBasket}
        </Button>
      </div>
    </div>
  );
};

export default FreeProductsModal;
