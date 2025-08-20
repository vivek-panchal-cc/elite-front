import React, { useState } from "react";
import { profileLabels } from "@/lib/labels";
import Fire from "@/components/images/svgs/Fire";
import Heart from "@/components/images/svgs/Heart";
import Image from "next/image";
import { productTwo } from "@/components/images";
import WrapAmount from "@/components/wrapper/WrapAmount";
import FilledHeart from "@/components/images/svgs/FilledHeart";

interface Company {
  companyName: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  postcode: string;
}
interface Product {
  name: string;
  price: number;
  tag?: string;
  category?: string;
}

const products: Product[] = [
  {
    name: "Product Name",
    price: 4.5,
    tag: "25%",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "SOLD OUT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "25%",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "SOLD OUT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "BUY 5 GET 2 FREE",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "HOT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "BUY 5 GET 2 FREE",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "HOT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "25%",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "SOLD OUT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "25%",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "SOLD OUT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "BUY 5 GET 2 FREE",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "HOT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "BUY 5 GET 2 FREE",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "HOT",
    category: "Product Category",
  },
];
interface ProfileFavouriteProps {
  isMobile?: boolean;
}

export default function ProfileFavourite({ isMobile }: ProfileFavouriteProps) {
  const [liked, setLiked] = useState<boolean[]>(
    Array(products.length).fill(false)
  );
  const [quantities, setQuantities] = useState<number[]>(
    Array(products.length).fill(0)
  );

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (index >= newQuantities.length) return prev;
      newQuantities[index] = newQuantity;
      return newQuantities;
    });
  };

  const handleLikeToggle = (index: number) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] bg-[var(--color-light-gray)] shadow-sm ${
          isMobile ? "border-t-0 rounded-t-none rounded-b-xl" : "rounded-xl"
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
        <div
          className={`overflow-hidden rounded-xl  ${
            isMobile ? "px-2 pt-8 pb-8" : "px-8 pb-8 pt-4"
          }`}
        >
          <div
            className={`flex flex-wrap justify-center ${
              isMobile ? "gap-4" : "gap-6"
            }`}
          >
            {products.map((p, idx) => (
              <div
                key={idx}
                className="rounded-lg flex flex-col items-center text-center relative cursor-pointer w-24 sm:w-32 md:w-40"
              >
                {/* Image */}
                <div className="relative mb-1 sm:mb-2 w-full">
                  <div className="relative h-24 w-full sm:h-32 md:h-40 rounded-md border border-[var(--color-red)] overflow-hidden">
                    <Image
                      src={productTwo}
                      alt="Product"
                      fill
                      className="object-contain rounded p-4"
                    />

                    {/* Bottom controls */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                      {/* Quantity Controls */}
                      <div className="relative w-16 h-5 flex items-center justify-center overflow-hidden">
                        {/* Single + Button (quantity 0) */}
                        <button
                          className={`absolute left-0 w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] text-sm cursor-pointer transition-all duration-300 ease-in-out ${
                            quantities[idx] === 0
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-90 pointer-events-none"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(idx, 1);
                          }}
                        >
                          +
                        </button>

                        {/* Full Counter (quantity > 0) */}
                        <div
                          className={`absolute left-0 flex items-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] h-5 sm:h-5 transition-all duration-300 ease-in-out overflow-hidden ${
                            quantities[idx] > 0
                              ? "opacity-100 px-1 sm:px-1 scale-x-100"
                              : "opacity-0 px-0 scale-x-0 pointer-events-none"
                          }`}
                          style={{ transformOrigin: "left" }}
                        >
                          <button
                            className="w-4 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(idx, quantities[idx] - 1);
                            }}
                          >
                            -
                          </button>
                          <span className="px-0 text-[10px] sm:text-xs w-5 text-center">
                            {quantities[idx]}
                          </span>
                          <button
                            className="w-4 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(idx, quantities[idx] + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Heart Icon */}
                      {liked[idx] ? (
                        <FilledHeart
                          className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-red)] cursor-pointer"
                          fill=""
                          onClick={() => handleLikeToggle(idx)}
                        />
                      ) : (
                        <Heart
                          className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-red)] cursor-pointer"
                          onClick={() => handleLikeToggle(idx)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Badge - moved outside overflow-hidden */}
                  {p.tag && (
                    <span
                      className={`absolute flex items-center gap-1 px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full -top-2 sm:-top-3 left-1 sm:left-2 z-20
              ${
                p.tag === "25%"
                  ? "bg-[var(--color-green)] text-[var(--color-white)]"
                  : p.tag === "HOT"
                  ? "bg-[var(--color-orange)] text-[var(--color-white)]"
                  : p.tag === "BUY 5 GET 2 FREE"
                  ? "bg-[var(--color-light-blue)] text-[var(--color-white)]"
                  : p.tag === "SOLD OUT"
                  ? "bg-[var(--color-red)] text-[var(--color-white)]"
                  : ""
              }`}
                    >
                      {p.tag === "HOT" && (
                        <Fire className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                      {p.tag}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <p className="text-xs sm:text-sm font-medium">{p.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {p.category}
                </p>

                <div className="w-full font-bold text-[var(--color-red)] mt-1">
                  <div className="flex justify-center items-center text-xs sm:text-sm font-medium">
                    <span className="text-base sm:text-lg md:text-[19px]">
                      <WrapAmount value={p.price} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
