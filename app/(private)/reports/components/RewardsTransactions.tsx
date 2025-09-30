import React from "react";
import { Input } from "@/components/ui/Input";
import { IconSearch, IconDownArrow } from "@/components/images/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { profileLabels, reportsLabels } from "@/lib/labels";
import useRewards from "@/hooks/useRewards";
import { formatDate } from "@/lib/constants/all";
import WrapAmount from "@/components/wrapper/WrapAmount";
import LoaderDiv from "@/components/loaders/LoaderDiv";

const RewardsTransactions = () => {
  const [active, setActive] = useState("All");
  const [crDr, setCrDr] = useState<"" | "C" | "D">("");
  const [loadingTrans, transactionList, reloadRewards] = useRewards({
    cr_dr: crDr,
    is_dashboard: false,
  });
  const tabs = ["All", "Available", "Used"];

  // Update crDr whenever tab changes
  const handleTabClick = (tab: string) => {
    setActive(tab);
    switch (tab) {
      case "All":
        setCrDr("");
        break;
      case "Available":
        setCrDr("C");
        break;
      case "Used":
        setCrDr("D");
        break;
    }
    // reloadRewards(); // trigger reload after changing cr_dr
  };

  const RewardsTransactions = (
    <div>
      <p className="text-[22px] font-bold text-[var(--color-blue)] lg:text-[26px] text-center mb-3 lg:mb-3 lg:text-left">
        {reportsLabels.rewardTrans}
      </p>
      <div className="flex flex-col">
        <div className="flex flex-col items-center md:flex-row md:justify-end sm:items-end md:gap-3 w-full">
          {/* <div className="relative w-full sm:w-58 md:w-58 lg:w-58 flex flex-col justify-center items-center sm:items-end">
            <Input
              className="border-1 bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.3)] pl-5 text-[12px] font-semibold"
              placeholder="Search"
            />

            <IconSearch className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground cursor-pointer" />
          </div> */}

          {/* <div className="hidden md:flex relative items-center border-1 border-[rgba(0,0,0,0.31)] rounded-4xl px-3 py-2 bg-[rgba(0,0,0,0.05)] cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-6 focus:outline-none cursor-pointer">
                <span className="text-[12px] font-semibold">
                  {reportsLabels.sortByPopularity}
                </span>
                <IconDownArrow className="h-3 w-3 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{reportsLabels.myAcc}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{reportsLabels.profile}</DropdownMenuItem>
                <DropdownMenuItem>{reportsLabels.billing}</DropdownMenuItem>
                <DropdownMenuItem>{reportsLabels.team}</DropdownMenuItem>
                <DropdownMenuItem>
                  {reportsLabels.subscription}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
        {/* navbar with dropdown button small and medium device */}
        <div className="md:hidden flex flex-row gap-5 py-5 lg:p-0 justify-between md:justify-center items-center">
          <nav className="flex flex-row gap-10">
            <div
              className="text-[14px] font-semibold flex flex-row gap-6 mt-2 lg:gap-12 lg:text-[18px] leading-4
            "
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative transition-colors px-1 ${
                    active === tab
                      ? "text-[var(--color-black)] font-semibold"
                      : "text-[var(--color-black)] font-semibold hover:text-[var(--color-blue)]"
                  }`}
                >
                  {tab}
                  {active === tab && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[var(--color-dark-blue)] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* <div className="relative inline-flex items-center border-1 border-[rgba(0,0,0,0.31)] rounded-4xl px-3 py-2 bg-[rgba(0,0,0,0.05)] ">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                <span className="text-[12px] font-medium">
                  {reportsLabels.sortByPopularity}
                </span>
                <IconDownArrow className="h-2.5 w-2.5 text-muted-foreground" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>{reportsLabels.myAcc}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{reportsLabels.profile}</DropdownMenuItem>
                <DropdownMenuItem>{reportsLabels.billing}</DropdownMenuItem>
                <DropdownMenuItem>{reportsLabels.team}</DropdownMenuItem>
                <DropdownMenuItem>
                  {reportsLabels.subscription}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
        {/* nav bar desktop  */}
        <div className="hidden md:flex flex-row gap-6 py-5 sm:p-0 items-start">
          <nav className="flex flex-row gap-10">
            <div className="text-[14px] font-medium flex flex-row gap-6 mt-2 lg:gap-12 lg:text-[18px] leading-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative transition-colors cursor-pointer ${
                    active === tab
                      ? "text-[var(--color-black)] font-semibold"
                      : "text-[var(--color-black)] font-semibold hover:text-[var(--color-blue)]"
                  }`}
                >
                  {tab}
                  {active === tab && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[var(--color-dark-blue)] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
        {/* mobile card */}
        <div className="md:hidden w-full mx-auto border-0 rounded-2xl flex flex-col gap-4">
          {loadingTrans ? (
            Array.from({ length: 2 }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="w-full mx-auto border-0 rounded-2xl py-4 px-8 bg-[var(--color-light-gray)] grid grid-cols-2 gap-x-8 gap-y-2 text-center"
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
          ) : transactionList.length > 0 ? (
            transactionList?.map((item) => (
              <div
                key={item.redeem_id}
                className="w-full mx-auto border-0 rounded-2xl py-4 px-8 bg-[var(--color-light-gray)] grid grid-cols-2 gap-x-8 gap-y-2 text-center"
              >
                <div className="text-left space-y-1">
                  <p className="text-[12px] font-bold leading-3">
                    {reportsLabels.redeemDate}
                  </p>
                  <p className="text-[12px]">{formatDate(item.redeem_date)}</p>
                </div>

                <div className="text-left space-y-1">
                  <p className="text-[12px] font-bold">
                    {item.cr_dr === "C"
                      ? reportsLabels.crAmount
                      : reportsLabels.dbAmount}
                  </p>
                  <p
                    className={`text-[12px] ${
                      item.cr_dr === "C"
                        ? "text-[var(--color-blue)]"
                        : "text-[var(--color-red)]"
                    }`}
                  >
                    <WrapAmount value={item.redeem_amount} />
                  </p>
                </div>

                <div className="text-left space-y-1">
                  <p className="text-[12px] font-bold">{reportsLabels.desc}</p>
                  <p className="flex flex-col text-[12px] leading-3">
                    {item.description}
                    {item.redeem_id && (
                      <a
                        href={undefined}
                        className="text-[12px] text-[#582CD9]"
                      >
                        #{item.redeem_id}
                      </a>
                    )}
                  </p>
                </div>

                <div className="text-left space-y-1">
                  <p className="text-[12px] font-bold">
                    {reportsLabels.balAmount}
                  </p>
                  <p className="text-[12px]">
                    <WrapAmount value={item.amount_balance} />
                  </p>
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
    </div>
  );

  const TransactionTable = (
    <div className="overflow-hidden rounded-xl">
      <div className="bg-[var(--color-white)] rounded-xl px-0 py-3 sm:py-4 overflow-x-auto custom-scrollbar text-[var(--color-black)]">
        <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2 min-w-[349px]">
          <thead>
            <tr className="text-left text-[var(--color-black)] lg:text-[16px] lg:font-bold h-[57px]">
              <th className="px-6">
                <Checkbox
                  disabled={transactionList.length <= 0}
                  defaultChecked
                  className="data-[state=checked]:bg-[var(--color-checkbox)] data-[state=checked]:border-[var(--color-checkbox)] border-black h-5.5 w-5.5 rounded"
                />
              </th>
              <th>{reportsLabels.redeemDate}</th>
              <th>{reportsLabels.crAmount}</th>
              <th>{reportsLabels.dbAmount}</th>
              <th>{reportsLabels.balAmount}</th>
              <th>{reportsLabels.desc}</th>
            </tr>
          </thead>
          <tbody>
            {loadingTrans ? (
              Array.from({ length: 3 }).map((_, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-t border-[var(--table-border)]"
                >
                  {Array.from({ length: 6 }).map((_, colIdx) => (
                    <td
                      key={colIdx}
                      className={`py-2 text-left ${
                        colIdx === 0 ? "px-[24px]" : ""
                      }`}
                    >
                      <div className="flex justify-start items-left">
                        <LoaderDiv
                          width={colIdx === 0 ? 25 : 80}
                          height={colIdx === 0 ? 25 : 20}
                          backgroundColor="#C7C7C7"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : transactionList.length > 0 ? (
              transactionList?.map((item) => (
                <tr
                  key={item.redeem_id}
                  className="text-left text-[var(--color-black)] text-[12px] h-[57px] font-medium bg-[rgba(246,246,246,0.7)] leading-5"
                >
                  <td className="px-6">
                    <Checkbox
                      defaultChecked
                      className="data-[state=checked]:bg-[var(--color-checkbox)] data-[state=checked]:border-[var(--color-checkbox)] border-[var(--color-black)] h-5.5 w-5.5 rounded"
                    />
                  </td>
                  <td>{formatDate(item.redeem_date)}</td>
                  <td className="text-[var(--color-blue)]">
                    {item.cr_dr === "C" ? (
                      <WrapAmount value={item.redeem_amount} />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-[var(--color-red)]">
                    {item.cr_dr === "D" ? (
                      <WrapAmount value={item.redeem_amount} />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <WrapAmount value={item.amount_balance} />
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span>{item.description}</span>
                      {item.redeem_id && (
                        <a
                          href={undefined}
                          className="text-[12px] text-[#582CD9]"
                        >
                          #{item.redeem_id}
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
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
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 pb-8 sm:pb-10 md:pb-14 px-4 sm:px-5 md:px-8 lg:px-[60px]">
          {RewardsTransactions}
          <div className="hidden md:block">{TransactionTable}</div>
        </div>
      </div>
    </div>
  );
};

export default RewardsTransactions;
