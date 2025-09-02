import useLatestOffer from "@/hooks/useLatestOffer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { noProduct } from "../images";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export default function OfferCard() {
  const [loadingLatestOffer, latestOfferList, reloadLatestOffer] =
    useLatestOffer();
  return (
    <div className="rounded-[14px] flex justify-center text-white flex-col items-center bg-[#124A9F]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="latest-offer-slider h-full w-fit"
      >
        {latestOfferList.map((offer, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-full flex items-center justify-center">
              <Image
                alt={offer.title || "offer"}
                className=""
                src={
                  offer.image
                    ? `${imageBaseUrl}/medium/${offer.image}`
                    : noProduct
                }
                width={200}
                height={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
