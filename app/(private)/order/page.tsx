"use client";

import Image from "next/image";
import PrivateLayout from "../PrivateLayout";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import { dualUSB, eye, heart, searchIcon } from "@/components/images";
import Fire from "@/components/images/svgs/Fire";
import Eye from "@/components/images/svgs/Eye";
import Heart from "@/components/images/svgs/Heart";
import Cart from "@/components/images/svgs/Cart";

// ---------- TYPES ----------
interface Product {
  name: string;
  price: number;
  tag?: string;
  category?: string;
}

interface SubCategory {
  name: string;
  icon: string;
}

interface Category {
  name: string;
  icon: string;
  subCategories?: SubCategory[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

// ---------- DATA ----------
const subCategories: SubCategory[] = [
  { name: "8 in 1", icon: "/icons/icon1.png" },
  { name: "8 in 1 Dual 10K", icon: "/icons/icon2.png" },
  { name: "EPNS Pouches", icon: "/icons/icon3.png" },
  { name: "Havoc 500 Crystal", icon: "/icons/icon4.png" },
  { name: "Havoc Pro Max", icon: "/icons/icon5.png" },
  { name: "Lost Mary BM6000", icon: "/icons/icon6.png" },
  { name: "Lost Mary Max 30K", icon: "/icons/icon7.png" },
  { name: "Phone Cables", icon: "/icons/icon8.png" },
  { name: "Wall Chargers", icon: "/icons/icon9.png" },
];

const mainCategories: Category[] = [
  { name: "High Street Vouchers", icon: "/icons/icon1.png", subCategories },
  { name: "Laptops", icon: "/icons/icon2.png", subCategories },
  { name: "Mobile Phone Accessories", icon: "/icons/icon3.png", subCategories },
  { name: "Mobile Phones", icon: "/icons/icon4.png", subCategories },
  { name: "Nicotine Pouches", icon: "/icons/icon5.png", subCategories },
  { name: "SIM Cards", icon: "/icons/icon6.png", subCategories },
  {
    name: "Vape Bars (Large Big Puff)",
    icon: "/icons/icon7.png",
    subCategories,
  },
  {
    name: "Vape Bars (Single POD Style)",
    icon: "/icons/icon8.png",
    subCategories,
  },
  { name: "Vape Devices", icon: "/icons/icon9.png", subCategories },
  { name: "Vape Pod Replacements", icon: "/icons/icon10.png", subCategories },
];

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

// ---------- COMPONENT ----------
export default function Orders() {
  const [openMain, setOpenMain] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<number[]>(Array(5).fill(1));
  const [cart, setCart] = useState<CartItem[]>([]);

  const text =
    "lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged. It Was Popularised In The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum Passages, And More Recently With Desktop Publishing Software Like Aldus Pagemaker Including Versions Of Lorem Ipsum.";

  const toggleMain = (name: string) => {
    setOpenMain((prev) => (prev === name ? null : name));
    setOpenSub(null);
  };

  const toggleSub = (name: string) => {
    setOpenSub((prev) => (prev === name ? null : name));
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.name === product.name
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  return (
    <PrivateLayout>
      {/* Search Bar - Responsive */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex w-full border rounded-full overflow-hidden group focus-within:border-[var(--color-red)]">
          <Input
            type="text"
            placeholder="Start Typing To Filter Products..."
            className="rounded-r-none text-[12px] sm:text-[14px] bg-[var(--color-soft-white)] w-full p-[20px]"
          />
          <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-20px] min-w-[80px] max-w-[100px] h-[42px]">
            <Image
              src={searchIcon}
              alt="search"
              className="h-[20px] w-[20px]"
            />
          </Button>
        </div>
      </div>

      {/* Main Categories */}
      <section className="space-y-2 sm:space-y-3">
        {mainCategories.map((cat, idx) => {
          const isOpen = openMain === cat.name;

          return (
            <div key={idx}>
              {/* Main Category Button - Responsive */}
              <button
                onClick={() => toggleMain(cat.name)}
                className={`relative z-9999 flex justify-between items-center w-full max-h-10 sm:max-h-12 px-3 sm:px-5 py-3 sm:py-3 text-left transition-colors cursor-pointer rounded-full border border-[var(--color-red)] ${
                  isOpen
                    ? "bg-[var(--color-red)] text-[var(--color-white)]"
                    : "bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-blue-800"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-5">
                  <Image
                    src={dualUSB}
                    alt={cat.name}
                    width={12}
                    height={12}
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                  <span className="font-medium text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">
                    {cat.name}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </button>

              {/* Subcategories */}
              {isOpen && cat.subCategories && (
                <div className="mt-[-4px] z-10 mx-2 sm:mx-4 p-2 sm:p-4 rounded-b-lg border border-[var(--color-red)] border-t-0 space-y-2 sm:space-y-3 bg-[var(--color-light-gray)]">
                  {cat.subCategories.map((sub, sIdx) => {
                    const isSubOpen = openSub === sub.name;
                    return (
                      <div key={sIdx}>
                        {/* Subcategory Button - Responsive */}
                        <button
                          onClick={() => toggleSub(sub.name)}
                          className={`w-full flex justify-between items-center px-3 sm:px-5 py-3 max-h-10 sm:max-h-12 rounded-full transition-colors cursor-pointer ${
                            isSubOpen
                              ? "bg-[var(--color-red)] text-[var(--color-white)]"
                              : "bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-blue-800"
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-5">
                            <Image
                              src={dualUSB}
                              alt={sub.name}
                              width={12}
                              height={12}
                              className="w-3 h-3 sm:w-4 sm:h-4"
                            />
                            <span className="font-medium text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
                              {sub.name}
                            </span>
                          </div>
                          {isSubOpen ? (
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          ) : (
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                        </button>

                        {/* Products */}
                        {isSubOpen && (
                          <>
                            <div className="mb-2 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 px-1 sm:px-2">
                              <div>
                                <p className="text-center text-xs sm:text-sm text-[var(--color-black)] my-2 sm:my-5 transition-all duration-300">
                                  {isExpanded
                                    ? text
                                    : `${text.slice(0, 150)}...`}
                                  {text.length > 150 && (
                                    <button
                                      onClick={() => setIsExpanded(!isExpanded)}
                                      className="ml-1 text-[var(--color-black)] text-xs sm:text-sm font-bold underline cursor-pointer hover:underline"
                                    >
                                      {isExpanded
                                        ? "Read less"
                                        : "Read more..."}
                                    </button>
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Product Grid - Responsive */}
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
                                            ? "bg-green-500 text-white"
                                            : p.tag === "HOT"
                                            ? "bg-orange-500 text-white"
                                            : p.tag === "BUY 5 GET 2 FREE"
                                            ? "bg-blue-500 text-white"
                                            : p.tag === "SOLD OUT"
                                            ? "bg-red-500 text-white"
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
                                  <p className="text-xs sm:text-sm font-medium">
                                    {p.name}
                                  </p>
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
                                              handleQuantityChange(
                                                idx,
                                                quantities[idx] - 1
                                              );
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
                                              handleQuantityChange(
                                                idx,
                                                quantities[idx] + 1
                                              );
                                            }}
                                          >
                                            +
                                          </button>
                                        </div>
                                        <button
                                          className="bg-[var(--color-red)] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ml-1 cursor-pointer hover:bg-red-700 transition-colors flex items-center justify-center gap-1 text-xs sm:text-[8px] md:text-[10px] lg:text-[8px] xl:text-[12px]"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(p, quantities[idx]);
                                          }}
                                        >
                                          <Cart className="h-4 w-4 sm:hidden" />
                                          <span className="hidden sm:inline">
                                            Add To Cart
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>
      {cart?.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 sm:p-4 z-50">
          <div className="max-w-7xl mx-auto flex flex-col">
            {/* Totals row - responsive */}
            <div className="flex justify-center items-center mb-2 sm:mb-3">
              <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-1">
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  Total:
                  <span className="font-bold text-[var(--color-blue)]">
                    £
                    {cart
                      .reduce(
                        (sum, item) => sum + item.product.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </span>
                <p className="text-sm sm:text-[16px] md:text-[20px] font-medium hidden sm:inline">
                  |
                </p>
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} Units
                </span>
                <p className="text-sm sm:text-[16px] md:text-[20px] font-medium hidden sm:inline">
                  |
                </p>
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  {cart.length} SKUs
                </span>
                <p className="text-sm sm:text-[16px] md:text-[20px] font-medium hidden sm:inline">
                  |
                </p>
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  Elite Rewards:
                  <span className="font-bold text-[var(--color-red)]">
                    £
                    {(
                      cart.reduce(
                        (sum, item) => sum + item.product.price * item.quantity,
                        0
                      ) * 0.1
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            {/* View Cart button - responsive */}
            <button
              className="bg-[var(--color-red)] text-white w-[90%] sm:w-[75%] px-4 py-1 sm:px-6 sm:py-2 rounded-full hover:bg-red-700 transition-colors text-xs sm:text-sm md:text-base mx-auto cursor-pointer"
              onClick={() => {
                console.log("View Cart clicked", cart);
              }}
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </PrivateLayout>
  );
}
