import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";
import { MoreVertical } from "lucide-react";
import { profileLabels } from "@/lib/labels";
import useOrderHistory from "@/hooks/useOrderHistory";
import WrapAmount from "@/components/wrapper/WrapAmount";
import { formatDate } from "@/lib/constants/all";
import LoaderDiv from "@/components/loaders/LoaderDiv";
import { IsMobileProps } from "@/types/profile";

export default function ProfileOrderHistory({ isMobile }: IsMobileProps) {
  const [loading, orderHistory, reload] = useOrderHistory({
    limit: 10,
    orderBy: "DESC",
    page: 1,
    sortBy: "ord_id",
  });
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] ${
          isMobile
            ? "max-h-[300px] min-h-[300px] border-t-0 rounded-t-none rounded-b-xl"
            : "max-h-[525px] min-h-[495px] rounded-xl"
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
              {profileLabels.profileOrderHistory}
            </h3>
          )}
        </div>

        {isMobile ? (
          // Mobile table
          <div className="overflow-hidden rounded-xl">
            <div className="pt-4 custom-scrollbar max-h-[300px] min-h-[300px] overflow-visible">
              <table className="w-full text-[12px]">
                <thead className="w-full text-[12px]">
                  <tr className="bg-[var(--color-light-gray)] text-left">
                    <th className="px-4 py-2">
                      {" "}
                      {profileLabels.profileOrderHistoryLabel.date}
                    </th>
                    <th className="px-4 py-2">
                      {profileLabels.profileOrderHistoryLabel.orderNo}
                    </th>
                    <th className="px-4 py-2">
                      {profileLabels.profileOrderHistoryLabel.total}
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {loading
                    ? Array.from({ length: 5 }).map((_, rowIdx) => (
                        <tr
                          key={rowIdx}
                          className="border-t border-[var(--table-border)]"
                        >
                          {Array.from({ length: 4 }).map((_, colIdx) => (
                            <td key={colIdx} className="px-4 py-2">
                              <LoaderDiv
                                width={colIdx === 3 ? 20 : 50}
                                height={colIdx === 3 ? 20 : 15}
                                backgroundColor="#C7C7C7"
                              />
                            </td>
                          ))}
                        </tr>
                      ))
                    : orderHistory.map((order, idx) => (
                        <tr
                          key={idx}
                          className="border-t border-[var(--table-border)]"
                        >
                          <td className="px-4 py-2">
                            {formatDate(order.o_ord_datetime)}
                          </td>
                          <td className="px-4 py-2">{order.o_ord_id}</td>
                          <td className="px-4 py-2">
                            <WrapAmount value={order.o_total} />
                          </td>
                          <td className="px-2 py-2 text-right relative">
                            <div ref={menuRef} className="inline-block">
                              <button
                                onClick={() =>
                                  setOpenMenuIndex(
                                    openMenuIndex === idx ? null : idx
                                  )
                                }
                                className="p-1"
                              >
                                <MoreVertical className="w-5 h-5 text-[var(--color-dark-blue)]" />
                              </button>
                            </div>
                            {openMenuIndex === idx && (
                              <div className="overflow-hidden absolute right-0 mt-1 w-25 bg-[var(--color-white)] border border-[var(--color-red)] rounded-xl shadow-md z-10">
                                {/* <button className="block w-full border-b border-[var(--table-border)] text-center px-3 py-1 hover:bg-gray-100 text-[var(--color-dark-blue)] hover:text-[var(--color-red)] text-[12px] cursor-pointer">
                              {
                                profileLabels.profileOrderHistoryLabel
                                  .viewReceipt
                              }
                            </button> */}
                                <button className="block w-full border-b border-[var(--table-border)] text-center px-3 py-1 hover:bg-gray-100 text-[var(--color-dark-blue)] hover:text-[var(--color-red)] text-[12px] cursor-pointer">
                                  {
                                    profileLabels.profileOrderHistoryLabel
                                      .viewOrder
                                  }
                                  {/* <button className="block w-full text-center px-3 py-1 hover:bg-gray-100 text-[var(--color-dark-blue)] hover:text-[var(--color-red)] text-[12px] cursor-pointer">
                              {profileLabels.profileOrderHistoryLabel.reOrder}
                            </button> */}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Desktop table
          <div className="overflow-hidden rounded-xl">
            <div className="custom-scrollbar max-h-[400px] min-h-[400px]">
              <table className="w-full max-w-[792px] min-w-[770px] rounded-lg">
                <thead className="border-b border-[var(--color-gray)] text-[10px] md:text-[12px]">
                  <tr className="text-left text-[12px] md:text-[14px] font-medium">
                    <th className="px-4 py-3 whitespace-nowrap">
                      {profileLabels.profileOrderHistoryLabel.date}
                    </th>
                    <th className="px-4 py-3 whitespace-nowrap">
                      {profileLabels.profileOrderHistoryLabel.orderNo}
                    </th>
                    <th className="px-4 py-3 whitespace-nowrap">
                      {profileLabels.profileOrderHistoryLabel.status}
                    </th>
                    <th className="px-4 py-3 whitespace-nowrap">
                      {profileLabels.profileOrderHistoryLabel.total}
                    </th>
                    <th className="px-4 py-3 whitespace-nowrap">
                      {profileLabels.profileOrderHistoryLabel.action}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[10px] md:text-[12px]">
                  {loading
                    ? Array.from({ length: 5 }).map((_, idx) => (
                        <tr
                          key={idx}
                          className="border-t-[2px] border-[var(--table-border)] text-[10px] md:text-[12px]"
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <td key={i} className="px-4 py-6 whitespace-nowrap">
                              <LoaderDiv
                                width={100}
                                height={25}
                                backgroundColor="#C7C7C7"
                              />
                            </td>
                          ))}
                        </tr>
                      ))
                    : orderHistory.map((order, idx) => (
                        <tr
                          key={idx}
                          className="border-t-[2px] border-[var(--table-border)] text-[10px] md:text-[12px]"
                        >
                          <td className="px-4 py-6 whitespace-nowrap">
                            {formatDate(order.o_ord_datetime)}
                          </td>
                          <td className="px-4 py-6 whitespace-nowrap">
                            {order.o_ord_id}
                          </td>
                          <td className="px-4 py-6 whitespace-nowrap capitalize">
                            {order.status}
                          </td>
                          <td className="px-4 py-6 whitespace-nowrap">
                            <WrapAmount value={order.o_total} />
                          </td>
                          <td className="px-2 py-6 whitespace-nowrap flex gap-2">
                            <>
                              {/* <Button className="h-[23px] w-[105px] px-3 py-1 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-red-hover)] text-[10px] md:text-[12px] font-normal">
                          {profileLabels.profileOrderHistoryLabel.viewReceipt}
                        </Button> */}
                              <Button className="h-[23px] w-[105px] px-3 py-1 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-red-hover)] text-[10px] md:text-[12px] font-normal">
                                {
                                  profileLabels.profileOrderHistoryLabel
                                    .viewOrder
                                }
                              </Button>
                              {/* <Button className="h-[23px] w-[105px] px-3 py-1 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-red-hover)] text-[10px] md:text-[12px] font-normal">
                          {profileLabels.profileOrderHistoryLabel.reOrder}
                        </Button> */}
                            </>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
