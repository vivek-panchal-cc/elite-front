import React, { useEffect, useRef, useState } from "react";
import { profileLabels } from "@/lib/labels";
import Image from "next/image";
import { productOne, userIcon } from "@/components/images";
import { IsMobileProps } from "@/types/profile";

export default function ProfileRepDetails({ isMobile }: IsMobileProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const details = [
    {
      date: "03-07-25",
      repName: "Rep Name",
      phoneNo: "8181818181",
      email: "loreumispum@gmail.com",
    },
    {
      date: "03-07-25",
      repName: "Rep Name",
      phoneNo: "8181818181",
      email: "loreumispum@gmail.com",
    },
    {
      date: "03-07-25",
      repName: "Rep Name",
      phoneNo: "8181818181",
      email: "loreumispum@gmail.com",
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
            ? "max-h-[250px] min-h-[250px] border-t-0 rounded-t-none rounded-b-xl"
            : "max-h-[470px] min-h-[470px] rounded-xl"
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
              {profileLabels.repDetails}
            </h3>
          )}
        </div>

        {isMobile ? (
          // Mobile table
          <div className="overflow-visible rounded-xl">
            <div className="pt-4 custom-scrollbar max-h-[240px] min-h-[240px] overflow-y-auto space-y-4">
              {details.map((dt, idx) => (
                <div
                  key={idx}
                  className="flex items-center border-b-[2px] border-[var(--table-border)] last:border-b-0 p-4 px-6 mb-0"
                >
                  {/* Left side: Avatar + Rep Name */}
                  <div className="flex-shrink-0 flex flex-col items-center mr-6">
                    <div className="relative w-[56px] h-[56px] rounded-full border border-[var(--color-red)] flex items-center justify-center overflow-hidden">
                      <Image
                        src={productOne || userIcon}
                        alt="User"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <span className="mt-2 text-[12px] font-medium text-center">
                      {dt.repName}
                    </span>
                  </div>

                  {/* Right side: Phone + Email */}
                  <div className="flex flex-col text-[12px] space-y-2">
                    <div>
                      <div className="font-semibold">
                        {profileLabels.profileRepLabel.phoneNo}
                      </div>
                      <div>{dt.phoneNo}</div>
                    </div>

                    <div>
                      <div className="font-semibold">
                        {profileLabels.profileRepLabel.email}
                      </div>
                      <div>{dt.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop table
          <div className="overflow-hidden rounded-xl">
            <div className="custom-scrollbar max-h-[375px] min-h-[375px]">
              <table className="w-full max-w-[792px] rounded-lg">
                <thead className="border-b border-[var(--color-gray)] text-[10px] md:text-[12px]">
                  <tr className="text-left text-[12px] md:text-[14px] font-medium">
                    <th className="py-3 whitespace-nowrap"></th>
                    <th className="py-3 whitespace-nowrap">
                      {profileLabels.profileRepLabel.repName}
                    </th>
                    <th className="py-3 whitespace-nowrap">
                      {profileLabels.profileRepLabel.phoneNo}
                    </th>
                    <th className="py-3 whitespace-nowrap">
                      {profileLabels.profileRepLabel.email}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[10px] md:text-[12px]">
                  {details.map((dt, idx) => (
                    <tr
                      key={idx}
                      className="border-t-[2px] border-[var(--table-border)] text-[10px] md:text-[12px]"
                    >
                      <td className="py-4 whitespace-nowrap flex justify-center">
                        <div className="relative w-[76px] h-[76px] rounded-full border border-[var(--color-red)] flex items-center justify-center overflow-hidden">
                          <Image
                            src={productOne || userIcon}
                            alt="Product"
                            width={30}
                            height={30}
                            className="object-contain"
                          />
                        </div>
                      </td>

                      <td className="py-4 whitespace-nowrap">{dt.repName}</td>
                      <td className="py-4 whitespace-nowrap">{dt.phoneNo}</td>
                      <td className="py-4 whitespace-nowrap">{dt.email}</td>
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
