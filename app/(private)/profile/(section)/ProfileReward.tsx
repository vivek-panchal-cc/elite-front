import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";

interface ProfileRewardProps {
  isMobile?: boolean;
}

export default function ProfileReward({ isMobile }: ProfileRewardProps) {
  return (
    <div className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"}`}>
      <div
        className={`border border-[var(--color-red)] ${
          isMobile ? "border-t-0 rounded-t-none rounded-b-xl" : "rounded-xl"
        } px-6 py-6 sm:py-8 md:py-10 bg-[var(--color-light-gray)] shadow-sm`}
      >
        {/* Profile Info Header */}
        <div
          className={`flex ${
            isMobile ? "flex-col gap-3" : "justify-between items-center mb-6"
          }`}
        >
          <h3
            className={`font-bold text-[20px] sm:text-[22px] md:text-[25px] text-[var(--color-blue)]`}
          >
            Reward{" "}
          </h3>
          <div className={`flex gap-2 sm:gap-3 ${isMobile ? "flex-col" : ""}`}>
            <Button
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-white text-[12px] sm:text-sm md:text-sm font-medium hover:opacity-90`}
            >
              Change Password
            </Button>
            <Button
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-white text-[12px] sm:text-sm md:text-sm font-medium hover:opacity-90 flex items-center justify-center gap-1 ${
                isMobile ? "mb-4" : ""
              }`}
            >
              <Edit
                stroke="var(--color-white)"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Inputs */}
        <div
          className={`grid grid-cols-1 ${
            isMobile ? "gap-3" : "md:grid-cols-2 gap-4 mb-8"
          }`}
        >
          {["First Name", "Last Name", "Company Name", "Customer Email"].map(
            (label) => (
              <div key={label}>
                <Label className="font-medium text-sm sm:text-base md:text-base">
                  {label}
                </Label>
                <Input className="bg-[var(--color-white)] rounded-full mt-1 text-sm sm:text-base" />
              </div>
            )
          )}
        </div>

        {/* Address Section */}
        <h3
          className={`text-[18px] sm:text-[20px] md:text-[25px] font-bold text-[var(--color-blue)] mb-4 ${
            isMobile ? "mt-4" : ""
          }`}
        >
          Your Address
        </h3>

        {/* Billing Address */}
        <div className="mb-8">
          <h4 className="text-sm sm:text-md md:text-md font-semibold mb-2 sm:mb-3">
            Billing Address
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {[
              "First Name",
              "Telephone",
              "Last Name",
              "City/Town",
              "Company Name",
              "County/State",
              "Address1",
              "Postcode/Zip",
              "Address2",
              "Country",
            ].map((label) => (
              <div key={label}>
                <Label className="font-medium text-sm sm:text-base md:text-base">
                  {label}
                </Label>
                <Input className="bg-[var(--color-white)] rounded-full mt-1 text-sm sm:text-base" />
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h4 className="text-sm sm:text-md md:text-md font-semibold mb-2 sm:mb-3">
            Shipping Address
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {[
              "First Name",
              "Telephone",
              "Last Name",
              "City/Town",
              "Company Name",
              "County/State",
              "Address1",
              "Postcode/Zip",
              "Address2",
              "Country",
            ].map((label) => (
              <div key={label}>
                <Label className="font-medium text-sm sm:text-base md:text-base">
                  {label}
                </Label>
                <Input className="bg-[var(--color-white)] rounded-full mt-1 text-sm sm:text-base" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
