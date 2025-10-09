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
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import useDealerSummary from "@/hooks/useDealerSummary";
import LoaderDiv from "@/components/loaders/LoaderDiv";
import GraphCard from "@/components/cards/GraphCard";
import ContactCard from "@/components/cards/ContactCard";
import OrderHistoryCard from "@/components/cards/OrderHistoryCard";
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
  const { dealer } = useAuthStoreWithAutoRefresh();
  const [loadingSumm, summaryList, reloadSumm] = useDealerSummary(
    Number(dealer?.dealer_id)
  );

  // --- Reusable Cards ---
  const RewardBalanceCard = (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-8 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-bold mb-4 sm:mb-10 text-[var(--color-dark-blue)] leading-[22px]">
        {loadingSumm ? (
          <LoaderDiv height={50} />
        ) : (
          <>
            {profileLabels.hello} {summaryList?.dealer_name}
          </>
        )}
      </h2>
      <p className="text-[var(--color-black)] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
        {profileLabels.yourRewardBalance}
      </p>
      <p className="font-extrabold text-[var(--color-dark-blue)] text-[48px] sm:text-[60px] md:text-[70px] leading-none mb-6 sm:mb-8 md:mb-10">
        {loadingSumm ? (
          <LoaderDiv height={50} />
        ) : (
          <WrapAmount value={Number(summaryList?.current_amount_bal)} />
        )}
      </p>
      <div className="flex flex-row lg:flex-col gap-3 w-full">
        <Button
          className="flex-1 lg:w-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[31px] rounded-full text-[12px]"
          onClick={() => router.push("/transfer")}
        >
          {profileLabels.withdraw}
        </Button>
        {/* <Button className="flex-1 lg:w-full bg-[var(--color-dark-blue)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[31px] rounded-full text-[12px]">
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
                  <SwiperSlide>
                    <RecentTransactionCard
                      header={profileLabels.eliteWalletTrans}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <GraphCard />
                  </SwiperSlide>
                  <SwiperSlide>{<ContactCard />}</SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* Desktop -> Grid */}
            <div className="hidden gap-6 lg:grid grid-cols-1 lg:grid-cols-[350px_1fr]">
              {RewardBalanceCard}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                {<OrderHistoryCard />}
                <RecentTransactionCard
                  header={profileLabels.eliteWalletTrans}
                />
                <GraphCard />
                {<ContactCard />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
