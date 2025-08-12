import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CustomSwiperProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  spaceBetween?: number;
  breakpoints?: Record<number, any>;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

function CustomSwiper<T>({
  items,
  renderItem,
  spaceBetween = 16,
  breakpoints = {
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
  autoplay = false,
  showNavigation = true,
  showPagination = false,
}: CustomSwiperProps<T>) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={showNavigation}
      pagination={showPagination ? { clickable: true } : false}
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      autoplay={autoplay ? { delay: 3000 } : false}
      autoHeight={false}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={idx}>{renderItem(item, idx)}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CustomSwiper;
