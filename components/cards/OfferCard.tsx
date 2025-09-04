import useLatestOffer from "@/hooks/useLatestOffer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { offerImg } from "../images";
const imageLatestOfferBaseUrl = process.env.NEXT_PUBLIC_LATEST_IMAGE_URL || "";

export default function OfferCard() {
  const [loadingLatestOffer, latestOfferList, reloadLatestOffer] =
    useLatestOffer();
  return (
    <div className="rounded-[14px] flex justify-center text-[var(--color-white)] flex-col items-center bg-[var(--color-blue)]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="latest-offer-slider h-full w-fit"
      >
        {latestOfferList.map((offer, idx) => (
          <SwiperSlide key={idx}>
            <a
              href={offer.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[287px] flex items-center justify-center w-full"
            >
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  alt={offer.title || "offer"}
                  src={
                    offer.image
                      ? `${imageLatestOfferBaseUrl}${offer.image}`
                      : offerImg
                  }
                  fill
                  className="object-contain p-8"
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
