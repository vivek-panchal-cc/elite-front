import { images } from "@/components/images";
import Image from "next/image";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
            <p>get your crystal pro stand for only</p>
            <h3 className="font-bold text-[62px] leading-[1]">£20 + vat</h3>
            <Image alt="offer" className="h-[325px] w-auto" src={images.productOfferOne}></Image>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full text-center flex flex-col items-center p-3">
            <p>get your crystal pro stand for only</p>
            <h3 className="font-bold text-[62px] leading-[1]">£20 + vat</h3>
            <Image alt="offer" className="h-[325px] w-auto" src={images.productOfferOne}></Image>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full text-center flex flex-col items-center p-3">
            <p>get your crystal pro stand for only</p>
            <h3 className="font-bold text-[62px] leading-[1]">£20 + vat</h3>
            <Image alt="offer" className="h-[325px] w-auto" src={images.productOfferOne}></Image>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const OfferSlider = () => {
  return (
    <div className="rounded-[14px] flex justify-center text-white flex-col items-center bg-[#124A9F]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="latest-offer-slider h-full w-fit"
      >
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <Image alt="offer" className="w-auto" src={images.stokeOffer}></Image>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <Image alt="offer" className="w-auto" src={images.stokeOffer}></Image>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <Image alt="offer" className="w-auto" src={images.stokeOffer}></Image>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const LatestOffer = () => {
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
        <h4 className="font-bold text-[22px] mb-3">our popular and latest Offers</h4>
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-[462px_1fr]">
          <ProductOfferSlider />
          <div className="grid gap-1">
            {/* First row: two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[287px]">
              <OfferSlider />
              <div>
                <h5 className="font-bold text-[18px] mb-2">Top Categories</h5>
                <div className="grid grid-cols-3 lg:grid-cols-3 gap-y-3">
                  {categoriesProducts?.map((item) => (
                    <div key={item.title} className="text-center flex items-center flex-col">
                      <div className="bg-[#D9D9D9] h-[90px] w-[90px] rounded-[100%] flex items-center justify-center">
                        <Image alt="offer" className="w-auto" src={item.image}></Image>
                      </div>
                      <p className="text-[12px] font-semibold mt-1">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Second row: one column, full width */}
            <div className="mt-6 lg:mt-0 p-3 w-full lg:h-[117px] rounded-[14px] bg-[#E9E9E9]">
              <p className="text-center text-[12px] font-bold">best pick of the week</p>
              <div className="flex justify-between mt-2 flex-wrap gap-4">
                <div className="flex gap-2 items-center">
                  <div className="h-[60px] w-[60px] rounded-[10px] bg-white"></div>
                  <div>
                    <p className="text-[12px]">Product Name</p>
                    <p className="text-[12px] text-[#ED174B]">£4.50</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-[60px] w-[60px] rounded-[10px] bg-white"></div>
                  <div>
                    <p className="text-[12px]">Product Name</p>
                    <p className="text-[12px] text-[#ED174B]">£4.50</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-[60px] w-[60px] rounded-[10px] bg-white"></div>
                  <div>
                    <p className="text-[12px]">Product Name</p>
                    <p className="text-[12px] text-[#ED174B]">£4.50</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-[60px] w-[60px] rounded-[10px] bg-white"></div>
                  <div>
                    <p className="text-[12px]">Product Name</p>
                    <p className="text-[12px] text-[#ED174B]">£4.50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestOffer;
