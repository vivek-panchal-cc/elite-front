import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";
import { profileLabels } from "@/lib/labels";
import useCompany from "@/hooks/useCompany";
import { addCompany } from "@/lib/apiRequest";
import { Company } from "@/types/company";
import { toast } from "sonner";
import { companySchema } from "@/lib/validations/companySchema";
import RoundedAdd from "@/components/images/svgs/RoundedAdd";
import LoaderBranch from "@/components/loaders/LoaderBranch";
import { IsMobileProps } from "@/types/profile";

export default function ProfileCompany({ isMobile }: IsMobileProps) {
  const [loading, companyDetails, reloadCompany] = useCompany();
  const [company, setCompany] = useState<Company[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (companyDetails) {
      if (
        typeof companyDetails === "object" &&
        !Array.isArray(companyDetails)
      ) {
        setCompany([companyDetails]);
      } else if (Array.isArray(companyDetails)) {
        setCompany(companyDetails);
      }
    } else {
      setCompany([]);
    }
    return () => {
      setIsAdding(false);
      setEditIndex(null);
      setEditingCompanyId(null);
    };
  }, [companyDetails]);

  const formik = useFormik({
    initialValues: {
      company_name: "",
      address_line1: "",
      address_line2: "",
      country: "",
      city: "",
      postcode: "",
    },
    validationSchema: companySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { data } = await addCompany(values);
        if (!data.success) throw data.message;
        toast.success(data.message);
        resetForm();
        setIsAdding(false);
        setEditIndex(null);
        setEditingCompanyId(null);
        reloadCompany();
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAdd = () => {
    setIsAdding(true);
    formik.resetForm();
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    const companyToEdit = company[idx];
    setEditingCompanyId(companyToEdit.id);
    setIsAdding(true);
    formik.setValues({
      company_name: companyToEdit.company_name,
      address_line1: companyToEdit.address_line1,
      address_line2: companyToEdit.address_line2,
      country: companyToEdit.country,
      city: companyToEdit.city,
      postcode: companyToEdit.postcode,
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
            : "max-h-[525px] rounded-xl" //min-h-[525px]
        } bg-[var(--color-light-gray)] shadow-sm`}
      >
        {/* Header */}

        <div className="flex justify-between items-center px-6 py-6 border-b-[2px] border-[var(--table-border)]">
          <h3 className="font-bold text-[16px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]">
            {profileLabels.myCompany}
          </h3>
          {company.length === 0 && !isAdding && (
            <Button
              className="min-w-[78px] max-h-[25px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] font-normal"
              onClick={handleAdd}
            >
              <RoundedAdd />
              {profileLabels.profileCompanyLabel.companyAdd}
            </Button>
          )}
        </div>

        {/* Add or Edit Form OR Company List */}
        <div className="overflow-hidden rounded-xl">
          <div
            className={`custom-scrollbar ${
              isMobile
                ? "max-h-[480px]" //min-h-[480px]
                : "max-h-[250px]" //min-h-[250px]
            }`}
          >
            {isAdding ? (
              <form onSubmit={formik.handleSubmit}>
                <div className="p-6 bg-[var(--color-light-gray)]">
                  <div className="flex justify-end mb-6 gap-3">
                    <Button
                      type="submit"
                      className="min-w-[78px] max-h-[25px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] font-normal"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? editingCompanyId !== null
                          ? profileLabels.profileCompanyLabel.companyUpdating
                          : profileLabels.profileCompanyLabel.companySaving
                        : editingCompanyId !== null
                        ? profileLabels.profileCompanyLabel.companyUpdate
                        : profileLabels.profileCompanyLabel.companySave}
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
                      {profileLabels.profileCompanyLabel.companyCancel}
                    </Button>
                  </div>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-20px] ${
                      isMobile ? "px-0" : "px-10"
                    }`}
                  >
                    {/* Company Name */}
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {profileLabels.profileCompanyLabel.companyName}
                      </Label>
                      <Input
                        name="company_name"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.company_name}
                        placeholder="Company Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          (formik.touched.company_name &&
                            formik.errors.company_name) as string
                        }
                      />
                    </div>

                    {/* Address 2 */}
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {profileLabels.profileCompanyLabel.addressLine2}
                      </Label>
                      <Input
                        name="address_line2"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.address_line2}
                        placeholder="Address Line 2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          (formik.touched.address_line2 &&
                            formik.errors.address_line2) as string
                        }
                      />
                    </div>

                    {/* Country */}
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {profileLabels.profileCompanyLabel.country}
                      </Label>
                      <Input
                        name="country"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.country}
                        placeholder="Country"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          (formik.touched.country &&
                            formik.errors.country) as string
                        }
                      />
                    </div>

                    {/* Address 1 */}
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {profileLabels.profileCompanyLabel.addressLine1}
                      </Label>
                      <Input
                        name="address_line1"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.address_line1}
                        placeholder="Address Line 1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          (formik.touched.address_line1 &&
                            formik.errors.address_line1) as string
                        }
                      />
                    </div>

                    {/* Postcode */}
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {profileLabels.profileCompanyLabel.postCode}
                      </Label>
                      <Input
                        name="postcode"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.postcode}
                        placeholder="Post Code"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          (formik.touched.postcode &&
                            formik.errors.postcode) as string
                        }
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-1">
                      <Label className="ml-0 font-bold text-sm sm:text-base md:text-base text-[var(--color-black)]">
                        {profileLabels.profileCompanyLabel.city}
                      </Label>
                      <Input
                        name="city"
                        className="max-h-[30px] bg-[var(--color-white)] border border-[var(--color-red)] focus-visible:border-[var(--color-red)] focus-visible:ring-1 focus-visible:ring-[var(--color-red)] placeholder:text-[14px]"
                        value={formik.values.city}
                        placeholder="City"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          (formik.touched.city && formik.errors.city) as string
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex flex-col divide-y-[2px] divide-[var(--table-border)]">
                {loading ? (
                  <LoaderBranch isMobile={isMobile} />
                ) : company.length <= 0 ? (
                  <div className="flex flex-col items-center justify-center h-full w-full p-6 text-sm text-[var(--color-gray)]">
                    {profileLabels.profileCompanyLabel.noCompany}
                    {/* {isMobile && !isAdding && (
                      <Button
                        className="min-w-[78px] max-h-[25px] bg-[var(--color-dark-blue)] text-[var(--color-white)] rounded-full px-5 py-2 text-[12px] font-normal mt-4"
                        onClick={handleAdd}
                      >
                        <RoundedAdd />
                        {profileLabels.profileCompanyLabel.companyAdd}
                      </Button>
                    )} */}
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
                              {co.company_name}
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
                              {co.company_name}
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
                            {co.company_name}
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
                                {co.address_line1}
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
                                {co.address_line2}
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
                              <p className="font-semibold text-sm">
                                {profileLabels.profileCompanyLabel.city}
                              </p>
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
