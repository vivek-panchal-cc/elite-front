"use client";
import React from "react";
import { reportsLabels } from "@/lib/labels";
import { useState } from "react";
import { RewardDropdown } from "./RewardDropdown";
import RewardCard from "./RewardCard";
import useDealerActivation from "@/hooks/useDealerActivation";
import useSuperBonus from "@/hooks/useSuperBonus";
import { Gift, medals, RewardData, TierReward } from "@/types/rewards";

const ClaimDashboard = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { superBonusList } = useSuperBonus();
  const { network, lastYearMonthlyData, lastYearMonthlyFirstTopUpData } =
    useDealerActivation();

  const dynamicRewardData: RewardData[] = (
    Array.isArray(superBonusList) ? superBonusList.flat() : []
  ).map((tier: TierReward) => ({
    name: tier.tier,
    target: tier.tier_values,
    rewards: tier.gifts.map(
      (gift: Gift) => `${gift.tier_qty} * ${gift.tier_title_line}`
    ),
  }));

  const mergedMedals = medals
    .map((medal) => {
      const reward = dynamicRewardData.find((r) => r.name === medal.name);
      if (!reward) return null;
      return {
        ...medal,
        target: reward.target,
        rewards: reward.rewards,
      };
    })
    .filter(Boolean);

  // Extract available months (keys like "2025_07")
  const availableMonths = Array.from(
    new Set([
      ...Object.keys(lastYearMonthlyFirstTopUpData || {}),
      ...Object.keys(lastYearMonthlyData || {}),
    ])
  ).sort((a, b) => {
    const [yearA, monthA] = a.split("_").map(Number);
    const [yearB, monthB] = b.split("_").map(Number);

    // Sort descending: latest first
    if (yearA !== yearB) return yearB - yearA;
    return monthB - monthA;
  });

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Default values in case data not loaded yet
  let currentKey = "";
  let currentMonthLabel = "";

  if (availableMonths.length > 0) {
    currentKey = availableMonths[currentIndex];
    const [year, month] = currentKey.split("_").map(Number);
    currentMonthLabel = `${monthLabels[month - 1]} ${year}`;
  }

  const renderActiveSection = () => {
    const section = mergedMedals[activeIndex];
    if (!section) return null;

    return <RewardCard target={section.target} rewards={section.rewards} />;
  };

  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto w-full">
          <div className="mx-auto gap-6 py-8 sm:py-10 md:py-14 lg:py-16 px-5 sm:px-5 md:px-8 lg:px-[60px]">
            <div>
              <div>
                <p className="font-bold text-center text-[var(--color-blue)] rounded-5xl pb-7 text-[20px] lg:text-[25px]">
                  {reportsLabels.superBonusRewards}
                </p>

                <div className="flex flex-col gap-6 w-[100%] mx-auto lg:gap-8 md:w-full lg:w-full">
                  <div className="w-full lg:w-full md:flex-row">
                    <RewardDropdown
                      items={medals?.map((item, index) => ({
                        ...item,
                        gradient: item.gradient ?? "",
                        renderContent:
                          index === activeIndex ? renderActiveSection() : null,
                      }))}
                      activeIndex={activeIndex}
                      onItemSelect={(index: number) => {
                        setActiveIndex(index);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClaimDashboard;
