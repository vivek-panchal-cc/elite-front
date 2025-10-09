"use client";
import {
  eeImg,
  giffgaffImg,
  lebaraImg,
  o2Img,
  smartyImg,
  treeImg,
  vodafoneImg,
  voxiImg,
} from "@/components/images";
import { IconLeftArrow, IconRightArrow } from "@/components/images/icons";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { profileLabels, reportsLabels } from "@/lib/labels";
import Phone from "@/components/images/svgs/Phone";
import Mail from "@/components/images/svgs/Mail";
import { useState } from "react";
import { RewardDropdown } from "./RewardDropdown";
import RewardCard from "./RewardCard";
import useDealerActivation from "@/hooks/useDealerActivation";
import { safeNumber } from "@/lib/constants/all";
import useSuperBonus from "@/hooks/useSuperBonus";
import { Gift, medals, RewardData, TierReward } from "@/types/rewards";

const ActivationDashboard = () => {
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

  // Build activationData for current month
  const activationData = Object.keys(network).map((networkId) => {
    const name = network[networkId];

    const topup = safeNumber(
      lastYearMonthlyFirstTopUpData?.[currentKey]?.[networkId]
    );
    const activation = safeNumber(
      lastYearMonthlyData?.[currentKey]?.[networkId]?.monthTotal
    );

    // map logos dynamically if you already have them defined
    const logos: Record<string, string | StaticImageData> = {
      "1": treeImg,
      "2": o2Img,
      "5": vodafoneImg,
      "7": lebaraImg,
      "9": eeImg,
      "14": giffgaffImg,
      "15": voxiImg,
      "16": smartyImg,
    };

    return {
      name,
      logo: logos[networkId],
      topup,
      activation,
    };
  });

  const renderActiveSection = () => {
    const section = mergedMedals[activeIndex];
    if (!section) return null;

    return (
      <RewardCard
        target={section.target}
        rewards={section.rewards}
        image={section.image}
      />
    );
  };

  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto w-full">
          {/* <div className="mx-auto gap-6 py-8 sm:py-10 md:py-12 lg:py-14 px-[50px] lg:px-[60px]"> */}
          <div className="mx-auto gap-6 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-12 sm:pb-18 md:pb-20 lg:pb-22 px-[50px] lg:px-[60px]">
            <div>
              <div className="flex flex-col items-center gap-4 md:relative md:flex-row md:justify-end md:items-center">
                <p className="text-center text-[24px] md:text-[32px] text-[var(--color-blue)] font-bold md:mb-4 md:absolute md:left-1/2 md:-translate-x-1/2">
                  {reportsLabels.reportsDashboard}
                </p>
                <div className="flex flex-row gap-6 items-center mb-2 md:mb-6 md:static">
                  {/* Left Arrow */}
                  <button
                    disabled={currentIndex === availableMonths.length - 1}
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(prev + 1, availableMonths.length - 1)
                      )
                    }
                    className={`border-1 border-[var(--color-red)] rounded-[8px] h-[32px] w-[32px] flex items-center justify-center ${
                      currentIndex === availableMonths.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <IconLeftArrow className="h-2.5 w-3.5" />
                  </button>

                  {/* Dynamic Month */}
                  <p className="text-[15px] font-medium min-w-[120px] text-center">
                    {currentMonthLabel || "Loading..."}
                  </p>

                  {/* Right Arrow */}
                  <button
                    disabled={currentIndex === 0}
                    onClick={() =>
                      setCurrentIndex((prev) => Math.max(prev - 1, 0))
                    }
                    className={`border-1 border-[var(--color-red)] rounded-[8px] h-[32px] w-[32px] flex items-center justify-center ${
                      currentIndex === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <IconRightArrow className="h-2.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* mobile view  */}
              <div className="flex flex-col">
                <div className="lg:hidden w-full max-w-md mx-auto">
                  <div className="grid grid-cols-2 text-center text-sm font-semibold">
                    {/* Activation Row */}
                    <div className="text-center border-r-2 border-[rgba(0,0,0,0.1)]">
                      <div className="flex justify-end">
                        <div className="min-w-[124px] bg-[var(--color-light-gray)] text-center p-5 text-[14px] text-[var(--color-black)] font-bold rounded-tl-[10px] rounded-bl-[10px] border-0">
                          {reportsLabels.activation}
                        </div>
                      </div>
                      {activationData.map((item, idx) => (
                        <div key={idx} className="flex gap-5 mt-8 justify-end">
                          <div
                            key={idx}
                            className="py-2 justify-center items-center flex"
                          >
                            <Image
                              src={item.logo}
                              alt={item.name}
                              className="mx-auto"
                            />
                          </div>
                          <p className="basis-[124px] p-5 bg-[var(--color-light-gray)] text-[16px] font-medium rounded-tl-[10px] rounded-bl-[10px] border-0">
                            {item.activation}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* First Top Up Row */}
                    <div className="text-center">
                      <div className="grid grid-cols-[124px_repeat(auto-fit,minmax(100px,1fr))]">
                        <div className="bg-[var(--color-light-gray)] p-5 text-center text-[14px] text-[var(--color-black)] font-bold rounded-tr-[10px] rounded-br-[10px]">
                          {reportsLabels.firstTopUp}
                        </div>
                      </div>
                      {activationData.map((item, idx) => (
                        <div
                          key={idx}
                          className="grid mt-8 grid-cols-[124px_repeat(auto-fit,minmax(100px,1fr))]"
                        >
                          <p className="p-5 bg-[var(--color-light-gray)] text-[16px] font-medium rounded-br-[10px] rounded-tr-[10px] border-0">
                            {item.topup}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {/* Web View */}
                <div className="hidden lg:block">
                  {/* images row  */}
                  <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(100px,1fr))] lg:grid-cols-[160px_repeat(auto-fit,minmax(60px,1fr))] text-center text-sm font-semibold">
                    <div className="w-[157px]"></div>
                    {activationData.map((item, idx) => (
                      <div
                        key={idx}
                        className=" py-2 ml-8 justify-center items-center flex"
                      >
                        <Image
                          src={item.logo}
                          alt={item.name}
                          className="mx-auto"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Activation Row */}
                  <div
                    className="grid grid-cols-[157px_repeat(auto-fit,minmax(100px,1fr))] 
                md:grid-cols-[157px_repeat(auto-fit,minmax(90px,1fr))] 
                text-center border-b-2 border-[rgba(0,0,0,0.1)]"
                  >
                    <div className="bg-[var(--color-light-gray)] text-center p-5 text-[16px] text-[var(--color-black)] font-bold rounded-tl-[10px] rounded-tr-[10px] border-0">
                      {reportsLabels.activation}
                    </div>
                    {activationData.map((item, idx) => (
                      <div key={idx}>
                        <p className="p-6 bg-[var(--color-light-gray)] text-[16px] font-medium ml-8 rounded-tl-[10px] rounded-tr-[10px] border-0">
                          {item.activation}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* First Top Up Row */}
                  <div
                    className="grid grid-cols-[157px_repeat(auto-fit,minmax(100px,1fr))] 
                md:grid-cols-[157px_repeat(auto-fit,minmax(90px,1fr))] 
                text-center  border-t border-[rgba(0,0,0,0.1)] "
                  >
                    <div className="bg-[var(--color-light-gray)] p-5 text-center text-[16px] text-[var(--color-black)] font-bold rounded-bl-[10px] rounded-br-[10px]">
                      {reportsLabels.firstTopUp}
                    </div>
                    {activationData.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[var(--color-light-gray)] p-6 text-[16px] font-medium ml-8 rounded-br-[10px] rounded-bl-[10px]"
                      >
                        {item.topup}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* super bonus reward */}
              <div>
                <p className="text-[30px] font-bold text-center text-[var(--color-blue)] rounded-5xl py-7 lg:text-[30px] lg:mt-8">
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

              {/* contact card   */}
              <div className="bg-[var(--color-light-gray)] p-3 border border-[var(--color-red)] rounded-2xl mt-10">
                <div
                  className="flex flex-col items-center text-center gap-5 px-4 py-6 
                  md:flex-row md:justify-between md:text-left md:gap-10 
                  lg:px-10 lg:py-6 xl:px-20 xl:py-3"
                >
                  {/* Heading */}
                  <h3
                    className="font-bold text-[16px] leading-5
                   md:text-[18px] md:leading-6 
                   lg:text-[22px] lg:leading-7
                   xl:text-[28px] xl:leading-9 text-black"
                  >
                    <span className="whitespace-nowrap">
                      {reportsLabels.contact}
                    </span>
                    <br className="hidden md:block" />
                    <span className="whitespace-nowrap">
                      {reportsLabels.nearBy}
                    </span>
                  </h3>

                  {/* Buttons */}
                  <div className="flex flex-col w-full gap-3 md:flex-row md:justify-end md:gap-5 md:w-full">
                    <a
                      href={`tel:${profileLabels.profilePhone}`}
                      className="flex items-center justify-center gap-2 bg-[var(--color-red)] 
               hover:bg-[var(--color-red-hover)] text-[var(--color-white)] 
               text-sm lg:text-[15px] px-5 py-2 rounded-full
               w-full lg:w-[43%] md:w-[50%]"
                    >
                      <Phone fill="white" />
                      {profileLabels.profilePhone}
                    </a>

                    <a
                      href={`mailto:${profileLabels.profileEmail}`}
                      className="flex items-center justify-center gap-2 bg-[var(--color-dark-blue)] 
               hover:bg-primary/90 text-[var(--color-white)]  
               text-sm lg:text-[15px] px-5 py-2 rounded-full
               w-full lg:w-[43%] md:w-[50%]"
                    >
                      <Mail fill="white" />
                      {profileLabels.profileEmail}
                    </a>
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

export default ActivationDashboard;
