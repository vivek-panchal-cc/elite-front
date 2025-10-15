"use client";

import Image from "next/image";
import PrivateLayout from "../PrivateLayout";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/ButtonUI";
import { searchIcon } from "@/components/images";
import { CURRENCY_SYMBOL } from "@/lib/constants/all";
import useCategoryTypeList, { TCategory } from "@/hooks/useCategoryType";
import LoaderCategory from "@/components/loaders/LoaderCategory";
import LoaderProduct from "@/components/loaders/LoaderProduct";
import { cartLabels, commonLabels } from "@/lib/labels";
import useProductList from "@/hooks/useProductList";
import {
  Product,
  Category,
  SubCategory,
  CartItem,
  ProductAddToBasketParams,
} from "@/types/product";
import ProductCard from "./(section)/ProductCard";
import { Input } from "@/components/ui/Input";
import useAddOrRemoveFavourite from "@/hooks/useAddOrRemoveFavourite";
import { useBasket } from "@/components/context/BasketContext";
import { useRouter } from "next/navigation";
import useCartItems from "@/hooks/useCartItems";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";
import FreeProductsModal from "@/components/pages/FreeProductsModal";
import WrapAmount from "@/components/wrapper/WrapAmount";
import useCartSummary from "@/hooks/useCartSummary";

export default function Orders() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const { addToBasketHandler, handleProductDetails } = useBasket();
  const { reloadCart } = useCartItems();
  const { cartSummary, reloadCartSummary } = useCartSummary();
  const [loading, categories] = useCategoryTypeList({ title: searchText });
  const [catId, setCatId] = useState<number | null>(null);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProductLoading, products] = useProductList({
    cat_type_id: catId ?? undefined,
    title: searchText.trim(),
  });
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [visibleProducts, setVisibleProducts] = useState<any>(null);
  const { addOrRemoveFavourite } = useAddOrRemoveFavourite();
  const [favourites, setFavourites] = useState<Record<number, boolean>>({});
  const [freeProductsModal, setFreeProductsModal] = useState<boolean>(false);
  const [freeProductsData, setFreeProductsData] = useState<any[]>([]);
  const [freeProductsQueue, setFreeProductsQueue] = useState<any[]>([]);
  const [currentFreeIndex, setCurrentFreeIndex] = useState<number>(0);
  const [pendingUpdate, setPendingUpdate] = useState<any>(null);
  const text: string = "";

  useEffect(() => {
    setVisibleProducts(products);
  }, [products]);

  // ------------------- Initialize quantities from products -------------------
  useEffect(() => {
    if (!products) return;

    const initialQuantities: Record<number, number> = {};

    // Direct products
    if (Array.isArray(products.productList)) {
      products.productList.forEach((p: Product) => {
        initialQuantities[p.prod_id] = p.basket_quantity ?? 0;
      });
    }

    // Subcategory products
    if (Array.isArray(products.category)) {
      products.category.forEach((cat: any) => {
        if (Array.isArray(cat.productList)) {
          cat.productList.forEach((p: Product) => {
            initialQuantities[p.prod_id] = p.basket_quantity ?? 0;
          });
        }
      });
    }

    setQuantities(initialQuantities);
  }, [products]);

  const subCategories =
    products && Array.isArray(products.category) && products.category.length > 0
      ? products.category
          .filter((cat: any) => cat.is_product === 1)
          .map((cat: any) => ({
            cat_id: cat.cat_id,
            cat_name: cat.cat_name,
            is_product: cat.is_product,
            productList: Array.isArray(cat.productList) ? cat.productList : [],
          }))
      : [];

  const directProducts =
    products && Array.isArray(products.productList) ? products.productList : [];

  const mainCategories: Category[] =
    categories
      ?.filter((cat) => cat.product_count !== "0")
      .map((cat: TCategory) => ({
        cat_id: cat.cat_type_id,
        cat_name: cat.cat_type_name,
        icon: "/icons/default.png",
      })) || [];

  const toggleMain = (id: number) => {
    setOpenSub(null);
    if (catId === id) {
      setCatId(null);
      setVisibleProducts(null); // clear when closing
    } else {
      setCatId(id);
      setVisibleProducts(null); // clear immediately so old list doesn't show
    }
  };

  // const toggleMain = (id: number) => {
  //   setOpenSub(null);
  //   setCatId((prev) => {
  //     if (prev === id) {
  //       return null;
  //     } else {
  //       setTimeout(() => setCatId(id), 800);
  //       return prev;
  //     }
  //   });
  // };

  // const toggleMain = (id: number) => {
  //   setOpenSub(null);
  //   setCatId((prev) => {
  //     if (prev === id) {
  //       return null;
  //     } else {
  //       setCatId(id);
  //       setTimeout(() => {}, 800);
  //       return prev;
  //     }
  //   });
  // };

  const toggleSub = (id: number) => {
    setOpenSub((prev) => (prev === id ? null : id));
  };

  // const handleQuantityChange = (prodId: number, newQuantity: number) => {
  //   if (newQuantity < 0) return;
  //   setQuantities((prev) => ({ ...prev, [prodId]: newQuantity }));
  // };

  const handleQuantityChange = async (
    prodId: number,
    newQuantity: number,
    sku: string
  ) => {
    if (newQuantity < 0) return;
    let response: any = null;

    if (newQuantity === 0) {
      response = await addToBasketHandler({
        prod_id: prodId,
        action: "product-remove",
        quantity: 0,
        only_free_prod: 0,
        prod_sku: sku,
      });
    } else if (newQuantity > (quantities[prodId] || 0)) {
      response = await addToBasketHandler({
        prod_id: prodId,
        action: "add",
        flag: "add",
        quantity: newQuantity,
        prod_sku: sku,
      });
    } else {
      response = await addToBasketHandler({
        prod_id: prodId,
        action: "add",
        flag: "remove",
        quantity: newQuantity,
        prod_sku: sku,
      });
    }
    if (response?.success && response.statusCode === 200) {
      if (response?.data?.length > 0) {
        setFreeProductsData(response.data);
        setFreeProductsQueue(response.data);
        setCurrentFreeIndex(0);
        setPendingUpdate({ prodId, newQuantity });
      } else {
        setQuantities((prev: any) => ({ ...prev, [prodId]: newQuantity }));

        const product =
          directProducts.find((p: Product) => p.prod_id === prodId) ||
          subCategories
            .flatMap((cat) => cat.productList)
            .find((p: Product) => p.prod_id === prodId);

        if (product) {
          setCart((prevCart) => {
            if (newQuantity === 0) {
              return prevCart.filter((item) => item.product.prod_id !== prodId);
            }

            const existingItem = prevCart.find(
              (item) => item.product.prod_id === prodId
            );
            if (existingItem) {
              return prevCart.map((item) =>
                item.product.prod_id === prodId
                  ? { ...item, quantity: newQuantity }
                  : item
              );
            } else {
              return [...prevCart, { product, quantity: newQuantity }];
            }
          });
        }
        if (reloadCart) await reloadCart();
        if (reloadCartSummary) await reloadCartSummary();
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

        // apply pending update only once when queue ends
        if (pendingUpdate) {
          const { prodId, newQuantity } = pendingUpdate;
          setQuantities((prev: any) => ({ ...prev, [prodId]: newQuantity }));
          setPendingUpdate(null);
          if (reloadCart) await reloadCart();
          if (reloadCartSummary) await reloadCartSummary();
        }
      }
    } else {
      toast.warning(response.message);
    }
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

  const handleFavourite = async (prodId: number, action: "add" | "remove") => {
    setFavourites((prev) => ({
      ...prev,
      [prodId]: action === "add",
    }));

    try {
      await addOrRemoveFavourite(prodId, action);
    } catch (err) {
      console.error("Failed to update favourite:", err);
    }
  };

  // useEffect(() => {
  //   setSelectedProduct(null);
  // }, [catId]);

  return (
    // <PrivateLayout>
    <div className="max-w-7xl mx-auto w-full">
      <div className="items-center px-[40px] sm:px-[20px] md:px-[30px] lg:px-[60px]">
        <div className="flex-1 space-y-4 py-10">
          {/* Search Bar - Responsive */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex w-full border rounded-full overflow-hidden group border-[var(--color-red)]">
              <Input
                type="text"
                placeholder="Start Typing To Filter Products..."
                className="rounded-r-none text-[12px] sm:text-[14px] bg-[var(--color-light-gray)] w-full p-[20px] sm:px-[40px] h-[55px] focus-visible:border-none focus-visible:ring-ring/0 focus-visible:ring-0 leading-[22px] font-medium"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button className="rounded-[50px] text-[12px] sm:text-[14px] ml-[-20px] min-w-[83px] max-w-[100px] h-[55px] sm:min-w-[148px] sm:max-w-[200px] sm:h-[55px] hover:bg-[var(--color-blue)] border border-[var(--color-red)] cursor-auto">
                <Image
                  src={searchIcon}
                  alt="search"
                  className="h-[25px] w-[25px] sm:h-[31px] sm:w-[31px]"
                />
              </Button>
            </div>
          </div>

          {/* Main Categories */}
          <section className="space-y-4 sm:space-y-5">
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
                      className={`relative z-10 flex justify-between items-center w-full min-h-[55px] px-5 sm:px-5 py-3 sm:py-3 text-left transition-colors cursor-pointer rounded-full border border-[var(--color-red)] ${
                        isOpen
                          ? "bg-[var(--color-red)] text-[var(--color-white)]"
                          : "bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-[var(--color-red)]"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-8">
                        <span className="font-medium text-[14px] sm:text-[14px] truncate max-w-[180px] sm:max-w-none leading-[22px]">
                          {cat.cat_name}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>

                    {/* Subcategories / Products */}
                    {isOpen && (
                      <div className="mt-[-8px] z-9 mx-2 sm:mx-4 pt-6 pb-8 sm:pt-8 sm:pb-10 px-3 sm:px-10 rounded-b-2xl sm:rounded-b-2xl border border-[var(--color-red)] border-t-0 space-y-3 sm:space-y-3 bg-[var(--color-light-gray)]">
                        {isProductLoading ? (
                          <LoaderProduct count={5} />
                        ) : !visibleProducts ||
                          (!subCategories.length && !directProducts.length) ? (
                          <p className="text-center text-gray-500">
                            {commonLabels.notFound}
                          </p>
                        ) : subCategories.length > 0 ? (
                          subCategories.map((sub, sIdx) => {
                            const isSubOpen = openSub === sub.cat_id;
                            return (
                              <div key={sub.cat_id}>
                                {/* Subcategory Button */}
                                <button
                                  onClick={() => toggleSub(sub.cat_id)}
                                  className={`w-full flex justify-between items-center min-h-[55px] px-5 sm:px-5 py-3 max-h-10 sm:max-h-12 rounded-full transition-colors border border-[var(--color-red)] cursor-pointer ${
                                    isSubOpen
                                      ? "bg-[var(--color-red)] text-[var(--color-white)]"
                                      : "bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-[var(--color-red)]"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-8">
                                    <span className="font-medium text-[14px] sm:text-[14px] truncate max-w-[150px] sm:max-w-none leading-[22px]">
                                      {sub.cat_name}
                                    </span>
                                  </div>
                                  {isSubOpen ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
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
                                                  text?.length > 150
                                                    ? "..."
                                                    : ""
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
                                    <div className="pt-2 mt-2 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 max-[425px]:grid-cols-1">
                                      {sub.productList.map(
                                        (p: Product, idx: number) => (
                                          <ProductCard
                                            key={p.prod_id}
                                            p={{
                                              ...p,
                                              is_favorite:
                                                favourites[p.prod_id] ??
                                                p.is_favorite,
                                            }}
                                            idx={idx}
                                            selectedProduct={selectedProduct}
                                            setSelectedProduct={
                                              setSelectedProduct
                                            }
                                            quantities={quantities}
                                            handleQuantityChange={
                                              handleQuantityChange
                                            }
                                            addToCart={addToCart}
                                            addOrRemoveFavourite={
                                              handleFavourite
                                            }
                                            showDetails={handleProductDetails}
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
                          <div className="mt-2 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 max-[425px]:grid-cols-1">
                            {directProducts.map((p: Product, idx: number) => (
                              <ProductCard
                                key={p.prod_id}
                                p={{
                                  ...p,
                                  is_favorite:
                                    favourites[p.prod_id] ?? p.is_favorite,
                                }}
                                idx={idx}
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                                quantities={quantities}
                                handleQuantityChange={handleQuantityChange}
                                addToCart={addToCart}
                                addOrRemoveFavourite={handleFavourite}
                                showDetails={handleProductDetails}
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

          {/* Bottom Cart */}
          {cart?.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-white)] shadow-lg border-t-[2px] border-[var(--color-red)] p-3 sm:p-4 z-11">
              <div className="max-w-7xl mx-auto flex flex-col">
                <div className="flex justify-center items-center mb-2 sm:mb-3">
                  <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-1">
                    <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                      {cartLabels.total} :{" "}
                      <span className="font-bold text-[var(--color-blue)]">
                        <WrapAmount value={Number(cartSummary?.sub_total)} />
                        {/* {CURRENCY_SYMBOL}
                        {cart
                          .reduce(
                            (sum, item) =>
                              sum +
                              item.product.prod_original_price * item.quantity,
                            0
                          )
                          .toFixed(2)} */}
                      </span>
                    </span>
                    <p className="text-sm sm:text-[16px] md:text-[20px] font-medium sm:inline">
                      |
                    </p>
                    <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                      {/* {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "} */}
                      {cartSummary?.units} {cartLabels.units}
                    </span>
                    <p className="text-sm sm:text-[16px] md:text-[20px] font-medium sm:inline">
                      |
                    </p>
                    <span className="text-sm sm:text-[16px] md:text-[20px] font-medium">
                      {/* {cart.length} */}
                      {cartSummary?.quantity} {cartLabels.skus}
                    </span>
                    {/* <p className="text-sm sm:text-[16px] md:text-[20px] font-medium sm:inline">
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
                    </span> */}
                  </div>
                </div>

                <button
                  className="h-[30px] sm:h-[36px] bg-[var(--color-red)] text-[var(--color-white)] w-[90%] sm:w-[75%] px-4 py-1 sm:px-6 sm:py-2 rounded-full hover:bg-red-700 transition-colors text-[12px] sm:text-[14px] mx-auto font-semibold leading-[14px] cursor-pointer"
                  onClick={() => router.push("/cart")}
                >
                  {commonLabels.viewCart}
                </button>
              </div>
            </div>
          )}
          {freeProductsQueue.length > 0 && (
            <Modal
              isOpen={true}
              onClose={() => handleCloseFreeModal()}
              classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] max-w-[516px]"
              isClose={false}
            >
              <FreeProductsModal
                setModalClose={handleCloseFreeModal}
                products={freeProductsQueue[currentFreeIndex]}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
    // </PrivateLayout>
  );
}
