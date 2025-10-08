import React from "react";
import { Line } from "react-chartjs-2";
import { profileLabels } from "@/lib/labels";
import useDealerGraph from "@/hooks/useDealerGraph";
import { getRewardGraphData, rewardGraphOptions } from "@/lib/constants/all";

export default function GraphCard() {
  const [loadingGraph, dealerGraphData, reloadGraph] = useDealerGraph();
  const rewardGraphData = getRewardGraphData(dealerGraphData);

  return (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[var(--color-black)] gap-2 sm:gap-0">
        <h3 className="font-semibold text-[12px] sm:text-[14px]">
          {profileLabels.rewardGraph}
        </h3>
        <div className="flex gap-3 text-[11px] sm:text-[12px] text-[var(--color-gray)] font-semibold leading-[20px]">
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
}
