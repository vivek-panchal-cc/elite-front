import { noProduct, outOfStock } from "@/components/images";
import Cart from "@/components/images/svgs/Cart";
import Eye from "@/components/images/svgs/Eye";
import FilledHeart from "@/components/images/svgs/FilledHeart";
import Fire from "@/components/images/svgs/Fire";
import Heart from "@/components/images/svgs/Heart";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { cartLabels } from "@/lib/labels";
import Image from "next/image";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

const ProductCard = ({
  p,
  idx,
  selectedProduct,
  setSelectedProduct,
  quantities,
  handleQuantityChange,
  addToCart,
  addOrRemoveFavourite,
}: any) => {
  const step = p.box_size && p.box_size > 0 ? p.box_size : 1;
  return (
    <div
      className={`rounded-lg p-2 sm:p-4 flex flex-col items-center text-center relative cursor-pointer ${
        selectedProduct === idx
          ? "ring-1 sm:ring-2 ring-[var(--color-red)]"
          : ""
      }`}
      // onClick={() => setSelectedProduct(idx)}
      onMouseEnter={() => setSelectedProduct(idx)}
      onMouseLeave={() => setSelectedProduct(null)}
    >
      {/* Product Image + Info */}
      <div className="relative mb-1 sm:mb-2">
        <div className="relative mb-1 sm:mb-2 w-full">
          <div
            className={`h-24 w-24 sm:h-32 sm:w-32 md:h-30 md:w-30 lg:h-40 lg:w-40 rounded-md overflow-hidden ${
              selectedProduct !== idx
                ? "border border-[var(--color-orange)]"
                : ""
            }`}
          >
            <Image
              // src={`${imageBaseUrl}/medium/${p.prod_image}` || noProduct}
              src={
                p.gcerp_product_status
                  ? p.prod_image
                    ? `${imageBaseUrl}/medium/${p.prod_image}`
                    : noProduct
                  : outOfStock
              }
              alt={p.prod_name || p.prod_long_name}
              fill
              className="object-contain rounded p-4"
            />
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
                {p.tag === "HOT" && <Fire className="w-3 h-3 sm:w-4 sm:h-4" />}{" "}
                {p.tag}
              </span>
            )}
          </div>
        </div>
        <div className="px-2 max-w-24 sm:max-w-32 md:max-w-30 lg:max-w-40">
          <p className="text-xs sm:text-sm font-medium">
            {p.prod_name || p.prod_long_name}
          </p>
          {p.cat_name && (
            <p className="text-[10px] sm:text-xs text-gray-500">{p.cat_name}</p>
          )}
        </div>
      </div>

      {/* Price + Icons */}
      <div className="w-full font-bold text-[var(--color-red)] px-1">
        <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-1 sm:gap-2">
            {selectedProduct === idx ? (
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            ) : null}
          </div>
          <span className="text-base sm:text-lg md:text-[19px]">
            <WrapAmount value={p.prod_original_price} />
          </span>
          <div className="flex items-center gap-1 sm:gap-2">
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
        <div className="w-full mt-1 sm:mt-2 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between w-full">
            <div className="relative w-full h-5 items-center overflow-hidden lg:h-auto lg:overflow-visible">
              {/* --- Mobile & Tablet Transition Counter --- */}
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
