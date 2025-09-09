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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const RewardsTransactions = () => {
  const [active, setActive] = useState("All");

  const tabs = ["All", "Available", "Used"];
  const RewardsTransactions = (
    <div>
      <p className="text-[22px] font-bold text-[var(--color-blue)] lg:text-[26px] text-center mb-3 md:mb-0 lg:text-left">
        Rewards Transactions
      </p>
      <div className="flex flex-col">
        <div className="flex flex-col items-center md:flex-row md:justify-end md:items-end md:gap-3 w-full">
          <div className="relative w-82 lg:w-58 flex flex-col justify-center items-center ">
            <Input
              className="border-1 bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.3)] pl-5 text-[12px] font-semibold"
              placeholder="Search"
            />

            <IconSearch className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="hidden md:flex relative items-center border-1 border-[rgba(0,0,0,0.31)] rounded-4xl px-3 py-2 bg-[rgba(0,0,0,0.05)] ">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-6 focus:outline-none">
                <span className="text-[12px] font-semibold">Sort by popularity</span>
                <IconDownArrow className="h-3 w-3 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* navbar with dropdown button small and medium device */}
        <div className="md:hidden flex flex-row  gap-5  py-5 lg:p-0 justify-center items-center">
          <nav className="flex flex-row gap-10">
            <div
              className="text-[14px] font-semibold flex flex-row gap-6 mt-2 lg:gap-12 lg:text-[18px] leading-4
            "
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`relative  transition-colors px-1 ${
                    active === tab
                      ? "text-[#000000] font-semibold"
                      : "text-[#000000] font-semibold hover:text-blue-500"
                  }`}
                >
                  {tab}
                  {active === tab && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[3px]  bg-[#005198] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          <div className="relative inline-flex items-center border-1 border-[rgba(0,0,0,0.31)] rounded-4xl px-3 py-2 bg-[rgba(0,0,0,0.05)] ">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                <span className="text-[12px] font-medium">Sort by popularity</span>
                <IconDownArrow className="h-2.5 w-2.5 text-muted-foreground" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* nav bar desktop  */}
        <div className="hidden md:flex flex-row gap-6 py-5 lg:p-0 items-start mb-4">
          <nav className="flex flex-row gap-10">
            <div
              className="text-[14px] font-medium flex flex-row gap-6 mt-2 lg:gap-12 lg:text-[18px] leading-4
            "
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`relative transition-colors ${
                    active === tab
                      ? "text-[#000000] font-semibold"
                      : "text-[#000000] font-semibold hover:text-blue-500"
                  }`}
                >
                  {tab}
                  {active === tab && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#005198] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
        {/* mobile card */}
        <div className="md:hidden w-full mx-auto border-0 rounded-2xl py-4 px-8 bg-[#F6F6F6] grid grid-cols-2 gap-x-14 gap-y-4 text-center">
          {/* Row 1 */}
          <div className="text-left ">
            <p className="text-[12px] font-bold leading-3">Redeem Date</p>
            <p className="text-[12px] font-medium">03-07-25</p>
          </div>

          <div className="text-left ">
            <p className="text-[12px] font-bold">Credit amount</p>
            <p className="text-[12px] font-medium text-[#005198]">03-07-25</p>
          </div>

          {/* Row 2 */}
          <div className="text-left ">
            <p className="text-[12px] font-bold">Description</p>
            <p className="text-[12px] font-medium leading-3">
              order id <span className="text-[#582CD9]">#80080062913</span>
            </p>
          </div>

          <div className="text-left ">
            <p className="text-[12px] font-bold">Balance Amount</p>
            <p className="text-[12px] font-medium">03-07-25</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TransactionTable = (
    <div className="overflow-hidden rounded-xl">
      <div className="bg-[var(--color-white)] rounded-xl  p-3 sm:p-4 overflow-x-auto custom-scrollbar text-[var(--color-black)]">
        <h3 className="font-semibold text-[14px] sm:text-[15px] md:text-[16px] ">
          {/* {profileLabels.orderHistory} */}
        </h3>
        <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2 min-w-[349px]">
          <thead>
            <tr className="text-center text-[var(--color-black)] lg:text-[16px] lg:font-bold h-[57px]">
              <th className="px-6">
                <Checkbox
                  defaultChecked
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 border-black h-5.5 w-5.5 rounded"
                />
              </th>
              <th>Redeem Date</th>
              <th>Credit Amount</th>
              <th>Debit Amount</th>
              <th>Balance Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center text-[var(--color-black)] text-[12px] h-[57px]  font-medium   bg-[rgba(246,246,246,0.7)] leading-5 ">
              <td className="px-6">
                <Checkbox
                  defaultChecked
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600  border-black h-5.5 w-5.5 rounded"
                />
              </td>
              <td>Redeem Date</td>
              <td className="text-center  text-[#005198]">12</td>
              <td className="text-left text-[#ED174B]">13</td>
              <td>Balance Amount</td>
              <td>Description</td>
            </tr>

            <tr className="text-center text-[var(--color-black)] text-[12px]  font-medium h-[57px] bg-[rgba(246,246,246,0.7)] leading-5 ">
              <td className="px-6">
                <Checkbox
                  defaultChecked
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600  border-black h-5.5 w-5.5 rounded"
                />
              </td>
              <td>Redeem Date</td>
              <td className="text-center text-[#005198]">12</td>
              <td className="text-left text-[#ED174B]"> 14</td>
              <td>Balance Amount</td>
              <td>Description</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mx-auto gap-6 py-8 sm:py-10 md:py-14  px-4 sm:px-5 md:px-8 lg:px-[60px]">
          {RewardsTransactions}
          <div className="hidden md:block"> {TransactionTable}</div>
        </div>
      </div>
    </div>
  );
};

export default RewardsTransactions;
