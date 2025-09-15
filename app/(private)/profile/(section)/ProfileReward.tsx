import React from "react";
import { profileLabels } from "@/lib/labels";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { Button } from "@/components/ui/ButtonUI";
import useRewards from "@/hooks/useRewards";
import { formatDate } from "@/lib/constants/all";
import LoaderDiv from "@/components/loaders/LoaderDiv";

interface ProfileRewardProps {
  isMobile?: boolean;
}

export default function ProfileReward({ isMobile }: ProfileRewardProps) {
  const [loadingTrans, transactionList, reloadTrans] = useRewards();
  const rewards = transactionList.map((r) => ({
    date: r.redeem_date,
    creditAmount: r.cr_dr === "C" ? r.redeem_amount : "",
    debitAmount: r.cr_dr === "D" ? r.redeem_amount : "",
    balanceAmount: r.amount_balance,
    description: r.description,
    orderNo: r.redeem_id ?? "",
  }));

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
              {loadingTrans ? (
                Array.from({ length: 2 }).map((_, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex justify-between border-b-[2px] border-[var(--table-border)] last:border-b-0 p-4 px-8 mb-0 gap-6"
                  >
                    {/* Left Side Skeleton */}
                    <div className="flex flex-col text-[12px] space-y-2">
                      <div>
                        <div className="font-bold">
                          <LoaderDiv
                            width={80}
                            height={12}
                            backgroundColor="#C7C7C7"
                          />
                        </div>
                        <div>
                          <LoaderDiv
                            width={100}
                            height={12}
                            backgroundColor="#E0E0E0"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">
                          <LoaderDiv
                            width={60}
                            height={12}
                            backgroundColor="#C7C7C7"
                          />
                        </div>
                        <div>
                          <LoaderDiv
                            width={120}
                            height={12}
                            backgroundColor="#E0E0E0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Side Skeleton */}
                    <div className="flex flex-col text-[12px] space-y-2">
                      <div>
                        <div className="font-bold">
                          <LoaderDiv
                            width={70}
                            height={12}
                            backgroundColor="#C7C7C7"
                          />
                        </div>
                        <div>
                          <LoaderDiv
                            width={50}
                            height={12}
                            backgroundColor="#E0E0E0"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">
                          <LoaderDiv
                            width={90}
                            height={12}
                            backgroundColor="#C7C7C7"
                          />
                        </div>
                        <div>
                          <LoaderDiv
                            width={60}
                            height={12}
                            backgroundColor="#E0E0E0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : rewards.length > 0 ? (
                rewards.slice(0, 5).map((dt, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b-[2px] border-[var(--table-border)] last:border-b-0 p-4 px-8 mb-0 gap-6"
                  >
                    <div className="flex flex-col text-[12px] space-y-2">
                      <div>
                        <div className="font-bold">
                          {profileLabels.rewardWalletLabel.redeemDate}
                        </div>
                        <div>{formatDate(dt.date)}</div>
                      </div>

                      <div>
                        <div className="font-bold">
                          {profileLabels.rewardWalletLabel.desc}
                        </div>
                        <div className="flex flex-col">
                          {dt.description}
                          {dt.orderNo && (
                            <a href="#" className="text-[12px] text-[#582CD9]">
                              #{dt.orderNo}
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
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 text-xs">
                  {profileLabels.noData}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Desktop table
          <div className="overflow-hidden rounded-xl">
            <div className="custom-scrollbar max-h-[360px]">
              <table className="w-full max-w-[792px] rounded-lg">
                <thead className="border-b-[2px] border-[var(--table-border)] text-[10px] md:text-[12px]">
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
                  {loadingTrans ? (
                    Array.from({ length: 5 }).map((_, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-t border-[var(--table-border)]"
                      >
                        {Array.from({ length: 5 }).map((_, colIdx) => (
                          <td key={colIdx} className="px-4 py-2">
                            <LoaderDiv
                              width={50}
                              height={15}
                              backgroundColor="#C7C7C7"
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : rewards.length > 0 ? (
                    rewards.slice(0, 5).map((dt, idx) => (
                      <tr key={idx} className="text-[10px] md:text-[12px]">
                        <td className="py-4 pl-6 whitespace-nowrap">
                          {formatDate(dt.date)}
                        </td>
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
                              <a
                                href="#"
                                className="text-[12px] text-[#582CD9]"
                              >
                                #{dt.orderNo}
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-10 text-gray-500 text-[14px]"
                      >
                        {profileLabels.noData}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {rewards && rewards.length > 0 && (
          <div className="p-6">
            <Button className="w-full text-[12px] md:text-sm text-[var(--color-white)] rounded-[50px]">
              {profileLabels.rewardWalletLabel.viewStatement}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
