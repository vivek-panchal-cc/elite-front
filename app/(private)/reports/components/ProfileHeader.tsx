import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import { profileLabels } from '@/lib/labels';
import { Button } from '@/components/ui/ButtonUI';
import Phone from '@/components/images/svgs/Phone';
import Mail from '@/components/images/svgs/Mail';
import WrapAmount from '@/components/wrapper/WrapAmount';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ProfileDashboard() {
  const orderHistory = [
    { orderNumber: 'S08060291318', date: '03-07-25', total: '£450' },
    { orderNumber: 'S08060291318', date: '03-07-25', total: '£450' },
    { orderNumber: 'S08060291318', date: '03-07-25', total: '£450' },
    { orderNumber: 'S08060291318', date: '03-07-25', total: '£450' },
    { orderNumber: 'S08060291318', date: '03-07-25', total: '£450' },
  ];

  // --- Reusable Cards ---
  const RewardBalanceCard = (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-4 sm:p-5 md:p-16 flex flex-col items-center justify-center text-center">
      <h2 className="text-[18px] sm:text-[18px] md:text-[26px] lg:text-[32px] font-bold mb-4 sm:mb-6 text-[var(--color-dark-blue)]">
        {profileLabels.hello}Mattguant
      </h2>
      <p className="text-[var(--color-black)] text-[18px]  mb-0 sm:text-[18px]  md:text-[20px] lg:text-[30px] font-medium">
        {profileLabels.yourRewardBalance}
      </p>
      <p className="font-extrabold text-[var(--color-dark-blue)] text-[43px] mb-3 sm:text-[60px] md:text-[96px]  leading-none ">
        <WrapAmount value={498.32} />
      </p>
      <p className="font-bold text-[var(--color-black)] text-[12px] sm:text-[22px] md:text-[22px]  leading-none mb-3 sm:mb-8 md:mb-10">
        last 10 Transaction Amount:
        <span className="font-bold text-[var(--color-dark-blue)]  text-[12px] sm:text-[22px] md:text-[22px]">
          £49.40{' '}
        </span>
      </p>

      <div className="flex flex-row lg:flex-row gap-3 w-full">
        <Button className="flex-1 lg:w-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-sm">
          {profileLabels.withdraw}
        </Button>
        <Button className="flex-1 lg:w-full bg-[var(--color-dark-blue)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-sm">
          {profileLabels.deposite}
        </Button>
      </div>
    </div>
  );

  const OrderHistoryCard = (
    <div className="overflow-hidden rounded-xl">
      <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4 overflow-x-auto custom-scrollbar text-[var(--color-black)]">
        <h3 className="font-semibold text-[14px] sm:text-[15px] md:text-[16px] ">
          {profileLabels.orderHistory}
        </h3>
        <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2 min-w-[349px]">
          <thead>
            <tr className="text-left text-[var(--color-black)]">
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
              <tr key={idx} className="text-[var(--color-black)] rounded-lg">
                <td>{o.orderNumber}</td>
                <td>{o.date}</td>
                <td>{o.total}</td>
                <td className="text-[var(--color-red)] cursor-pointer">{profileLabels.reorder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ContactCard = (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-4 sm:p-10 text-center flex flex-col justify-center text-[var(--color-black)]">
      <h3 className="font-semibold text-[14px] sm:text-[16px] mb-3">{profileLabels.contactUs}</h3>
      <div className="flex flex-col gap-2 w-full px-6 sm:px-10">
        <a
          href={`tel:${profileLabels.profilePhone}`}
          className="flex items-center justify-center gap-2 bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] text-xs sm:text-sm md:text-[14px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-full"
        >
          <Phone fill="var(--color-white)" />
          {profileLabels.profilePhone}
        </a>
        <a
          href={`mailto:${profileLabels.profileEmail}`}
          className="flex items-center justify-center gap-2 bg-[var(--color-dark-blue)] hover:bg-primary/90 text-[var(--color-white)] text-xs sm:text-sm md:text-[14px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-full"
        >
          <Mail fill="var(--color-white)" />
          {profileLabels.profileEmail}
        </a>
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
                  <SwiperSlide>{ContactCard}</SwiperSlide>
                </Swiper>
              </div>
            </div>

            {/* Desktop -> Grid */}
            <div className="hidden gap-2 lg:grid grid-cols-1 lg:grid-cols-[696px_1fr]">
              {RewardBalanceCard}
              <div className="lg:grid lg:grid-cols-1 lg:gap-2">
                {OrderHistoryCard}

                {ContactCard}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
