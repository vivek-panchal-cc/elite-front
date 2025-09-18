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
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import useDealerSummary from "@/hooks/useDealerSummary";
import LoaderDiv from "@/components/loaders/LoaderDiv";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProfileDashboard() {
  const { dealer } = useAuthStoreWithAutoRefresh();
  const [loadingSumm, summaryList, reloadSumm] = useDealerSummary(
    Number(dealer?.dealer_id)
  );

  const RewardBalanceCard = (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-4 sm:p-5 md:p-16 flex flex-col items-center justify-center text-center">
      <h2 className="text-[18px] sm:text-[18px] md:text-[26px] lg:text-[32px] font-bold mb-4 sm:mb-6 text-[var(--color-dark-blue)]">
        {loadingSumm ? (
          <LoaderDiv height={50} />
        ) : (
          <>
            {profileLabels.hello} {summaryList?.dealer_name}
          </>
        )}
      </h2>
      <p className="text-[var(--color-black)] text-[18px]  mb-0 sm:text-[18px]  md:text-[20px] lg:text-[30px] font-medium">
        {profileLabels.yourRewardBalance}
      </p>
      <p className="font-extrabold text-[var(--color-dark-blue)] text-[43px] mb-3 sm:text-[60px] md:text-[96px]  leading-none ">
        {loadingSumm ? (
          <LoaderDiv height={50} />
        ) : (
          <WrapAmount value={Number(summaryList?.current_amount_bal)} />
        )}
      </p>
      {false && (
        <p className="font-bold text-[var(--color-black)] text-[12px] sm:text-[22px] md:text-[22px]  leading-none mb-3 sm:mb-8 md:mb-10">
          {profileLabels.lastTenTrans} :&nbsp;
          <span className="font-bold text-[var(--color-dark-blue)]  text-[12px] sm:text-[22px] md:text-[22px]">
            {loadingSumm ? (
              <LoaderDiv height={30} />
            ) : (
              <WrapAmount value={49.4} />
            )}
          </span>
        </p>
      )}

      <div className="flex flex-row lg:flex-row gap-3 w-full">
        <Button className="flex-1 lg:w-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-sm">
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
            <div className="hidden gap-2 lg:grid grid-cols-1 lg:grid-cols-[696px_1fr]">
              {RewardBalanceCard}
              <div className="lg:grid lg:grid-cols-1 lg:gap-2">
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
