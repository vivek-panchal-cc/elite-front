import React from "react";
import { Button } from "@/components/ui/ButtonUI";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { profileLabels } from "@/lib/labels";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import useDealerSummary from "@/hooks/useDealerSummary";
import LoaderDiv from "../loaders/LoaderDiv";

interface RewardBalanceCardProps {
  onWithdraw?: () => void;
  // onDeposit?: () => void; // uncomment if you want deposit later
}

export default function RewardBalanceCard({
  onWithdraw,
}: RewardBalanceCardProps) {
  const { dealer } = useAuthStoreWithAutoRefresh();
  const [loadingSumm, summaryList, reloadSumm] = useDealerSummary(
    Number(dealer?.dealer_id)
  );

  return (
    <div className="h-full bg-[var(--color-white)] rounded-xl shadow-lg p-8 sm:p-5 sm:pb-4 md:p-6 md:pb-4 flex flex-col items-center justify-center text-center">
      <h2 className="text-[22px] font-bold text-[var(--color-dark-blue)] mb-2 leading-[16px]">
        {loadingSumm ? (
          <LoaderDiv height={30} />
        ) : (
          <>
            {profileLabels.hello} {summaryList?.dealer_name}
          </>
        )}
      </h2>
      <p className="text-[var(--color-black)] text-[16px] leading-[20px] py-1 font-medium">
        {profileLabels.yourRewardBalance}
      </p>
      <p className="font-extrabold text-[var(--color-dark-blue)] text-[48px] leading-none mb-10">
        {loadingSumm ? (
          <LoaderDiv height={50} />
        ) : (
          <WrapAmount value={Number(summaryList?.current_amount_bal)} />
        )}
      </p>
      <div className="flex flex-row gap-3 w-full">
        <Button
          className="flex-1 lg:w-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-[12px]"
          onClick={onWithdraw}
        >
          {profileLabels.withdraw}
        </Button>
        {/* 
        <Button className="flex-1 lg:w-full bg-[var(--color-dark-blue)] text-[var(--color-white)] py-2 sm:py-2.5 md:py-3 lg:max-h-[36px] rounded-full text-[12px]">
          {profileLabels.deposite}
        </Button> 
        */}
      </div>
    </div>
  );
}
