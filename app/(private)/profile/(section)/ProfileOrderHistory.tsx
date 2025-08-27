import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";
import { MoreVertical } from "lucide-react";
import { profileLabels } from "@/lib/labels";

interface ProfileOrderHistoryProps {
  isMobile?: boolean;
}

export default function ProfileOrderHistory({
  isMobile,
}: ProfileOrderHistoryProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const orders = [
    {
      date: "03-07-25",
      orderNumber: "8080806291318",
      status: "Cancelled",
      total: "£450",
    },
    {
      date: "03-07-25",
      orderNumber: "8080806291318",
      status: "Pending",
      total: "£450",
    },
    {
      date: "03-07-25",
      orderNumber: "8080806291318",
      status: "Completed",
      total: "£450",
    },
    {
      date: "03-07-25",
      orderNumber: "8080806291318",
      status: "Pending",
      total: "£450",
    },
    {
      date: "03-07-25",
      orderNumber: "8080806291318",
      status: "Cancelled",
      total: "£450",
    },
    {
      date: "03-07-25",
      orderNumber: "8080806291318",
      status: "Pending",
      total: "£450",
    },
    {
      date: "03-07-25",
      orderNumber: "8080806291318",
      status: "Completed",
      total: "£450",
    },
  ];

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
          <div className="overflow-visible rounded-xl">
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
                  {orders.map((order, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-[var(--table-border)]"
                    >
                      <td className="px-4 py-2">{order.date}</td>
                      <td className="px-4 py-2">{order.orderNumber}</td>
                      <td className="px-4 py-2">{order.total}</td>
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
                            <button className="block w-full border-b border-[var(--table-border)] text-center px-3 py-1 hover:bg-gray-100 text-[var(--color-dark-blue)] hover:text-[var(--color-red)] text-[12px] cursor-pointer">
                              {
                                profileLabels.profileOrderHistoryLabel
                                  .viewReceipt
                              }
                            </button>
                            <button className="block w-full border-b border-[var(--table-border)] text-center px-3 py-1 hover:bg-gray-100 text-[var(--color-dark-blue)] hover:text-[var(--color-red)] text-[12px] cursor-pointer">
                              {profileLabels.profileOrderHistoryLabel.viewOrder}
                            </button>
                            <button className="block w-full text-center px-3 py-1 hover:bg-gray-100 text-[var(--color-dark-blue)] hover:text-[var(--color-red)] text-[12px] cursor-pointer">
                              {profileLabels.profileOrderHistoryLabel.reOrder}
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
                  {orders.map((order, idx) => (
                    <tr
                      key={idx}
                      className="border-t-[2px] border-[var(--table-border)] text-[10px] md:text-[12px]"
                    >
                      <td className="px-4 py-6 whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        {order.orderNumber}
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        {order.status}
                      </td>
                      <td className="px-4 py-6 whitespace-nowrap">
                        {order.total}
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap flex gap-2">
                        <Button className="h-[23px] w-[105px] px-3 py-1 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-red-hover)] text-[10px] md:text-[12px] font-normal">
                          {profileLabels.profileOrderHistoryLabel.viewReceipt}
                        </Button>
                        <Button className="h-[23px] w-[105px] px-3 py-1 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-red-hover)] text-[10px] md:text-[12px] font-normal">
                          {profileLabels.profileOrderHistoryLabel.viewOrder}
                        </Button>
                        <Button className="h-[23px] w-[105px] px-3 py-1 rounded-full bg-[var(--color-dark-blue)] hover:bg-[var(--color-red-hover)] text-[10px] md:text-[12px] font-normal">
                          {profileLabels.profileOrderHistoryLabel.reOrder}
                        </Button>
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
