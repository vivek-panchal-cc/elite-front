import OfferCard from "@/components/cards/OfferCard";
import { ProductOfferCard } from "@/components/cards/ProductOfferCard";
import { bestWeekImg, images, noProduct } from "@/components/images";
import LoaderTopCategory from "@/components/loaders/LoaderTopCategory";
import LoaderTopProduct from "@/components/loaders/LoaderTopProducts";
import WrapAmount from "@/components/wrapper/WrapAmount";
import useTopCategories from "@/hooks/useTopCategories";
import useTopProductsList from "@/hooks/useTopProductsList";
import { homepageLabels } from "@/lib/labels";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
const imageCategoryBaseUrl = process.env.NEXT_PUBLIC_CATEGORY_IMAGE_URL || "";

const LatestOffer = () => {
  const [loading, topProductList, reload] = useTopProductsList();
  const [loadingTopCategory, topCategoryList, reloadTopCategory] =
    useTopCategories();
  const router = useRouter();

  return (
    <div className="py-10 sm:pb-15 px-4 sm:px-5 md:px-8 lg:px-[60px] bg-[var(--color-white)] rounded-tl-[40px] rounded-tr-[40px] lg:rounded-tl-[80px] lg:rounded-tr-[80px] mt-[-80px] relative shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-7xl">
        <h4 className="font-bold text-[22px] mb-3 leading-[22px]">
          {homepageLabels.topProductList.popularOffer}
        </h4>
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-[462px_1fr]">
          <ProductOfferCard />
          <div className="grid gap-3">
            {/* First row: two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[287px]">
              <OfferCard />
              <div>
                <h5 className="font-bold text-[18px] mb-2 leading-[22px]">
                  {homepageLabels.topProductList.topCategories}
                </h5>
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-y-3 gap-x-3 justify-items-center">
                  {loadingTopCategory ? (
                    [...Array(6)].map((_, idx) => (
                      <div
                        key={idx}
                        className="text-center flex items-center flex-col"
                      >
                        <LoaderTopCategory />
                      </div>
                    ))
                  ) : topCategoryList && topCategoryList.length > 0 ? (
                    topCategoryList.slice(0, 6).map((item) => (
                      <div
                        key={item.cat_id}
                        className="text-center flex items-center flex-col"
                      >
                        <div className="relative bg-[var(--color-smooth-gray)] h-[90px] w-[90px] lg:h-[70px] lg:w-[70px] xl:h-[90px] xl:w-[90px] rounded-[100%] flex items-center justify-center">
                          <Image
                            alt="offer"
                            className="w-auto"
                            src={
                              item.cat_image
                                ? `${imageCategoryBaseUrl}${item.cat_image}`
                                : bestWeekImg
                            }
                            height={50}
                            width={50}
                          />
                        </div>
                        <p className="text-[12px] lg:text-[9px] xl:text-[12px] font-semibold mt-1 text-center break-words w-[90px]">
                          {item.cat_name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 flex justify-center">
                      <p className="text-sm text-gray-500 mt-4">
                        {homepageLabels.topProductList.noCatFound}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Second row: one column, full width */}
            <div className="mt-6 lg:mt-0 p-3 w-full rounded-[14px] bg-[#E9E9E9]">
              {/* Header */}
              <div className="relative flex items-center justify-center">
                <p className="text-center text-[12px] font-bold">
                  {homepageLabels.topProductList.bestPick}
                </p>
                {!loading && topProductList.length > 0 && (
                  <button
                    className="absolute right-0 text-[8px] font-medium text-[var(--color-black)] underline hover:text-[var(--color-red)] leading-[22px] cursor-pointer"
                    onClick={() => router.push("/order")}
                  >
                    {homepageLabels.topProductList.viewMore}
                  </button>
                )}
              </div>

              {/* Products */}
              <div className="mt-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {loading ? (
                  [...Array(4)].map((_, idx) => (
                    <div key={idx} className="rounded-[10px] p-2">
                      <LoaderTopProduct />
                    </div>
                  ))
                ) : topProductList && topProductList.length > 0 ? (
                  topProductList.slice(0, 4).map((product) => (
                    <div
                      key={product.prod_id}
                      className="flex items-center gap-2 rounded-[10px] p-2"
                      title={product.prod_name || product.prod_long_name}
                    >
                      <div className="relative min-h-[60px] min-w-[60px] rounded-[10px] bg-[var(--color-white)] flex items-center justify-center">
                        <Image
                          src={
                            product.prod_image
                              ? `${imageBaseUrl}/medium/${product.prod_image}`
                              : bestWeekImg
                          }
                          alt="product"
                          fill
                          className="object-contain rounded p-4"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] truncate leading-[22px]">
                          {product.prod_name || product.prod_long_name}
                        </p>
                        <p className="text-[12px] truncate text-[var(--color-red)]">
                          <WrapAmount value={product.prod_original_price} />
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-6 flex justify-center">
                    <p className="text-sm text-gray-500 mt-4">
                      {homepageLabels.topProductList.noMatchFound}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestOffer;
