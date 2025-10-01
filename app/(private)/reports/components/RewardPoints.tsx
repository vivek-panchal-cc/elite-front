import React, { useState } from "react";
import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { reportsLabels } from "@/lib/labels";
import { CURRENCY_SYMBOL } from "@/lib/constants/all";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import useDealerSummary from "@/hooks/useDealerSummary";

const RewardPoints = () => {
  const { dealer } = useAuthStoreWithAutoRefresh();
  const [_, summaryList] = useDealerSummary(Number(dealer?.dealer_id));
  const [amountInput, setAmountInput] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(CURRENCY_SYMBOL, "");
    val = val.replace(/[^0-9.]/g, "");

    const parts = val.split(".");
    if (parts.length > 2) {
      val = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[1]?.length > 2) {
      val = parts[0] + "." + parts[1].slice(0, 2);
    }

    if (val === "") {
      setAmountInput("");
      return;
    }

    const num = parseFloat(val);
    if (!isNaN(num)) {
      const maxBalance = dealer?.current_amount_bal ?? 0;
      const maxAllowed = Math.min(maxBalance);

      const clamped = Math.min(num, maxAllowed);
      setAmountInput(num.toFixed(2));
      if (clamped === num || val.endsWith(".")) {
        setAmountInput(val);
      } else {
        setAmountInput(clamped.toFixed(2));
      }
    } else {
      setAmountInput(val);
    }
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto w-full">
        <div className="gap-6 px-4 sm:px-5 md:px-8 lg:px-[60px]">
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[22px] md:text-[24px] lg:text-[26px] text-[var(--color-blue)] font-bold mb-4">
              {reportsLabels.statListing}
            </p>
            <div className="border-2 rounded-xl bg-[var(--color-light-gray)] border-[var(--color-red)] flex flex-col w-full m-0 p-5 pb-8">
              <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[var(--color-blue)] font-bold mb-3">
                {reportsLabels.enterPoints}
              </p>
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-4 w-full">
                <Input
                  type="text"
                  min={0}
                  className="md:text-[25px] px-4 border-2 h-[33px] md:h-[51px] rounded-4xl w-full font-bold"
                  style={{ borderColor: "var(--color-red)" }}
                  value={`${CURRENCY_SYMBOL} ${amountInput}`}
                  onChange={handleAmountChange}
                />
                <div className="flex flex-row-reverse lg:flex-row gap-3 w-full lg:w-auto">
                  <Button className="flex-1 lg:w-fit md:text-[25px] h-[33px] md:h-[51px] font-semibold sm:px-16 py-0 rounded-4xl bg-[rgba(0,81,152,0.1)] hover:bg-[rgba(0,81,152,0.1)] text-[var(--color-blue)] cursor-default">
                    <WrapAmount
                      value={Number(summaryList?.current_amount_bal)}
                    />
                  </Button>
                  <Button
                    className="flex-1 lg:w-fit md:text-[20px] h-[33px] md:h-[51px] font-semibold sm:px-24 rounded-4xl bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)]"
                    disabled={!amountInput}
                  >
                    {reportsLabels.redeemPts}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardPoints;
