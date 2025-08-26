import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/ButtonUI";
import { Input } from "@/components/ui/Input";
import Edit from "@/components/images/svgs/Edit";
import RoundedAdd from "@/components/images/svgs/RoundedAdd";
import Delete from "@/components/images/svgs/Delete";
import { Label } from "@/components/ui/Label";
import { profileLabels } from "@/lib/labels";
import useBranchList from "@/hooks/useBranches";
import { Branch } from "@/types/branches";
import { toast } from "sonner";
import { apiRequest } from "@/lib/apiRequest";
import { branchSchema } from "@/lib/validations/branchSchema";
import LoaderBranch from "@/components/loaders/LoaderBranch";
interface ProfileBranchProps {
  isMobile?: boolean;
}

export default function ProfileBranch({ isMobile }: ProfileBranchProps) {
  const [loading, branchList, reloadBranch] = useBranchList();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  React.useEffect(() => {
    if (branchList && Array.isArray(branchList)) {
      setBranches(branchList);
    }
    return () => {
      setIsAdding(false);
      setEditIndex(null);
      setEditingBranchId(null);
      setDeletingId(null);
    };
  }, [branchList]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editingBranchId, setEditingBranchId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const formik = useFormik({
    initialValues: {
      branch_name: "",
      address_line1: "",
      address_line2: "",
      country: "",
      city: "",
      postcode: "",
    },
    validationSchema: branchSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let response;
        if (editingBranchId !== null) {
          response = await apiRequest.updateBranch(
            editingBranchId.toString(),
            values
          );
        } else {
          response = await apiRequest.addBranch(values);
        }

        const { data } = response;
        if (!data.success) throw data.message;
        toast.success(data.message);
        resetForm();
        setIsAdding(false);
        setEditIndex(null);
        setEditingBranchId(null);
        reloadBranch();
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDelete = async (idx: number) => {
    const branch = branches[idx];
    setDeletingId(branch.id);
    try {
      const { data } = await apiRequest.deleteBranch(branch.id.toString());
      if (!data.success) throw data.message;
      reloadBranch();
      toast.success(data.message);
    } catch (error: any) {
      if (typeof error === "string") return toast.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    formik.resetForm();
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    const branch = branches[idx];
    setEditingBranchId(branch.id);
    setIsAdding(true);
    formik.setValues({
      branch_name: branch.branch_name,
      address_line1: branch.address_line1,
      address_line2: branch.address_line2,
      country: branch.country,
      city: branch.city,
      postcode: branch.postcode,
    });
  };

  return (
    <div
      className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"} overflow-hidden`}
    >
      <div
        className={`border border-[var(--color-red)] ${
          isMobile
            ? "max-h-[770px] border-t-0 rounded-t-none rounded-b-xl" //min-h-[770px]
            : "max-h-[525px] rounded-xl" //min-h-[495px]
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
                ? "max-h-[690px]" //min-h-[690px]
                : "max-h-[417px]" //min-h-[417px]
            }`}
          >
            {isAdding && (
              <form onSubmit={formik.handleSubmit}>
                <div className="p-6 border-b-[2px] border-[var(--table-border)] bg-[var(--color-light-gray)]">
                  <div className="flex justify-end mb-6 gap-3 mt-[-15px]">
                    <Button
                      type="submit"
                      className="min-w-[78px] max-h-[25px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] font-normal"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? editingBranchId !== null
                          ? profileLabels.profileMyBranchesLabel.branchUpdating
                          : profileLabels.profileMyBranchesLabel.branchSaving
                        : editingBranchId !== null
                        ? profileLabels.profileMyBranchesLabel.branchUpdate
                        : profileLabels.profileMyBranchesLabel.branchSave}
                    </Button>
                    <Button
                      type="button"
                      className="min-w-[78px] max-h-[25px] bg-gray-300 text-[var(--color-black)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] rounded-full px-5 py-2 text-sm"
                      onClick={() => {
                        formik.resetForm();
                        setEditIndex(null);
                        setIsAdding(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-20px] ${
                      isMobile ? "px-0" : "px-10"
                    }`}
                  >
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {" "}
                        {profileLabels.profileMyBranchesLabel.branchName}
                      </Label>
                      <Input
                        name="branch_name"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.branch_name}
                        placeholder="Branch Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.branch_name &&
                          formik.errors.branch_name
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {" "}
                        {profileLabels.profileMyBranchesLabel.addressLine1}
                      </Label>
                      <Input
                        name="address_line1"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.address_line1}
                        placeholder="Address Line 1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.address_line1 &&
                          formik.errors.address_line1
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {" "}
                        {profileLabels.profileMyBranchesLabel.addressLine2}
                      </Label>
                      <Input
                        name="address_line2"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.address_line2}
                        placeholder="Address Line 2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.address_line2 &&
                          formik.errors.address_line2
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {" "}
                        {profileLabels.profileMyBranchesLabel.postCode}
                      </Label>
                      <Input
                        name="postcode"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.postcode}
                        placeholder="Post Code"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.postcode && formik.errors.postcode
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {" "}
                        {profileLabels.profileMyBranchesLabel.country}
                      </Label>
                      <Input
                        name="country"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.country}
                        placeholder="Country"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && formik.errors.country}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {" "}
                        {profileLabels.profileMyBranchesLabel.city}
                      </Label>
                      <Input
                        name="city"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.city}
                        placeholder="City"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.city && formik.errors.city}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Branch List */}
            <div className="flex flex-col divide-y-[2px] divide-[var(--table-border)]">
              {loading ? (
                <LoaderBranch isMobile={isMobile} />
              ) : branches.length <= 0 ? (
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
                            disabled={deletingId === branch.id}
                          >
                            <Delete className="w-4 h-4" />
                            {deletingId === branch.id
                              ? profileLabels.profileMyBranchesLabel
                                  .branchDeleting
                              : profileLabels.profileMyBranchesLabel
                                  .branchDelete}
                          </Button>
                        </div>
                      )}

                      {/* Branch name + buttons (desktop only) */}
                      {!isMobile && (
                        <div className="flex items-start justify-between w-full">
                          <h4 className="font-semibold text-lg">
                            {branch.branch_name}
                          </h4>
                          <div className="flex gap-2 mt-[-10px]">
                            <Button
                              className="min-w-[78px] max-h-[25px] flex items-center gap-1 h-8 bg-[var(--color-red)] text-[var(--color-white)] hover:bg-[var(--color-red-hover)] px-3 rounded-full text-[12px] font-normal"
                              onClick={() => handleDelete(idx)}
                              disabled={deletingId === branch.id}
                            >
                              <Delete className="w-4 h-4" />
                              {deletingId === branch.id
                                ? profileLabels.profileMyBranchesLabel
                                    .branchDeleting
                                : profileLabels.profileMyBranchesLabel
                                    .branchDelete}
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
                          {branch.branch_name}
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
                              {branch.address_line1}
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
                              {branch.address_line2}
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
