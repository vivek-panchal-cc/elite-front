import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";
import { profileLabels } from "@/lib/labels";
import { useRouter } from "next/navigation";

interface ProfileInfoProps {
  isMobile?: boolean;
}

export default function ProfileInfo({ isMobile }: ProfileInfoProps) {
  const router = useRouter();
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
          {!isMobile && (
            <h3
              className={`font-bold text-[20px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]`}
            >
              {profileLabels.profileInfo}
            </h3>
          )}
          <div className={`flex gap-2 sm:gap-3 ${isMobile ? "flex-col" : ""}`}>
            <Button
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] text-[12px] sm:text-[12px] md:text-[12px] font-medium hover:opacity-90`}
              onClick={() => router.push("/change-password")}
            >
              {profileLabels.changePass}
            </Button>
            <Button
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] text-[12px] sm:text-[12px] md:text-[12px] font-medium hover:opacity-90 flex items-center justify-center gap-1 ${
                isMobile ? "mb-4" : ""
              }`}
            >
              <Edit
                stroke="var(--color-white)"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              {profileLabels.editProf}
            </Button>
          </div>
        </div>

        {/* Profile Inputs */}
        <div
          className={`grid grid-cols-1 ${
            isMobile ? "gap-3" : "md:grid-cols-2 gap-4 mb-8"
          }`}
        >
          {[
            profileLabels.firstName,
            profileLabels.lastName,
            profileLabels.companyName,
            profileLabels.customerEmail,
          ].map((label) => (
            <div key={label}>
              <Label className="font-medium text-sm sm:text-base md:text-base">
                {label}
              </Label>
              <Input className="bg-[var(--color-white)] rounded-full mt-1 text-sm sm:text-base" />
            </div>
          ))}
        </div>

        {/* Address Section */}
        <h3
          className={`text-[18px] sm:text-[20px] md:text-[25px] font-bold text-[var(--color-dark-blue)] mb-4 ${
            isMobile ? "mt-4" : ""
          }`}
        >
          {profileLabels.yourAddress}
        </h3>

        {/* Billing Address */}
        <div className="mb-8">
          <h4 className="text-sm sm:text-md md:text-md font-semibold mb-2 sm:mb-3">
            {profileLabels.billingAddress}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {[
              profileLabels.billing.firstName,
              profileLabels.billing.telephone,
              profileLabels.billing.lastName,
              profileLabels.billing.cityOrTown,
              profileLabels.billing.companyName,
              profileLabels.billing.countryOrState,
              profileLabels.billing.address1,
              profileLabels.billing.postcode,
              profileLabels.billing.address2,
              profileLabels.billing.country,
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
          <div className={`${isMobile ? "" : "flex justify-between"}`}>
            <h4 className="text-sm sm:text-md md:text-md font-semibold mb-2 sm:mb-3">
              {profileLabels.shipping.shippingAdd}
            </h4>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="sameAsBilling"
                className="w-3 h-3 accent-[var(--color-red)] mr-2"
              />
              <label
                htmlFor="sameAsBilling"
                className="text-xs sm:text-xs md:text-xs lg:text-xs font-medium cursor-pointerr"
              >
                {profileLabels.shipping.sameAsBillingAdd}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {[
              profileLabels.shipping.firstName,
              profileLabels.shipping.telephone,
              profileLabels.shipping.lastName,
              profileLabels.shipping.cityOrTown,
              profileLabels.shipping.companyName,
              profileLabels.shipping.countryOrState,
              profileLabels.shipping.address1,
              profileLabels.shipping.postcode,
              profileLabels.shipping.address2,
              profileLabels.shipping.country,
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
