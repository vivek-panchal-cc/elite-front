"use client";
import React from "react";
import { profileLabels, reportsLabels } from "@/lib/labels";
import { Line } from "react-chartjs-2";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { images } from "@/components/images";
import useDealerGraph from "@/hooks/useDealerGraph";
import { getRewardGraphData, rewardGraphOptions } from "@/lib/constants/all";
import WrapAmount from "@/components/wrapper/WrapAmount";

const RewardGraph = ({ loading, points }: ReportsProps) => {
  const [loadingGraph, dealerGraphData, reloadGraph] = useDealerGraph();
  const rewardGraphData = getRewardGraphData(dealerGraphData);

  const RewardGraphCard = (
    <div className="bg-[var(--color-white)]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[var(--color-black)] gap-2 sm:gap-0">
        <h3 className="font-bold text-[12px] text-[var(--color-blue)] sm:text-[16px]">
          {profileLabels.rewardGraph}
        </h3>
        {/* keep labels inside card even on mobile */}
        <div className="flex gap-3 text-[11px] sm:text-[12px] text-[var(--color-gray)] font-semibold">
          <p className="flex items-center gap-1 before:content-[''] before:w-3 before:h-3 before:rounded-full before:bg-[var(--color-orange)]">
            {profileLabels.received}
          </p>
          <p className="flex items-center gap-1 before:content-[''] before:w-3 before:h-3 before:rounded-full before:bg-[var(--color-dark-blue)]">
            {profileLabels.withdrawal}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <Line data={rewardGraphData} options={rewardGraphOptions} />
      </div>
    </div>
  );

  const RewardGraphItems = (
    <div className="flex gap-3 md:flex-col md:gap-3 md:items-center lg:items-center justify-center">
      <div
        className="border-0 rounded-xl  p-3 flex flex-row gap-3 md:flex-col justify-center items-center w-full h-full md:p-7"
        style={{
          background:
            " linear-gradient(180deg, #10499E -38.93%, #ED174B 131.64%)",
        }}
      >
        <Image
          className="h-[39px] md:h-[68px] w-auto "
          src={images.redeemsPoints}
          alt="transfer-img"
        />
        <div className=" flex flex-col md:justify-center md:items-center">
          <p className="font-bold text-[18px] md:text-[42px] text-[var(--color-white)] leading-7">
            <WrapAmount value={points.redeem_points || 0} />
          </p>
          <p className="font-medium text-[10px] md:text-[18px] text-[var(--color-white)] ">
            {reportsLabels.redeemPts}
          </p>
        </div>
      </div>
      <div
        className="border rounded-xl p-3 flex flex-row gap-3 md:flex-col justify-center items-center w-full h-full md:p-7"
        style={{
          background:
            " linear-gradient(180deg, #10499E -38.93%, #ED174B 131.64%)",
        }}
      >
        <Image
          className="h-[39px] md:h-[68px] w-auto"
          src={images.availablePoints}
          alt="transfer-img"
        />
        <div className=" flex flex-col md:justify-center md:items-center">
          <p className="font-bold text-[18px] md:text-[42px] text-[var(--color-white)] leading-7">
            <WrapAmount value={points.available_points || 0} />
          </p>
          <p className="font-medium text-[10px] md:text-[18px] text-[var(--color-white)]">
            {reportsLabels.availablePts}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto w-full">
          <div className="mx-auto gap-6 py-8 sm:py-10 md:py-14 lg:py-16 px-10 md:px-8 lg:px-[60px]">
            <div className="gap-4 md:grid grid-cols-1 md:grid-cols-[459px_1fr] xl:grid-cols-[799px_1fr] ">
              <div className="p-4 border-1 border-[var(--color-red)] rounded-xl">
                {RewardGraphCard}
              </div>

              <div className="mt-3 md:mt-0 md:grid md:grid-cols-1 md:gap-2 ">
                {RewardGraphItems}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RewardGraph;
