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
  const orderHistory = [
    { orderNumber: "S08060291318", date: "03-07-25", total: "£450" },
    { orderNumber: "S08060291318", date: "03-07-25", total: "£450" },
    { orderNumber: "S08060291318", date: "03-07-25", total: "£450" },
    { orderNumber: "S08060291318", date: "03-07-25", total: "£450" },
    { orderNumber: "S08060291318", date: "03-07-25", total: "£450" },
  ];

  const walletTransactions = [
    { id: "151581655", amount: "£48.32", units: 51, date: "27-06-25" },
    { id: "151581655", amount: "£48.32", units: 51, date: "27-06-25" },
    { id: "151581655", amount: "£48.32", units: 51, date: "27-06-25" },
    { id: "151581655", amount: "£48.32", units: 51, date: "27-06-25" },
    { id: "151581655", amount: "£48.32", units: 51, date: "27-06-25" },
  ];

  // --- Reusable Cards ---
  const RewardBalanceCard = (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-bold mb-4 sm:mb-6 text-[var(--color-dark-blue)]">
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
        <Button className="flex-1 lg:w-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-[12px]">
          {profileLabels.withdraw}
        </Button>
        {/* <Button className="flex-1 lg:w-full bg-[var(--color-dark-blue)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-[12px]">
          {profileLabels.deposite}
        </Button> */}
      </div>
    </div>
  );

  const OrderHistoryCard = (
    <div className="overflow-hidden rounded-xl">
      <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4 overflow-x-auto custom-scrollbar text-[var(--color-black)]">
        <h3 className="font-semibold text-[10px] sm:text-[12px] md:text-[14px]">
          {profileLabels.orderHistory}
        </h3>
        <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2">
          {/* min-w-[349px] */}
          <thead>
            <tr className="text-left text-[var(--color-black)] text-[10px]">
              <th>{profileLabels.orderNo}</th>
              <th>{profileLabels.orderDate}</th>
              <th>{profileLabels.total}</th>
              <th>{profileLabels.action}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="p-0">
                <div className="w-[calc(100%+1.5rem)] -ml-3 sm:w-[calc(100%+2rem)] sm:-ml-4 border-b-2 border-[var(--color-light-gray)]"></div>
              </td>
            </tr>
            {orderHistory.map((o, idx) => (
              <tr
                key={idx}
                className="text-[var(--color-black)] rounded-lg text-[10px]"
              >
                <td>{o.orderNumber}</td>
                <td>{o.date}</td>
                <td>{o.total}</td>
                <td className="text-[var(--color-red)] cursor-pointer">
                  {profileLabels.reorder}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const WalletTransactionsCard = (
    <div className="overflow-hidden rounded-xl">
      <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4 overflow-x-auto custom-scrollbar text-[var(--color-black)]">
        <h3 className="font-semibold text-[10px] sm:text-[12px] md:text-[14px]">
          {profileLabels.eliteWalletTrans}
        </h3>
        <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2">
          {/* min-w-[349px] */}
          <thead>
            <tr className="text-left text-[var(--color-black)] text-[10px]">
              <th>{profileLabels.id}</th>
              <th>{profileLabels.amount}</th>
              <th>{profileLabels.units}</th>
              <th>{profileLabels.date}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="p-0">
                <div className="w-[calc(100%+1.5rem)] -ml-3 sm:w-[calc(100%+2rem)] sm:-ml-4 border-b-2 border-[var(--color-light-gray)]"></div>
              </td>
            </tr>
            {walletTransactions.map((w, idx) => (
              <tr
                key={idx}
                className="text-left text-[var(--color-black)] text-[10px]"
              >
                <td>{w.id}</td>
                <td className="text-[var(--color-red)]">{w.amount}</td>
                <td>{w.units}</td>
                <td>{w.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  <SwiperSlide>{OrderHistoryCard}</SwiperSlide>
                  <SwiperSlide>{WalletTransactionsCard}</SwiperSlide>
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
                {OrderHistoryCard}
                {WalletTransactionsCard}
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
