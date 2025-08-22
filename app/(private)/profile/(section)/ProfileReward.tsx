import React from "react";
import { profileLabels } from "@/lib/labels";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { Button } from "@/components/ui/ButtonUI";

interface ProfileRewardProps {
  isMobile?: boolean;
}

export default function ProfileReward({ isMobile }: ProfileRewardProps) {
  const rewards = [
    {
      date: "03-07-25",
      creditAmount: "50",
      debitAmount: "",
      balanceAmount: "450",
      description: "Order Number",
      orderNo: "#80080062913",
    },
    {
      date: "03-07-25",
      creditAmount: "",
      debitAmount: "50",
      balanceAmount: "450",
      description: "Std Reward",
      orderNo: "",
    },
    {
      date: "03-07-25",
      creditAmount: "50",
      debitAmount: "",
      balanceAmount: "450",
      description: "Manual Entry",
      orderNo: "",
    },
    {
      date: "03-07-25",
      creditAmount: "",
      debitAmount: "50",
      balanceAmount: "450",
      description: "Std Reward",
      orderNo: "",
    },
    {
      date: "03-07-25",
      creditAmount: "50",
      debitAmount: "",
      balanceAmount: "450",
      description: "Order Number",
      orderNo: "#80080062913",
    },
    {
      date: "03-07-25",
      creditAmount: "50",
      debitAmount: "",
      balanceAmount: "450",
      description: "Order Number",
      orderNo: "#80080062913",
    },
    {
      date: "03-07-25",
      creditAmount: "50",
      debitAmount: "",
      balanceAmount: "450",
      description: "Order Number",
      orderNo: "#80080062913",
    },
  ];

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] ${
          isMobile ? "border-t-0 rounded-t-none rounded-b-xl" : "rounded-xl"
        } bg-[var(--color-light-gray)] shadow-sm`}
      >
        {/* Profile Info Header */}
        <div
          className={`flex ${
            isMobile
              ? "flex-col gap-3"
              : "justify-between items-center px-6 pt-10 pb-4"
          }`}
        >
          {!isMobile && (
            <h3
              className={`font-bold text-[20px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]`}
            >
              {profileLabels.rewardWallet}
            </h3>
          )}
        </div>

        {isMobile ? (
          // Mobile table
          <div className="overflow-visible rounded-xl">
            <div className="pt-4 custom-scrollbar max-h-[240px] min-h-[240px] overflow-y-auto space-y-4">
              {rewards.slice(0, 5).map((dt, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b-[2px] border-[var(--table-border)] last:border-b-0 p-4 px-8 mb-0 gap-6"
                >
                  <div className="flex flex-col text-[12px] space-y-2">
                    <div>
                      <div className="font-bold">
                        {profileLabels.rewardWalletLabel.redeemDate}
                      </div>
                      <div>{dt.date}</div>
                    </div>

                    <div>
                      <div className="font-bold">
                        {profileLabels.rewardWalletLabel.desc}
                      </div>
                      <div className="flex flex-col">
                        {dt.description}
                        {dt.orderNo && (
                          <a href="#" className="text-[12px] text-[#582CD9]">
                            {dt.orderNo}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col text-[12px] space-y-2">
                    <div>
                      <div className="font-bold">
                        {dt.creditAmount
                          ? profileLabels.rewardWalletLabel.creditAmount
                          : profileLabels.rewardWalletLabel.debitAmount}
                      </div>

                      <div
                        className={
                          dt.creditAmount
                            ? "text-[var(--color-blue)]"
                            : "text-[var(--color-red)]"
                        }
                      >
                        {dt.creditAmount ? (
                          <WrapAmount value={dt.creditAmount} />
                        ) : (
                          <WrapAmount value={dt.debitAmount} />
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">
                        {profileLabels.rewardWalletLabel.balanceAmount}
                      </div>
                      <div>
                        <WrapAmount value={dt.balanceAmount} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop table
          <div className="overflow-hidden rounded-xl">
            <div className="custom-scrollbar max-h-[360px]">
              <table className="w-full max-w-[792px] rounded-lg">
                <thead className="border-b border-[var(--color-gray)] text-[10px] md:text-[12px]">
                  <tr className="text-left text-[12px] md:text-[14px] font-medium">
                    <th className="py-3 pl-6 whitespace-nowrap">
                      {profileLabels.rewardWalletLabel.redeemDate}
                    </th>
                    <th className="py-3 whitespace-nowrap">
                      {profileLabels.rewardWalletLabel.creditAmount}
                    </th>
                    <th className="py-3 whitespace-nowrap">
                      {profileLabels.rewardWalletLabel.debitAmount}
                    </th>
                    <th className="py-3 whitespace-nowrap">
                      {profileLabels.rewardWalletLabel.balanceAmount}
                    </th>
                    <th className="py-3 whitespace-nowrap">
                      {profileLabels.rewardWalletLabel.desc}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[10px] md:text-[12px]">
                  {rewards.slice(0, 5).map((dt, idx) => (
                    <tr
                      key={idx}
                      className="border-t-[2px] border-[var(--table-border)] text-[10px] md:text-[12px]"
                    >
                      <td className="py-4 pl-6 whitespace-nowrap">{dt.date}</td>
                      <td className="py-4 whitespace-nowrap text-[var(--color-blue)]">
                        <WrapAmount value={dt.creditAmount} />
                      </td>
                      <td className="py-4 whitespace-nowrap text-[var(--color-red)]">
                        <WrapAmount value={dt.debitAmount} />
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <WrapAmount value={dt.balanceAmount} />
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span>{dt.description}</span>
                          {dt.orderNo && (
                            <a href="#" className="text-[12px] text-[#582CD9]">
                              {dt.orderNo}
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="p-6">
          <Button className="w-full text-[var(--color-white)] rounded-[50px]">
            {profileLabels.rewardWalletLabel.viewStatement}
          </Button>
        </div>
      </div>
    </div>
  );
}
