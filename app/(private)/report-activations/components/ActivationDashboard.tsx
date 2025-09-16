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
import Image from "next/image";
import { profileLabels, reportsLabels } from "@/lib/labels";
import Phone from "@/components/images/svgs/Phone";
import Mail from "@/components/images/svgs/Mail";
import { useState } from "react";
import { RewardDropdown } from "./RewardDropdown";
import RewardCard from "./RewardCard";

const activationData = [
  { name: "Tree", logo: treeImg, topup: 0, activation: 0 },
  { name: "O2", logo: o2Img, topup: 1, activation: 1 },
  { name: "Vodafone", logo: vodafoneImg, topup: 3, activation: 3 },
  { name: "Lebara", logo: lebaraImg, topup: 5, activation: 5 },
  { name: "EE", logo: eeImg, topup: 0, activation: 0 },
  { name: "Giffgaff", logo: giffgaffImg, topup: 1, activation: 1 },
  { name: "Smarty", logo: smartyImg, topup: 0, activation: 1 },
  { name: "VOXI", logo: voxiImg, topup: 0, activation: 1 },
];

type Medal = {
  name: string;
  color: string;
  trophyColor: string;
  downArrowColor: string;
  gradient?: string;
  borderColor?: string;
};

const medals: Medal[] = [
  {
    name: "Blue",
    color: "bg-[#10499E] text-[var(--color-white)]",
    trophyColor: "text-[#10499E]",
    downArrowColor: "text-[#FFFFFF]",
    borderColor: "border-[#10499E]",
  },
  {
    name: "Bronze",
    color: "bg-[#AA8954] text-[var(--color-white)]",
    trophyColor: "text-[#AA8954]",
    downArrowColor: "text-[#FFFFFF]",
    borderColor: "border-[#AA8954]",
  },
  {
    name: "Silver",
    color: "bg-[#E2E2E2] text-gray-800",
    trophyColor: "text-[#E2E2E2]",
    downArrowColor: "text-[#000000]",
    borderColor: "border-[#E2E2E2]",
  },
  {
    name: "Gold",
    gradient: "linear-gradient(90deg, #C5A158 0%, #FAD97B 50%, #C5A158 100%)",
    color: "bg-[#10499E] text-[var(--color-white)]",
    trophyColor: "text-[#E3C16C]",
    downArrowColor: "text-[#000000]",
    borderColor: "border-[#E3C16C]",
  },
  {
    name: "Platinum",
    color: "bg-[#DEDEDE] text-[var(--color-white)]",
    trophyColor: "text-[#DEDEDE]",
    downArrowColor: "text-[#000000]",
    borderColor: "border-[#DEDEDE]",
  },
  {
    name: "Diamond",
    gradient:
      " linear-gradient(90deg, #EBEFF9 27.68%, #D5DBEB 53.19%, #ECF0F9 71.09%)",
    color: "bg-[#E2E2E2] text-gray-800",
    trophyColor: "text-[#D6DCEC]",
    downArrowColor: "text-[#000000]",
    borderColor: "border-[#E2E2E2]",
  },
];

const rewardData = [
  {
    target: 30,
    rewards: [
      "1 * iPhone SE 32GB Refurb (Rose Gold)",
      "1 * £1 Per Activation Transferred To Rewards Account",
    ],
  },
  {
    target: 50,
    rewards: [
      "1 * Apple Watch Series 3",
      "2 * £2 Per Activation To Rewards Account",
    ],
  },
  {
    target: 30,
    rewards: [
      "1 * iPhone SE 32GB Refurb (Rose Gold)",
      "1 * £1 Per Activation Transferred To Rewards Account",
    ],
  },
  {
    target: 50,
    rewards: [
      "1 * Apple Watch Series 3",
      "2 * £2 Per Activation To Rewards Account",
    ],
    logo: "/images/another-logo.png",
  },
  {
    target: 30,
    rewards: [
      "1 * iPhone SE 32GB Refurb (Rose Gold)",
      "1 * £1 Per Activation Transferred To Rewards Account",
    ],
  },
  {
    target: 50,
    rewards: [
      "1 * Apple Watch Series 3",
      "2 * £2 Per Activation To Rewards Account",
    ],
  },
];
const ActivationDashboard = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderActiveSection = () => {
    const section = rewardData[activeIndex];
    if (!section) return null;

    return <RewardCard target={section.target} rewards={section.rewards} />;
  };

  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto w-full">
          <div className="mx-auto gap-6 py-8 sm:py-10 md:py-14 lg:py-16 px-5 sm:px-5 md:px-8 lg:px-[60px]">
            <div>
              {/* header  */}
              <div className="xl:flex xl:flex-row xl:justify-end  xl:gap-[295px] lg:flex lg:flex-row lg:justify-end lg:gap-[150px]">
                <p className="text-center text-[32px] text-[#005198] font-bold mb-4">
                  {reportsLabels.reportsDashboard}
                </p>
                <div className="flex flex-row gap-6 justify-center items-center mb-6">
                  <div className="border-1 border-[#ED174B] rounded-[8px] h-[32px] w-[32px] flex items-center justify-center">
                    <IconLeftArrow className="h-2.5 w-3.5"></IconLeftArrow>
                  </div>
                  <p className="text-[15px] font-medium">November 2025</p>
                  <div className="border-1 border-[#ED174B] rounded-[8px] h-[32px] w-[32px] flex items-center justify-center">
                    <IconRightArrow className="h-2.5 w-3.5 "></IconRightArrow>
                  </div>
                </div>
              </div>

              {/* mobile view  */}
              <div className="flex flex-col">
                <div className="lg:hidden w-full max-w-md mx-auto">
                  <div className="grid grid-cols-2 text-center text-sm font-semibold">
                    {/* Activation Row */}
                    <div className="text-center border-r-2 border-[rgba(0,0,0,0.1)]">
                      <div className="flex justify-end">
                        <div className="min-w-[124px] bg-[var(--color-light-gray)] text-center p-5 text-[14px] text-[#000000] font-bold rounded-tl-[10px] rounded-bl-[10px] border-0">
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
                        <div className="bg-[var(--color-light-gray)] p-5 text-center text-[14px] text-[#000000] font-bold rounded-tr-[10px] rounded-br-[10px]">
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
                    <div className="bg-[var(--color-light-gray)] text-center p-5 text-[16px] text-[#000000] font-bold rounded-tl-[10px] rounded-tr-[10px] border-0">
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
                    <div className="bg-[var(--color-light-gray)] p-5 text-center text-[16px] text-[#000000] font-bold rounded-bl-[10px] rounded-br-[10px]">
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
                <p className="text-[30px] font-bold text-center text-[#10499E] rounded-5xl py-7 lg:text-[30px] lg:mt-8">
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
