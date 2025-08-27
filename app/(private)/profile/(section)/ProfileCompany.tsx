import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";
import { profileLabels } from "@/lib/labels";

interface Company {
  companyName: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  postcode: string;
}
interface ProfileCompanyProps {
  isMobile?: boolean;
}

export default function ProfileCompany({ isMobile }: ProfileCompanyProps) {
  const [company, setCompany] = useState<Company[]>([
    {
      companyName: "Communication Crafts Pvt. Ltd.",
      address1:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      address2:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      country: "India",
      city: "Ahmedabad",
      postcode: "382210",
    },
  ]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formCompany, setFormCompany] = useState<Company | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (field: keyof Company, value: string) => {
    setFormCompany((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    if (!formCompany) return;

    if (editIndex !== null) {
      const updated = [...company];
      updated[editIndex] = formCompany;
      setCompany(updated);
      setEditIndex(null);
    } else {
      setCompany([...company, formCompany]);
      setIsAdding(false);
    }
    setFormCompany(null);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setFormCompany({ ...company[idx] });
  };

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] ${
          isMobile
            ? "max-h-[490px] min-h-[490px] border-t-0 rounded-t-none rounded-b-xl"
            : "max-h-[290px] min-h-[280px] rounded-xl"
        } bg-[var(--color-light-gray)] shadow-sm`}
      >
        {/* Header */}
        {!isMobile && (
          <div className="flex justify-between items-center px-6 py-6 border-b-[2px] border-[var(--table-border)]">
            <h3 className="font-bold text-[16px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]">
              {profileLabels.myCompany}
            </h3>
          </div>
        )}

        {/* Add or Edit Form OR Company List */}
        <div className="overflow-hidden rounded-xl">
          <div
            className={`custom-scrollbar ${
              isMobile
                ? "max-h-[480px] min-h-[480px]"
                : "max-h-[200px] min-h-[200px]"
            }`}
          >
            {(isAdding || editIndex !== null) && formCompany ? (
              <div className="p-6 bg-[var(--color-light-gray)]">
                <div className="flex justify-end mb-6 gap-3">
                  <Button
                    className="min-w-[78px] max-h-[25px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] font-normal"
                    onClick={handleSave}
                  >
                    {profileLabels.profileCompanyLabel.companySave}
                  </Button>
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-25px] ${
                    isMobile ? "px-0" : "px-10"
                  }`}
                >
                  {/* Company Name */}
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {profileLabels.profileCompanyLabel.companyName}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formCompany.companyName}
                      placeholder="Company Name"
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                    />
                  </div>

                  {/* Address 1 */}
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {profileLabels.profileCompanyLabel.addressLine1}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formCompany.address1}
                      placeholder="Address Line 1"
                      onChange={(e) =>
                        handleInputChange("address1", e.target.value)
                      }
                    />
                  </div>

                  {/* Address 2 */}
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {profileLabels.profileCompanyLabel.addressLine2}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formCompany.address2}
                      placeholder="Address Line 2"
                      onChange={(e) =>
                        handleInputChange("address2", e.target.value)
                      }
                    />
                  </div>

                  {/* Postcode */}
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {profileLabels.profileCompanyLabel.postCode}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formCompany.postcode}
                      placeholder="Post Code"
                      onChange={(e) =>
                        handleInputChange("postcode", e.target.value)
                      }
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {profileLabels.profileCompanyLabel.country}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formCompany.country}
                      placeholder="Country"
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {profileLabels.profileCompanyLabel.city}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formCompany.city}
                      placeholder="City"
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              // COMPANY LIST (only visible when not editing/adding)
              <div className="flex flex-col divide-y-[2px] divide-[var(--table-border)]">
                {company.length <= 0 ? (
                  <div className="grid place-items-center h-full w-full p-6 text-sm text-[var(--color-gray)]">
                    {profileLabels.profileCompanyLabel.noCompany}
                  </div>
                ) : (
                  company.map((co, idx) => (
                    <div
                      key={idx}
                      className={`${
                        isMobile ? "p-6" : "p-6 pl-15"
                      } flex flex-col gap-2`}
                    >
                      {/* Header Row */}
                      <div
                        className={`flex ${
                          isMobile
                            ? "flex-col items-start"
                            : "flex-row items-start justify-between"
                        }`}
                      >
                        {/* Buttons - only top right in mobile */}
                        {isMobile && (
                          <div className="flex gap-2 w-full justify-between mb-2">
                            <h4 className="font-semibold text-lg">
                              {co.companyName}
                            </h4>
                            <Button
                              className="min-w-[78px] max-h-[25px] flex items-center gap-1 h-8 bg-[var(--color-dark-blue)] text-[var(--color-white)] px-3 rounded-full text-[12px] font-normal"
                              onClick={() => handleEdit(idx)}
                            >
                              <Edit
                                stroke="var(--color-white)"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                              />
                              {profileLabels.profileCompanyLabel.companyEdit}
                            </Button>
                          </div>
                        )}

                        {/* Company name + buttons (desktop only) */}
                        {!isMobile && (
                          <div className="flex items-start justify-between w-full">
                            <h4 className="font-semibold text-lg">
                              {co.companyName}
                            </h4>
                            <div className="flex gap-2 ">
                              <Button
                                className="min-w-[78px] max-h-[25px] flex items-center gap-1 h-8 bg-[var(--color-dark-blue)] text-[var(--color-white)] px-3 rounded-full text-[12px] font-normal"
                                onClick={() => handleEdit(idx)}
                              >
                                <Edit
                                  stroke="var(--color-white)"
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                                {profileLabels.profileCompanyLabel.companyEdit}
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Company name (mobile version) */}
                        {/* {isMobile && (
                          <h4 className="font-semibold text-lg">
                            {co.companyName}
                          </h4>
                        )} */}
                      </div>

                      {/* Info Section */}
                      <div className={`${isMobile ? "space-y-4" : "pr-20"}`}>
                        <div
                          className={`${
                            isMobile
                              ? "flex flex-col space-y-4"
                              : "flex flex-row justify-between gap-4"
                          }`}
                        >
                          {/* Column 1 */}
                          <div className="space-y-2">
                            <div className={`${isMobile ? "mb-4" : ""}`}>
                              <p className="font-semibold text-sm">
                                {profileLabels.profileCompanyLabel.addressLine1}
                              </p>
                              <p
                                className={`text-sm text-[var(--color-black)] ${
                                  !isMobile ? "max-w-[200px]" : ""
                                }`}
                              >
                                {co.address1}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-sm">
                                {profileLabels.profileCompanyLabel.addressLine2}
                              </p>
                              <p
                                className={`text-sm text-[var(--color-black)] ${
                                  !isMobile ? "max-w-[200px]" : ""
                                }`}
                              >
                                {co.address2}
                              </p>
                            </div>
                          </div>

                          {/* Column 2 */}
                          <div className="space-y-2">
                            <div className={`${isMobile ? "mb-4" : ""}`}>
                              <p className="font-semibold text-sm">
                                {" "}
                                {profileLabels.profileCompanyLabel.country}
                              </p>
                              <p className="text-sm text-[var(--color-black)]">
                                {co.country}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-sm">City</p>
                              <p className="text-sm text-[var(--color-black)]">
                                {co.city}
                              </p>
                            </div>
                          </div>

                          {/* Column 3 */}
                          <div className="space-y-2 md:text-right">
                            <div>
                              <p className="font-semibold text-sm">
                                {" "}
                                {profileLabels.profileCompanyLabel.postCode}
                              </p>
                              <p className="text-sm text-[var(--color-black)]">
                                {co.postcode}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
