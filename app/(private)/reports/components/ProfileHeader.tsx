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

import { profileLabels } from "@/lib/labels";
import { Button } from "@/components/ui/ButtonUI";
import WrapAmount from "@/components/wrapper/WrapAmount";
import OrderHistoryCard from "@/components/cards/OrderHistoryCard";
import ContactCard from "@/components/cards/ContactCard";
import LoaderDiv from "@/components/loaders/LoaderDiv";
import useDealerRewardPoints from "@/hooks/useDealerRewardPoints";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProfileDashboard({ loading, points }: ReportsProps) {
  const router = useRouter();
  const RewardBalanceCard = (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-4 sm:p-5 md:p-16 flex flex-col items-center justify-center text-center">
      <h2 className="text-[18px] sm:text-[18px] md:text-[26px] lg:text-[32px] font-bold mb-4 sm:mb-6 text-[var(--color-dark-blue)]">
        {loading ? (
          <LoaderDiv height={50} />
        ) : (
          <>
            {profileLabels.hello} {points.dealer_name}
          </>
        )}
      </h2>
      <p className="text-[var(--color-black)] text-[18px]  mb-0 sm:text-[18px]  md:text-[20px] lg:text-[30px] font-medium">
        {profileLabels.yourRewardBalance}
      </p>
      <p className="font-extrabold text-[var(--color-dark-blue)] text-[43px] mb-3 sm:text-[60px] md:text-[96px]  leading-none ">
        {loading ? (
          <LoaderDiv height={50} />
        ) : (
          <WrapAmount value={points.reward_balance} />
        )}
      </p>
      {points.last_10_transactions_amount && (
        <p className="font-bold text-[var(--color-black)] text-[12px] sm:text-[22px] md:text-[22px]  leading-none mb-3 sm:mb-8 md:mb-10">
          {profileLabels.lastTenTrans}&nbsp;
          <span className="font-bold text-[var(--color-dark-blue)]  text-[12px] sm:text-[22px] md:text-[22px]">
            {loading ? (
              <LoaderDiv height={30} />
            ) : (
              <WrapAmount value={points.last_10_transactions_amount} />
            )}
          </span>
        </p>
      )}

      <div className="flex flex-row lg:flex-row gap-3 w-full">
        <Button
          className="flex-1 lg:w-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-sm"
          onClick={() => router.push("/transfer")}
        >
          {profileLabels.withdraw}
        </Button>
        {/* <Button className="flex-1 lg:w-full bg-[var(--color-dark-blue)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-sm">
          {profileLabels.deposite}
        </Button> */}
      </div>
    </div>
  );

  return (
    <section className="profile-header-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 py-8 sm:py-10 md:py-14 lg:py-16 px-4 sm:px-5 md:px-8 lg:px-[60px]">
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
                  <SwiperSlide>{RewardBalanceCard}</SwiperSlide>
                  <SwiperSlide>{<OrderHistoryCard />}</SwiperSlide>
                  <SwiperSlide>{<ContactCard />}</SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* Desktop -> Grid */}
            {/* <div className="hidden gap-2 lg:grid grid-cols-1 lg:grid-cols-[696px_1fr]"> */}
            <div className="hidden gap-2 lg:grid grid-cols-1 lg:max-[1135px]:grid-cols-[550px_1fr] lg:min-[1136px]:grid-cols-[696px_1fr]">
              {RewardBalanceCard}
              <div className="lg:grid lg:grid-cols-1 lg:gap-2 [&>*]:h-[235px]">
                {<OrderHistoryCard />}
                {<ContactCard />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
