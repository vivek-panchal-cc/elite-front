import { noProduct, outOfStock } from "@/components/images";
import Cart from "@/components/images/svgs/Cart";
import Eye from "@/components/images/svgs/Eye";
import FilledHeart from "@/components/images/svgs/FilledHeart";
import Fire from "@/components/images/svgs/Fire";
import Heart from "@/components/images/svgs/Heart";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { cartLabels } from "@/lib/labels";
import { Product } from "@/types/product";
import Image from "next/image";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

interface ProductCardProps {
  p: Product;
  idx: number;
  selectedProduct: any;
  setSelectedProduct: any;
  quantities: any;
  handleQuantityChange: any;
  addToCart: any;
  addOrRemoveFavourite: any;
  showDetails: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  p,
  idx,
  selectedProduct,
  setSelectedProduct,
  quantities,
  handleQuantityChange,
  addToCart,
  addOrRemoveFavourite,
  showDetails,
}) => {
  const step = p.box_size && p.box_size > 0 ? p.box_size : 1;
  const tag =
    Array.isArray(p.free_product_disc) && p.free_product_disc.length > 0
      ? p.free_product_disc[0].disc_display_name || p.free_product_disc[0].tag
      : p.tag;
  return (
    <div
      className={`rounded-lg p-2 sm:p-4 flex flex-col items-center text-center relative cursor-pointer ${
        selectedProduct === idx
          // ? "ring-1 sm:ring-2 ring-[var(--color-red)] bg-[var(--color-white)]"
          ? "ring-0 sm:ring-2 ring-[var(--color-red)] sm:bg-[var(--color-white)]"
          : ""
      }`}
      // onClick={() => setSelectedProduct(idx)}
      onMouseEnter={() => setSelectedProduct(idx)}
      onMouseLeave={() => setSelectedProduct(null)}
    >
      {/* Product Image + Info */}
      <div className="relative mb-1 sm:mb-1">
        <div className="relative mb-2 sm:mb-4 w-full">
          <div
            // h-24 w-24 sm:h-32 sm:w-32 md:h-30 md:w-30 lg:h-40 lg:w-40
            className={`h-35 w-35 sm:h-35 sm:w-35 md:h-35 md:w-35 lg:h-35 lg:w-35 xl:h-40 xl:w-40 rounded-md overflow-hidden relative ${
              selectedProduct !== idx
                ? "border border-[var(--color-orange)]"
                : "border border-[var(--color-orange)] sm:border sm:border-[#dcdcdc] sm:bg-[var(--color-soft-white)]"
            }`}
          >
            <Image
              src={
                p.prod_image
                  ? `${imageBaseUrl}/medium/${p.prod_image}`
                  : noProduct
              }
              alt={p.prod_name || p.prod_long_name}
              fill
              className="object-contain rounded p-4"
            />
            {!p.gcerp_product_status && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-black)]/30">
                <Image
                  src={outOfStock}
                  alt="Out of Stock"
                  width={80}
                  height={80}
                  className="h-[80px] w-[80px] sm:w-[100px] md:h-[100px] object-contain"
                />
              </div>
            )}
            {/* <div className="sm:hidden w-full mt-1 sm:mt-2 space-y-1 sm:space-y-2"> */}
            <div className="sm:hidden absolute bottom-0 left-0 w-full p-2 space-y-1 sm:space-y-2">
              <div className="flex items-center justify-between w-full gap-2">
                <div className="relative w-full h-5 items-center overflow-hidden lg:h-auto lg:overflow-visible">
                  <button
                    className={`absolute left-0 w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] text-sm cursor-pointer transition-all duration-300 ease-in-out lg:hidden ${
                      (quantities[p.prod_id] || 0) === 0
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90 pointer-events-none"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newQty = (quantities[p.prod_id] || 0) + step;
                      handleQuantityChange(
                        p.prod_id,
                        Math.max(newQty, 0),
                        p.prod_sku
                      );
                    }}
                    disabled={!p.gcerp_product_status}
                  >
                    +
                  </button>

                  <div
                    className={`absolute left-0 flex w-full items-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] h-5 sm:h-5 transition-all duration-300 ease-in-out overflow-hidden lg:hidden ${
                      (quantities[p.prod_id] || 0) > 0
                        ? "opacity-100 px-1 scale-x-100"
                        : "opacity-0 px-0 scale-x-0 pointer-events-none"
                    }`}
                    style={{ transformOrigin: "left" }}
                  >
                    <button
                      className="w-1/3 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newQty = (quantities[p.prod_id] || 0) - step;
                        handleQuantityChange(
                          p.prod_id,
                          Math.max(newQty, 0),
                          p.prod_sku
                        );
                      }}
                      disabled={
                        !p.gcerp_product_status ||
                        (quantities[p.prod_id] || 0) <= 0
                      }
                    >
                      -
                    </button>
                    <span className="w-1/3 px-0 text-[10px] sm:text-xs text-center">
                      {quantities[p.prod_id] || 0}
                    </span>
                    <button
                      className="w-1/3 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newQty = (quantities[p.prod_id] || 0) + step;
                        handleQuantityChange(p.prod_id, newQty, p.prod_sku);
                      }}
                      disabled={!p.gcerp_product_status}
                    >
                      +
                    </button>
                  </div>

                  {/* --- Desktop Version (No Transition) --- */}
                  <div className="hidden lg:flex items-center border rounded-full px-1 bg-transparent">
                    <button
                      className="w-1/3 h-6 flex items-center justify-center cursor-pointer lg:border-r text-[#888888]"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newQty = (quantities[p.prod_id] || 0) - step;
                        handleQuantityChange(
                          p.prod_id,
                          Math.max(newQty, 0),
                          p.prod_sku
                        );
                      }}
                      disabled={
                        !p.gcerp_product_status ||
                        (quantities[p.prod_id] || 0) <= 0
                      }
                    >
                      -
                    </button>
                    <span className="w-1/3 px-0 text-sm text-center text-[var(--color-black)]">
                      {quantities[p.prod_id] || 0}
                    </span>
                    <button
                      className="w-1/3 h-6 flex items-center justify-center cursor-pointer lg:border-l text-[#888888]"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newQty = (quantities[p.prod_id] || 0) + step;
                        handleQuantityChange(p.prod_id, newQty, p.prod_sku);
                      }}
                      disabled={!p.gcerp_product_status}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 z-10">
                  <>
                    {p.is_favorite ? (
                      <FilledHeart
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-red)] cursor-pointer"
                        fill=""
                        onClick={() =>
                          addOrRemoveFavourite(p.prod_id, "remove")
                        }
                      />
                    ) : (
                      <Heart
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-red)] cursor-pointer"
                        onClick={() => addOrRemoveFavourite(p.prod_id, "add")}
                      />
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
          {tag && (
            <span
              title={tag.toUpperCase()}
              className={`absolute flex items-center gap-1 px-2 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[10px] font-semibold rounded-full max-w-[110px] truncate uppercase ${(() => {
                const styles: Record<string, string> = {
                  HOT: "bg-[var(--color-orange)] text-[var(--color-white)]",
                  "25%": "bg-[var(--color-green)] text-[var(--color-white)]",
                  "SOLD OUT": "bg-[var(--color-red)] text-[var(--color-white)]",
                };

                return (
                  styles[tag] ||
                  "bg-[var(--color-light-blue)] text-[var(--color-white)]"
                );
              })()} ${
                selectedProduct === idx
                  ? // ? "-top-5 sm:-top-7 left-0"
                    "-top-2 sm:-top-7 left-3 sm:left-0"
                  : "-top-2 sm:-top-3 left-3 sm:left-3"
                // : "-top-2 sm:-top-3 left-2 sm:left-3"
              }`}
            >
              {tag === "HOT" && <Fire className="w-3 h-3 sm:w-4 sm:h-4" />}
              {tag.length > 18 ? tag.slice(0, 18) + "..." : tag}
            </span>
          )}
        </div>
        <div className="px-2 max-w-35 sm:max-w-35 md:max-w-35 lg:max-w-35 xl:max-w-40">
          <p className="text-[12px] sm:text-sm font-semibold leading-[21px] sm:leading-[25px]">
            {p.prod_name || p.prod_long_name}
          </p>
          {p.cat_name && (
            <p className="text-[9px] sm:text-[10px] text-[var(--color-black)] opacity-50 font-semibold leading-[20px] sm:leading-[25px]">
              {p.cat_name}
            </p>
          )}
        </div>
      </div>

      {/* Price + Icons */}
      <div className="w-full font-bold text-[var(--color-red)] px-1">
        <div className="flex justify-center sm:justify-between items-center text-xs sm:text-sm font-medium">
          <div
            className="hidden sm:flex items-center gap-1 sm:gap-2"
            onClick={() => showDetails(p)}
          >
            {selectedProduct === idx ? (
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            ) : null}
          </div>
          <span
            className={`text-[16px] sm:text-[19px] leading-[25px] sm:leading-[30px] font-medium ${
              selectedProduct === idx
                ? "sm:text-[16px] sm:font-bold sm:leading-[30px]"
                : ""
            }`}
          >
            <WrapAmount value={p.prod_original_price} />
          </span>
          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            {selectedProduct === idx ? (
              <>
                {p.is_favorite ? (
                  <FilledHeart
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-red)] cursor-pointer"
                    fill=""
                    onClick={() => addOrRemoveFavourite(p.prod_id, "remove")}
                  />
                ) : (
                  <Heart
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-red)] cursor-pointer"
                    onClick={() => addOrRemoveFavourite(p.prod_id, "add")}
                  />
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {selectedProduct === idx && (
        <div className="hidden sm:block w-full mt-1 sm:mt-2 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between w-full">
            {/* <div className="relative w-full h-5 items-center overflow-hidden lg:h-auto lg:overflow-visible"> */}
            <div className="relative w-full h-5 items-center overflow-hidden sm:h-auto sm:overflow-visible">
              {/* --- Mobile & Tablet Transition Counter --- */}
              {/* <button
                className={`absolute left-0 w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] text-sm cursor-pointer transition-all duration-300 ease-in-out lg:hidden ${
                  (quantities[p.prod_id] || 0) === 0
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 pointer-events-none"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  const newQty = (quantities[p.prod_id] || 0) + step;
                  handleQuantityChange(
                    p.prod_id,
                    Math.max(newQty, 0),
                    p.prod_sku
                  );
                }}
                disabled={!p.gcerp_product_status}
              >
                +
              </button> */}

              {/* <div
                className={`absolute left-0 flex w-full items-center rounded-full bg-[var(--color-red)] text-[var(--color-white)] h-5 sm:h-5 transition-all duration-300 ease-in-out overflow-hidden lg:hidden ${
                  (quantities[p.prod_id] || 0) > 0
                    ? "opacity-100 px-1 scale-x-100"
                    : "opacity-0 px-0 scale-x-0 pointer-events-none"
                }`}
                style={{ transformOrigin: "left" }}
              >
                <button
                  className="w-1/3 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newQty = (quantities[p.prod_id] || 0) - step;
                    handleQuantityChange(
                      p.prod_id,
                      Math.max(newQty, 0),
                      p.prod_sku
                    );
                  }}
                  disabled={
                    !p.gcerp_product_status || (quantities[p.prod_id] || 0) <= 0
                  }
                >
                  -
                </button>
                <span className="w-1/3 px-0 text-[10px] sm:text-xs text-center">
                  {quantities[p.prod_id] || 0}
                </span>
                <button
                  className="w-1/3 h-4 sm:h-5 flex items-center justify-center cursor-pointer text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newQty = (quantities[p.prod_id] || 0) + step;
                    handleQuantityChange(p.prod_id, newQty, p.prod_sku);
                  }}
                  disabled={!p.gcerp_product_status}
                >
                  +
                </button>
              </div> */}

              {/* --- Desktop Version (No Transition) --- */}
              <div className="hidden sm:flex items-center border rounded-full px-1 bg-transparent">
                <button
                  className="w-1/3 h-6 flex items-center justify-center cursor-pointer lg:border-r text-[#888888]"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newQty = (quantities[p.prod_id] || 0) - step;
                    handleQuantityChange(
                      p.prod_id,
                      Math.max(newQty, 0),
                      p.prod_sku
                    );
                  }}
                  disabled={
                    !p.gcerp_product_status || (quantities[p.prod_id] || 0) <= 0
                  }
                >
                  -
                </button>
                <span className="w-1/3 px-0 text-sm text-center text-[var(--color-black)]">
                  {quantities[p.prod_id] || 0}
                </span>
                <button
                  className="w-1/3 h-6 flex items-center justify-center cursor-pointer lg:border-l text-[#888888]"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newQty = (quantities[p.prod_id] || 0) + step;
                    handleQuantityChange(p.prod_id, newQty, p.prod_sku);
                  }}
                  disabled={!p.gcerp_product_status}
                >
                  +
                </button>
              </div>
            </div>

            {/* <button
              className={`bg-[var(--color-red)] text-[var(--color-white)] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ml-1 transition-colors flex items-center justify-center gap-1 text-xs sm:text-[8px] md:text-[10px] lg:text-[8px] xl:text-[12px] ${
                !quantities[p.prod_id] || quantities[p.prod_id] <= 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-[var(--color-red-hover)]"
              }`}
              disabled={
                !quantities[p.prod_id] ||
                quantities[p.prod_id] <= 0 ||
                !p.gcerp_product_status
              }
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p, quantities[p.prod_id]);
              }}
            >
              <Cart className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">{cartLabels.addToCart}</span>
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
