import { homepageLabels } from "@/lib/labels";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { images } from "../images";

export const ProductOfferCard = () => {
  return (
    <div
      className="rounded-[24px] flex justify-center text-[var(--color-white)] flex-col items-center"
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
