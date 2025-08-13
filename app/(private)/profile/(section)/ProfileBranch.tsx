import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";

export default function ProfileBranch() {
  return (
    <div className="w-full md:w-3/4">
      <div className="border border-[var(--color-red)] rounded-xl px-6 py-10 bg-[var(--color-light-gray)] shadow-sm">
        {/* Profile Info */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[25px] font-bold text-[var(--color-blue)]">
            Branch
          </h3>
          <div className="flex gap-3">
            <Button className="px-4 py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[#c6143f] text-white text-sm font-medium hover:opacity-90">
              Change Password
            </Button>
            <Button className="px-4 py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[#c6143f] text-white text-sm font-medium hover:opacity-90">
              <Edit stroke="var(--color-white)" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {["First Name", "Last Name", "Company Name", "Customer Email"].map(
            (label) => (
              <div key={label}>
                <Label className="font-medium">{label}</Label>
                <Input className="bg-[var(--color-white)] rounded-full mt-1" />
              </div>
            )
          )}
        </div>

        {/* Address Section */}
        <h3 className="text-[25px] font-bold text-[var(--color-blue)] mb-4">
          Your Address
        </h3>

        {/* Billing Address */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-3">Billing Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label className="font-medium">{label}</Label>
                <Input className="bg-[var(--color-white)] rounded-full mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h4 className="text-md font-semibold mb-3">Shipping Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label className="font-medium">{label}</Label>
                <Input className="bg-[var(--color-white)] rounded-full mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
