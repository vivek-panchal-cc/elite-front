import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import RewardBalanceCard from "@/components/cards/RewardBalanceCard";
import GraphCard from "@/components/cards/GraphCard";
import RecentTransactionCard from "@/components/cards/RecentTransactionCard";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProfileDashboard() {
  const router = useRouter();
  return (
    <section className="profile-header-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 pb-24 lg:pb-40 pt-8 sm:pt-10 md:pt-14 lg:pt-16 px-4 sm:px-5 md:px-8 lg:px-[60px]">
          <div>
            {/* Mobile/Tablet -> Swiper */}
            <div className="lg:hidden">
              <div className="px-6">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                >
                  <SwiperSlide>
                    <div className="min-h-[215px]">
                      <RewardBalanceCard
                        onWithdraw={() => router.push("/transfer")}
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <RecentTransactionCard />
                  </SwiperSlide>
                  <SwiperSlide>
                    <GraphCard />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* Desktop -> Grid */}
            <div className="hidden gap-6 lg:grid grid-cols-1 lg:grid-cols-[350px_1fr]">
              <RewardBalanceCard onWithdraw={() => router.push("/transfer")} />
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <RecentTransactionCard />
                <GraphCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
