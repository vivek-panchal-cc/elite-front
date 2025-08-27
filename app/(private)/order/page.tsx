"use client";

import Image from "next/image";
import PrivateLayout from "../PrivateLayout";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import { dualUSB, searchIcon } from "@/components/images";
import { CURRENCY_SYMBOL } from "@/lib/constants/all";
import useCategoryTypeList, { TCategory } from "@/hooks/useCategoryType";
import LoaderCategory from "@/components/loaders/LoaderCategory";
import { cartLabels, commonLabels } from "@/lib/labels";
import useProductList from "@/hooks/useProductList";
import { Product, Category, SubCategory, CartItem } from "@/types/product";
import ProductCard from "./(section)/ProductCard";

export default function Orders() {
  const [searchText, setSearchText] = useState("");
  const [loading, categories] = useCategoryTypeList({ title: searchText });
  const [catId, setCatId] = useState<number | null>(null);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProductLoading, products, reloadProduct] = useProductList({
    cat_type_id: catId ?? undefined,
    title: searchText.trim(),
  });

  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [directProducts, setDirectProducts] = useState<any[]>([]);
  const text: string = "";

  useEffect(() => {
    if (products) {
      if (Array.isArray(products.category) && products.category.length > 0) {
        const categories = products.category
          .filter((cat: any) => cat.is_product === 1)
          .map((cat: any) => ({
            cat_id: cat.cat_id,
            cat_name: cat.cat_name,
            is_product: cat.is_product,
            productList: Array.isArray(cat.productList) ? cat.productList : [],
          }));
        setSubCategories(categories);
        setDirectProducts([]);
      } else if (Array.isArray(products.productList)) {
        setDirectProducts(products.productList);
        setSubCategories([]);
      } else {
        setSubCategories([]);
        setDirectProducts([]);
      }
    }
  }, [products]);

  const mainCategories: Category[] =
    categories
      ?.filter((cat) => cat.product_count !== "0")
      .map((cat: TCategory) => ({
        cat_id: cat.cat_type_id,
        cat_name: cat.cat_type_name,
        icon: "/icons/default.png",
      })) || [];

  const toggleMain = (id: number) => {
    setCatId((prev) => (prev === id ? null : id));
    setOpenSub(null);
  };

  const toggleSub = (id: number) => {
    setOpenSub((prev) => (prev === id ? null : id));
  };

  const handleQuantityChange = (prodId: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    setQuantities((prev) => ({ ...prev, [prodId]: newQuantity }));
  };

  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.prod_id === product.prod_id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.prod_id === product.prod_id
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-20px] min-w-[80px] max-w-[100px] h-[42px] hover:bg-[var(--color-blue)] cursor-auto">
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
        {loading ? (
          <LoaderCategory count={5} />
        ) : mainCategories.length <= 0 ? (
          <p className="text-center text-[var(--color-gray)] py-6">
            {commonLabels.notFound}
          </p>
        ) : (
          mainCategories.map((cat, idx) => {
            const isOpen = catId === cat.cat_id;

            return (
              <div key={cat.cat_id}>
                {/* Main Category Button - Responsive */}
                <button
                  onClick={() => toggleMain(cat.cat_id)}
                  className={`relative z-10 flex justify-between items-center w-full max-h-10 sm:max-h-12 px-3 sm:px-5 py-3 sm:py-3 text-left transition-colors cursor-pointer rounded-full border border-[var(--color-red)] ${
                    isOpen
                      ? "bg-[var(--color-red)] text-[var(--color-white)]"
                      : "bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-[var(--color-red)]"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-5">
                    {/* <Image
                      src={dualUSB}
                      alt={cat.cat_name}
                      width={12}
                      height={12}
                      // className="w-3 h-3 sm:w-4 sm:h-4"
                    /> */}
                    <span className="font-medium text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">
                      {cat.cat_name}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </button>

                {/* Subcategories */}
                {isOpen && (
                  <div className="mt-[-4px] z-9 mx-2 sm:mx-4 py-4 sm:py-4 px-3 sm:px-10 rounded-b-lg border border-[var(--color-red)] border-t-0 space-y-2 sm:space-y-3 bg-[var(--color-light-gray)]">
                    {isProductLoading ? (
                      <LoaderCategory count={5} />
                    ) : subCategories.length > 0 ? (
                      subCategories.map((sub, sIdx) => {
                        const isSubOpen = openSub === sub.cat_id;
                        return (
                          <div key={sub.cat_id}>
                            {/* Subcategory Button */}
                            <button
                              onClick={() => toggleSub(sub.cat_id)}
                              className={`w-full flex justify-between items-center px-3 sm:px-5 py-3 max-h-10 sm:max-h-12 rounded-full transition-colors border border-[var(--color-red)] cursor-pointer ${
                                isSubOpen
                                  ? "bg-[var(--color-red)] text-[var(--color-white)]"
                                  : "bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-[var(--color-red)]"
                              }`}
                            >
                              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-5">
                                {/* <Image
                                  src={dualUSB}
                                  alt={sub.cat_name}
                                  width={12}
                                  height={12}
                                /> */}
                                <span className="font-medium text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
                                  {sub.cat_name}
                                </span>
                              </div>
                              {isSubOpen ? (
                                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                              ) : (
                                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                              )}
                            </button>

                            {/* Products inside subcategory */}
                            {isSubOpen && (
                              <>
                                {text && (
                                  <div className="mb-2 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 px-1 sm:px-2">
                                    <div>
                                      <p className="text-center text-xs sm:text-sm text-[var(--color-black)] my-2 sm:my-5 transition-all duration-300">
                                        {isExpanded
                                          ? text
                                          : `${text.slice(0, 150)}${
                                              text?.length > 150 ? "..." : ""
                                            }`}
                                        {text.length > 150 && (
                                          <button
                                            onClick={() =>
                                              setIsExpanded(!isExpanded)
                                            }
                                            className="ml-1 text-[var(--color-black)] text-xs sm:text-sm font-bold cursor-pointer hover:underline"
                                          >
                                            {isExpanded
                                              ? "Read less"
                                              : "Read more..."}
                                          </button>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <div className="pt-2 mt-2 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                                  {sub.productList.map(
                                    (p: Product, idx: number) => (
                                      <ProductCard
                                        key={p.prod_id}
                                        p={p}
                                        idx={idx}
                                        selectedProduct={selectedProduct}
                                        setSelectedProduct={setSelectedProduct}
                                        quantities={quantities}
                                        handleQuantityChange={
                                          handleQuantityChange
                                        }
                                        addToCart={addToCart}
                                      />
                                    )
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })
                    ) : directProducts.length > 0 ? (
                      /* Direct products (no subcategories) */
                      <div className="mt-2 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                        {directProducts.map((p: Product, idx: number) => (
                          <ProductCard
                            key={p.prod_id}
                            p={p}
                            idx={idx}
                            selectedProduct={selectedProduct}
                            setSelectedProduct={setSelectedProduct}
                            quantities={quantities}
                            handleQuantityChange={handleQuantityChange}
                            addToCart={addToCart}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">
                        {commonLabels.notSubCategory}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
      {cart?.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-white)] shadow-lg border-t-[2px] border-[var(--color-red)] p-3 sm:p-4 z-11">
          <div className="max-w-7xl mx-auto flex flex-col">
            <div className="flex justify-center items-center mb-2 sm:mb-3">
              <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-1">
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  {cartLabels.total}:
                  <span className="font-bold text-[var(--color-blue)]">
                    {CURRENCY_SYMBOL}
                    {cart
                      .reduce(
                        (sum, item) =>
                          sum +
                          item.product.prod_original_price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </span>
                <p className="text-sm sm:text-[16px] md:text-[20px] font-medium hidden sm:inline">
                  |
                </p>
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  {cartLabels.units}
                </span>
                <p className="text-sm sm:text-[16px] md:text-[20px] font-medium hidden sm:inline">
                  |
                </p>
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  {cart.length} {cartLabels.skus}
                </span>
                <p className="text-sm sm:text-[16px] md:text-[20px] font-medium hidden sm:inline">
                  |
                </p>
                <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                  {cartLabels.eliteRewards}:
                  <span className="font-bold text-[var(--color-red)]">
                    {CURRENCY_SYMBOL}
                    {(
                      cart.reduce(
                        (sum, item) =>
                          sum +
                          item.product.prod_original_price * item.quantity,
                        0
                      ) * 0.1
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            <button
              className="bg-[var(--color-red)] text-[var(--color-white)] w-[90%] sm:w-[75%] px-4 py-1 sm:px-6 sm:py-2 rounded-full hover:bg-red-700 transition-colors text-xs sm:text-sm md:text-base mx-auto cursor-pointer"
              onClick={() => {
                console.log("View Cart clicked", cart);
              }}
            >
              {commonLabels.viewCart}
            </button>
          </div>
        </div>
      )}
    </PrivateLayout>
  );
}
