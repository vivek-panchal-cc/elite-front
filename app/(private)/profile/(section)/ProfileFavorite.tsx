import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";
import { profileLabels } from "@/lib/labels";
import Fire from "@/components/images/svgs/Fire";
import Eye from "@/components/images/svgs/Eye";
import Heart from "@/components/images/svgs/Heart";

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
    tag: "HOT",
    category: "Product Category",
  },
  {
    name: "Product Name",
    price: 4.5,
    tag: "BUY 5 GET 2 FREE",
    category: "Product Category",
  },
  { name: "Product Name", price: 4.5, category: "Product Category" },
];
interface ProfileFavouriteProps {
  isMobile?: boolean;
}

export default function ProfileFavourite({ isMobile }: ProfileFavouriteProps) {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<number[]>(Array(5).fill(1));
  const [company, setCompany] = useState<Company[]>([
    {
      companyName: "Communication Crafts Pvt. Ltd.",
      address1:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      address2:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      country: "India",
      city: "Ahmedabad",
      postcode: "382210",
    },
  ]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formCompany, setFormCompany] = useState<Company | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (field: keyof Company, value: string) => {
    setFormCompany((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
  };

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] ${
          isMobile
            ? "max-h-[490px] min-h-[490px] border-t-0 rounded-t-none rounded-b-xl"
            : "max-h-[290px] min-h-[280px] rounded-xl"
        } bg-[var(--color-light-gray)] shadow-sm`}
      >
        {/* Header */}
        {!isMobile && (
          <div className="flex justify-between items-center px-6 py-6 border-b-[2px] border-[var(--table-border)]">
            <h3 className="font-bold text-[16px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]">
              {profileLabels.myFavourite}
            </h3>
          </div>
        )}

        {/* Add or Edit Form OR Company List */}
        <div className="overflow-hidden rounded-xl">
          <div
            className={`custom-scrollbar ${
              isMobile
                ? "max-h-[480px] min-h-[480px]"
                : "max-h-[200px] min-h-[200px]"
            }`}
          >
            <div className="mt-2 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
              {products.map((p, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-2 sm:p-4 flex flex-col items-center text-center relative cursor-pointer ${
                    selectedProduct === idx
                      ? "ring-1 sm:ring-2 ring-[var(--color-red)]"
                      : ""
                  }`}
                  onClick={() => setSelectedProduct(idx)}
                >
                  {/* Product Image with Orange Border */}
                  <div
                    className={`relative mb-1 sm:mb-2 ${
                      selectedProduct !== idx
                        ? "border border-[var(--color-orange)] rounded-lg"
                        : ""
                    }`}
                  >
                    <div
                      className={`h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-md ${
                        selectedProduct === idx
                          ? "bg-[var(--color-soft-white)]"
                          : "bg-[var(--color-white)]"
                      }`}
                    />

                    {/* Tag Badge - Responsive */}
                    {p.tag && (
                      <span
                        className={`absolute flex items-center gap-1 px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full ${
                          p.tag === "25%"
                            ? "bg-[var(--color-green)] text-[var(--color-white)]"
                            : p.tag === "HOT"
                            ? "bg-[var(--color-orange)] text-[var(--color-white)]"
                            : p.tag === "BUY 5 GET 2 FREE"
                            ? "bg-[var(--color-light-blue)] text-[var(--color-white)]"
                            : p.tag === "SOLD OUT"
                            ? "bg-[var(--color-red)] text-[var(--color-white)]"
                            : ""
                        } ${
                          selectedProduct === idx
                            ? "-top-5 sm:-top-7 left-0"
                            : "-top-2 sm:-top-3 left-2 sm:left-3"
                        }`}
                      >
                        {p.tag === "HOT" && (
                          <Fire className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}{" "}
                        {p.tag}
                      </span>
                    )}
                  </div>

                  {/* Product Info - Responsive */}
                  <p className="text-xs sm:text-sm font-medium">{p.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {p.category}
                  </p>
                  <div className="w-full font-bold text-[var(--color-red)] mt-1">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        {selectedProduct === idx ? (
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <div className="w-3 sm:w-5" />
                        )}
                      </div>

                      <span className="text-base sm:text-lg md:text-[19px]">
                        £{p.price}
                      </span>

                      <div className="flex items-center gap-1 sm:gap-2">
                        {selectedProduct === idx ? (
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <div className="w-3 sm:w-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Responsive */}
                  {selectedProduct === idx && (
                    <div className="w-full mt-1 sm:mt-2 space-y-1 sm:space-y-2">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center border rounded-full px-0 sm:px-1">
                          <button
                            className="w-4 h-5 sm:h-6 flex items-center justify-center cursor-pointer border-r text-[#888888]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(idx, quantities[idx] - 1);
                            }}
                          >
                            -
                          </button>
                          <span className="px-0 text-xs sm:text-sm w-6 text-center">
                            {quantities[idx]}
                          </span>
                          <button
                            className="w-4 h-5 sm:h-6 flex items-center justify-center cursor-pointer border-l text-[#888888]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(idx, quantities[idx] + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
