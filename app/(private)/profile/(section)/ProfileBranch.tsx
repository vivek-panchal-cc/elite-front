import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import RoundedAdd from "@/components/images/svgs/RoundedAdd";
import Delete from "@/components/images/svgs/Delete";
import { Label } from "@/components/ui/Label";
import { profileLabels } from "@/lib/labels";
interface Branch {
  branchName: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  postcode: string;
}
interface ProfileBranchProps {
  isMobile?: boolean;
}

export default function ProfileBranch({ isMobile }: ProfileBranchProps) {
  const [branches, setBranches] = useState<Branch[]>([
    {
      branchName: "Branch Name",
      address1: "It is a long established fact.",
      address2: "It is a long established fact.",
      country: "India",
      city: "Ahmedabad",
      postcode: "382210",
    },
    {
      branchName: "Branch Name 2",
      address1: "Lorem Ipsum Dummy Text 2",
      address2: "Lorem Ipsum Dummy Text 2",
      country: "India",
      city: "Ahmedabad 2",
      postcode: "382212",
    },
  ]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formBranch, setFormBranch] = useState<Branch | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (field: keyof Branch, value: string) => {
    setFormBranch((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    if (!formBranch) return;

    if (editIndex !== null) {
      // Update existing branch
      const updated = [...branches];
      updated[editIndex] = formBranch;
      setBranches(updated);
      setEditIndex(null);
    } else {
      // Add new branch
      setBranches([...branches, formBranch]);
      setIsAdding(false);
    }
    setFormBranch(null);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setFormBranch({ ...branches[idx] });
  };

  const handleDelete = (idx: number) => {
    const updated = branches.filter((_, i) => i !== idx);
    setBranches(updated);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormBranch({
      branchName: "",
      address1: "",
      address2: "",
      country: "",
      city: "",
      postcode: "",
    });
  };

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] ${
          isMobile
            ? "max-h-[770px] min-h-[770px] border-t-0 rounded-t-none rounded-b-xl"
            : "max-h-[525px] min-h-[495px] rounded-xl"
        } bg-[var(--color-light-gray)] shadow-sm`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-6 border-b-[2px] border-[var(--table-border)] gap-2">
          <h3 className="font-bold text-[16px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]">
            {profileLabels.myBranches}
          </h3>
          <Button
            className="min-w-[78px] max-h-[25px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] font-normal"
            onClick={handleAdd}
          >
            <RoundedAdd />
            {profileLabels.profileMyBranchesLabel.addBranches}
          </Button>
        </div>

        {/* Add or Edit Form */}
        <div className="overflow-hidden rounded-xl">
          <div
            className={`custom-scrollbar ${
              isMobile
                ? "max-h-[690px] min-h-[690px]"
                : "max-h-[417px] min-h-[417px]"
            }`}
          >
            {(isAdding || editIndex !== null) && formBranch && (
              <div className="p-6 border-b-[2px] border-[var(--table-border)] bg-[var(--color-light-gray)]">
                <div className="flex justify-end mb-6 gap-3 mt-[-15px]">
                  <Button
                    className="min-w-[78px] max-h-[25px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] font-normal"
                    onClick={handleSave}
                  >
                    {profileLabels.profileMyBranchesLabel.branchSave}
                  </Button>
                  {/* <Button
                className="min-w-[78px] max-h-[25px] bg-gray-300 text-[var(--color-black)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] rounded-full px-5 py-2 text-sm"
                onClick={() => {
                  setFormBranch(null);
                  setEditIndex(null);
                  setIsAdding(false);
                }}
              >
                Cancel
              </Button> */}
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-30px] ${
                    isMobile ? "px-0" : "px-10"
                  }`}
                >
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {" "}
                      {profileLabels.profileMyBranchesLabel.branchName}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formBranch.branchName}
                      placeholder="Branch Name"
                      onChange={(e) =>
                        handleInputChange("branchName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {" "}
                      {profileLabels.profileMyBranchesLabel.addressLine1}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formBranch.address1}
                      placeholder="Address Line 1"
                      onChange={(e) =>
                        handleInputChange("address1", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {" "}
                      {profileLabels.profileMyBranchesLabel.addressLine2}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formBranch.address2}
                      placeholder="Address Line 2"
                      onChange={(e) =>
                        handleInputChange("address2", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {" "}
                      {profileLabels.profileMyBranchesLabel.postCode}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formBranch.postcode}
                      placeholder="Post Code"
                      onChange={(e) =>
                        handleInputChange("postcode", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {" "}
                      {profileLabels.profileMyBranchesLabel.country}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formBranch.country}
                      placeholder="Country"
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                      {" "}
                      {profileLabels.profileMyBranchesLabel.city}
                    </Label>
                    <Input
                      className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                      value={formBranch.city}
                      placeholder="City"
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Branch List */}
            <div className="flex flex-col divide-y-[2px] divide-[var(--table-border)]">
              {branches.length <= 0 ? (
                <div className="p-6 text-center text-sm text-[var(--color-gray)]">
                  {profileLabels.profileMyBranchesLabel.noBranches}
                </div>
              ) : (
                branches.map((branch, idx) => (
                  <div
                    key={idx}
                    className={`${
                      isMobile ? "p-6 pt-3" : "p-6 pl-15"
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
                        <div className="flex gap-2 w-full justify-end mb-2">
                          <Button
                            className="min-w-[78px] max-h-[25px] flex items-center gap-1 h-8 bg-[var(--color-dark-blue)] text-[var(--color-white)] px-3 rounded-full text-[12px] font-normal"
                            onClick={() => handleEdit(idx)}
                          >
                            <Edit
                              stroke="var(--color-white)"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                            {profileLabels.profileMyBranchesLabel.branchEdit}
                          </Button>
                          <Button
                            className="min-w-[78px] max-h-[25px] flex items-center gap-1 h-8 bg-[var(--color-red)] text-[var(--color-white)] hover:bg-[var(--color-red-hover)] px-3 rounded-full text-[12px] font-normal"
                            onClick={() => handleDelete(idx)}
                          >
                            <Delete className="w-4 h-4" />
                            {profileLabels.profileMyBranchesLabel.branchDelete}
                          </Button>
                        </div>
                      )}

                      {/* Branch name + buttons (desktop only) */}
                      {!isMobile && (
                        <div className="flex items-start justify-between w-full">
                          <h4 className="font-semibold text-lg">
                            {branch.branchName}
                          </h4>
                          <div className="flex gap-2 mt-[-10px]">
                            <Button
                              className="min-w-[78px] max-h-[25px] flex items-center gap-1 h-8 bg-[var(--color-red)] text-[var(--color-white)] hover:bg-[var(--color-red-hover)] px-3 rounded-full text-[12px] font-normal"
                              onClick={() => handleDelete(idx)}
                            >
                              <Delete className="w-4 h-4" />
                              {
                                profileLabels.profileMyBranchesLabel
                                  .branchDelete
                              }
                            </Button>
                            <Button
                              className="min-w-[78px] max-h-[25px] flex items-center gap-1 h-8 bg-[var(--color-dark-blue)] text-[var(--color-white)] px-3 rounded-full text-[12px] font-normal"
                              onClick={() => handleEdit(idx)}
                            >
                              <Edit
                                stroke="var(--color-white)"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                              />
                              {profileLabels.profileMyBranchesLabel.branchEdit}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Branch name (mobile version) */}
                      {isMobile && (
                        <h4 className="font-semibold text-lg">
                          {branch.branchName}
                        </h4>
                      )}
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
                              {
                                profileLabels.profileMyBranchesLabel
                                  .addressLine1
                              }
                            </p>
                            <p
                              className={`text-sm text-[var(--color-black)] ${
                                !isMobile ? "max-w-[200px] min-w-[200px]" : ""
                              }`}
                            >
                              {branch.address1}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {
                                profileLabels.profileMyBranchesLabel
                                  .addressLine2
                              }
                            </p>
                            <p
                              className={`text-sm text-[var(--color-black)] ${
                                !isMobile ? "max-w-[200px] min-w-[200px]" : ""
                              }`}
                            >
                              {branch.address2}
                            </p>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-2">
                          <div className={`${isMobile ? "mb-4" : ""}`}>
                            <p className="font-semibold text-sm">
                              {profileLabels.profileMyBranchesLabel.country}
                            </p>
                            <p className="text-sm text-[var(--color-black)]">
                              {branch.country}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {profileLabels.profileMyBranchesLabel.city}
                            </p>
                            <p className="text-sm text-[var(--color-black)]">
                              {branch.city}
                            </p>
                          </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-2 md:text-right">
                          <div>
                            <p className="font-semibold text-sm">
                              {profileLabels.profileMyBranchesLabel.postCode}
                            </p>
                            <p className="text-sm text-[var(--color-black)]">
                              {branch.postcode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
