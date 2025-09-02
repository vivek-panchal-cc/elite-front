import OfferCard from "@/components/cards/OfferCard";
import { images, noProduct } from "@/components/images";
import LoaderTopProduct from "@/components/loaders/LoaderTopProducts";
import WrapAmount from "@/components/wrapper/WrapAmount";
import useTopProductsList from "@/hooks/useTopProductsList";
import { homepageLabels } from "@/lib/labels";
import Image from "next/image";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

const ProductOfferSlider = () => {
  return (
    <div
      className="rounded-[24px] flex justify-center text-white flex-col items-center"
      style={{
        background: "linear-gradient(180deg, #C297FF 0%, #8733FF 134.98%)",
      }}
    >
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="latest-offer-slider"
      >
        <SwiperSlide>
          <div className="h-full text-center flex flex-col items-center p-3">
            <p>{homepageLabels.topProductList.getCrystalPro}</p>
            <h3 className="font-bold text-[62px] leading-[1]">£20 + vat</h3>
            <Image
              alt="offer"
              className="h-[325px] w-auto"
              src={images.productOfferOne}
            ></Image>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full text-center flex flex-col items-center p-3">
            <p>{homepageLabels.topProductList.getCrystalPro}</p>
            <h3 className="font-bold text-[62px] leading-[1]">£20 + vat</h3>
            <Image
              alt="offer"
              className="h-[325px] w-auto"
              src={images.productOfferOne}
            ></Image>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full text-center flex flex-col items-center p-3">
            <p>{homepageLabels.topProductList.getCrystalPro}</p>
            <h3 className="font-bold text-[62px] leading-[1]">£20 + vat</h3>
            <Image
              alt="offer"
              className="h-[325px] w-auto"
              src={images.productOfferOne}
            ></Image>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const LatestOffer = () => {
  const [loading, topProductList, reload] = useTopProductsList();
  const categoriesProducts = [
    {
      image: images.mobile,
      title: "Mobile",
    },
    {
      image: images.simCard,
      title: "SIM Cards",
    },
    {
      image: images.vapeDevice,
      title: "Vape devices",
    },
    {
      image: images.laptop,
      title: "Laptops",
    },
    {
      image: images.voucher,
      title: "Vouchers",
    },
    {
      image: images.vapePod,
      title: "Vape Pods",
    },
  ];
  return (
    <div className="py-10 px-4 sm:px-5 md:px-8 lg:px-[60px] bg-white rounded-tl-[40px] rounded-tr-[40px] lg:rounded-tl-[80px] lg:rounded-tr-[80px] mt-[-80px] relative">
      <div className="mx-auto max-w-7xl">
        <h4 className="font-bold text-[22px] mb-3">
          {homepageLabels.topProductList.popularOffer}
        </h4>
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-[462px_1fr]">
          <ProductOfferSlider />
          <div className="grid gap-7">
            {/* First row: two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[287px]">
              <OfferCard />
              <div>
                <h5 className="font-bold text-[18px] mb-2">
                  {homepageLabels.topProductList.topCategories}
                </h5>
                <div className="grid grid-cols-3 lg:grid-cols-3 gap-y-3">
                  {categoriesProducts?.map((item) => (
                    <div
                      key={item.title}
                      className="text-center flex items-center flex-col"
                    >
                      <div className="bg-[#D9D9D9] h-[90px] w-[90px] rounded-[100%] flex items-center justify-center">
                        <Image
                          alt="offer"
                          className="w-auto"
                          src={item.image}
                        ></Image>
                      </div>
                      <p className="text-[12px] font-semibold mt-1">
                        {item.title}
                      </p>
                    </div>
                  ))}
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
                <button className="absolute right-0 text-[12px] font-medium text-[var(--color-black)] underline hover:text-[var(--color-red)] cursor-pointer">
                  {homepageLabels.topProductList.viewMore}
                </button>
              </div>

              {/* Products */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {loading
                  ? [...Array(4)].map((_, idx) => (
                      <div key={idx} className="rounded-[10px] p-2">
                        <LoaderTopProduct />
                      </div>
                    ))
                  : topProductList.slice(0, 4).map((product) => (
                      <div
                        key={product.prod_id}
                        className="flex items-center gap-2 rounded-[10px] p-2"
                      >
                        <div className="min-h-[60px] min-w-[60px] rounded-[10px] bg-white flex items-center justify-center">
                          <Image
                            src={
                              `${imageBaseUrl}/medium/${product.prod_image}` ||
                              noProduct
                            }
                            alt="product"
                            height={100}
                            width={100}
                            className="object-contain rounded p-4"
                          />
                        </div>
                        <div>
                          <p className="text-[12px] truncate max-w-[100px]">
                            {product.prod_name || product.prod_long_name}
                          </p>
                          <p className="text-[12px] text-[var(--color-red)]">
                            <WrapAmount value={product.prod_original_price} />
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestOffer;
