import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import Edit from "@/components/images/svgs/Edit";
import { Label } from "@/components/ui/Label";
import { commonLabels, profileLabels } from "@/lib/labels";
import { useRouter } from "next/navigation";
import { useAuthStoreWithAutoRefresh } from "@/stores/AuthStoreDealer";
import { userProfileSchema } from "@/lib/validations/userProfileSchema";
import { useFormik } from "formik";
import { apiRequest } from "@/lib/apiRequest";
import { toast } from "sonner";
import { useLoader } from "@/components/providers/loader-provider";

interface ProfileInfoProps {
  isMobile?: boolean;
}

export default function ProfileInfo({ isMobile }: ProfileInfoProps) {
  const { setIsLoading } = useLoader();
  const { user } = useAuthStoreWithAutoRefresh();
  const [isEditing, setIsEditing] = React.useState(false);
  const [sameAsBilling, setSameAsBilling] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.user_fname || "",
      lastName: user?.user_lname || "",
      companyName: user?.user_cname || "",
      customerEmail: user?.user_email || "",
      billing: {
        firstName: user?.user_s_fname || "",
        telephone: user?.user_phone || "",
        lastName: user?.user_s_lname || "",
        cityOrTown: user?.user_city || "",
        companyName: user?.user_cname || "",
        countryOrState: user?.user_county || "",
        address1: user?.user_address1 || "",
        postcode: user?.user_post || "",
        address2: user?.user_address2 || "",
        country: user?.user_country || "",
      },
      shipping: {
        firstName: user?.user_s_fname || "",
        telephone: user?.user_s_phone || "",
        lastName: user?.user_s_lname || "",
        cityOrTown: user?.user_s_city || "",
        companyName: user?.user_s_cname || "",
        countryOrState: user?.user_s_county || "",
        address1: user?.user_s_address1 || "",
        postcode: user?.user_s_post || "",
        address2: user?.user_s_address2 || "",
        country: user?.user_s_country || "",
      },
    },
    validationSchema: userProfileSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setIsLoading(true);
      const payload = {
        user_fname: values.firstName,
        user_lname: values.lastName,
        user_cname: values.companyName,
        user_email: values.customerEmail,
        user_address1: values.billing.address1,
        user_address2: values.billing.address2,
        user_city: values.billing.cityOrTown,
        user_county: values.billing.countryOrState,
        user_country: values.billing.country,
        user_post: values.billing.postcode,
        user_phone: values.billing.telephone,
        user_s_fname: values.shipping.firstName,
        user_s_lname: values.shipping.lastName,
        user_s_cname: values.shipping.companyName,
        user_s_address1: values.shipping.address1,
        user_s_address2: values.shipping.address2,
        user_s_city: values.shipping.cityOrTown,
        user_s_county: values.shipping.countryOrState,
        user_s_country: values.shipping.country,
        user_s_post: values.shipping.postcode,
        user_s_phone: values.shipping.telephone,
      };
      try {
        const { data } = await apiRequest.updateProfile(payload);
        if (!data.success) throw data.message;
        toast.success(data.message);
        setIsEditing(false);
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (sameAsBilling) {
      formik.setFieldValue("shipping", { ...formik.values.billing });
    }
  }, [sameAsBilling, formik.values.billing]);

  const prevSameAsBilling = useRef(sameAsBilling);

  useEffect(() => {
    if (prevSameAsBilling.current && !sameAsBilling) {
      // Clear only when it changes from true → false
      formik.setFieldValue("shipping", {
        firstName: "",
        telephone: "",
        lastName: "",
        cityOrTown: "",
        companyName: "",
        countryOrState: "",
        address1: "",
        postcode: "",
        address2: "",
        country: "",
      });
    }
    prevSameAsBilling.current = sameAsBilling;
  }, [sameAsBilling]);

  return (
    <div className={`${isMobile ? "w-[95%] mx-auto" : "w-3/4"}`}>
      <form
        onSubmit={formik.handleSubmit}
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
            <h3 className="font-bold text-[20px] sm:text-[22px] md:text-[25px] text-[var(--color-dark-blue)]">
              {profileLabels.profileInfo}
            </h3>
          )}
          <div className={`flex gap-2 sm:gap-3 ${isMobile ? "flex-col" : ""}`}>
            {!isEditing ? (
              <>
                <Button
                  type="button"
                  className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-white text-[12px] font-medium hover:opacity-90"
                  onClick={() => router.push("/change-password")}
                >
                  {profileLabels.changePass}
                </Button>
                <Button
                  type="button"
                  className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-white text-[12px] font-medium hover:opacity-90 flex items-center justify-center gap-1"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit
                    stroke="var(--color-white)"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  {profileLabels.editProf}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  className="min-w-[75px] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--color-dark-blue)] text-[var(--color-white)] text-[12px] font-medium hover:opacity-90 flex items-center justify-center gap-1"
                >
                  {commonLabels.update}
                </Button>
                <Button
                  type="button"
                  className="bg-gray-300 text-[var(--color-black)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] text-[12px] rounded-full px-5 py-2"
                  onClick={() => {
                    setIsEditing(false);
                    formik.resetForm();
                    setSameAsBilling(false);
                  }}
                >
                  {commonLabels.cancel}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Profile Inputs */}
        <div
          className={`grid grid-cols-1 ${
            isMobile ? "gap-3 p-4" : "md:grid-cols-2 gap-4 mb-8"
          }`}
        >
          {[
            { name: "firstName", label: profileLabels.firstName },
            { name: "lastName", label: profileLabels.lastName },
            { name: "companyName", label: profileLabels.companyName },
            { name: "customerEmail", label: profileLabels.customerEmail },
          ].map(({ name, label }) => (
            <div key={name}>
              <Label className="font-medium text-sm sm:text-base md:text-base">
                {label}
              </Label>
              <Input
                name={name}
                value={(formik.values as any)[name]}
                onChange={formik.handleChange}
                readOnly={!isEditing}
                className={`bg-[var(--color-white)] rounded-full mt-1 text-sm sm:text-base ${
                  !isEditing ? "opacity-75 cursor-not-allowed" : ""
                }`}
                error={
                  formik.touched[name as keyof typeof formik.values] &&
                  (formik.errors[name as keyof typeof formik.errors] as string)
                }
              />
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
            {Object.entries(formik.values.billing).map(([key, value]) => (
              <div key={key}>
                <Label className="font-medium text-sm sm:text-base md:text-base">
                  {
                    profileLabels.billing[
                      key as keyof typeof profileLabels.billing
                    ]
                  }
                </Label>
                <Input
                  name={`billing.${key}`}
                  value={value}
                  onChange={formik.handleChange}
                  readOnly={!isEditing}
                  className={`bg-[var(--color-white)] rounded-full mt-1 text-sm sm:text-base ${
                    !isEditing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  error={
                    formik.touched.billing?.[
                      key as keyof typeof formik.values.billing
                    ] &&
                    (formik.errors.billing?.[
                      key as keyof typeof formik.errors.billing
                    ] as string)
                  }
                />
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
                checked={sameAsBilling}
                onChange={(e) => setSameAsBilling(e.target.checked)}
                className={`w-3 h-3 accent-[var(--color-red)] mr-2 ${
                  !isEditing ? "cursor-not-allowed" : ""
                }`}
                disabled={!isEditing}
              />
              <label
                htmlFor="sameAsBilling"
                className={`text-xs sm:text-xs md:text-xs lg:text-xs font-medium ${
                  !isEditing ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {profileLabels.shipping.sameAsBillingAdd}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {Object.entries(formik.values.shipping).map(([key, value]) => (
              <div key={key}>
                <Label className="font-medium text-sm sm:text-base md:text-base">
                  {
                    profileLabels.shipping[
                      key as keyof typeof profileLabels.shipping
                    ]
                  }
                </Label>
                <Input
                  name={`shipping.${key}`}
                  value={value}
                  onChange={formik.handleChange}
                  readOnly={!isEditing}
                  className={`bg-[var(--color-white)] rounded-full mt-1 text-sm sm:text-base ${
                    !isEditing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  error={
                    formik.touched.shipping?.[
                      key as keyof typeof formik.values.shipping
                    ] &&
                    (formik.errors.shipping?.[
                      key as keyof typeof formik.errors.shipping
                    ] as string)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
