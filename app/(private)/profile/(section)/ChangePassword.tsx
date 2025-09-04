"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import { commonLabels, changePassowrdLabels } from "@/lib/labels";
import { toast } from "sonner";
import { IconEyeClose, IconEyeOpen } from "@/components/images/icons";
import { Label } from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import { useLoader } from "@/components/providers/loader-provider";
import { apiRequest } from "@/lib/apiRequest";
import { changePasswordSchema } from "@/lib/validations/changePasswordSchema";
import Breadcrumb from "@/components/ui/Breadrumb";

interface FormValues {
  // email: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface onBackProps {
  onBack?: () => void;
}

const ChangePassword = ({ onBack }: onBackProps) => {
  const router = useRouter();
  const { setIsLoading } = useLoader();
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      // email: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setIsLoading(true);
      try {
        const { confirm_password, ...payload } = values;
        const { data } = await apiRequest.changePassword(payload);
        if (!data.success) throw data.message;
        toast.success(data.message);
        formik.resetForm();
        onBack?.();
        // router.push("/profile");
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <h2 className="text-xl font-bold text-left mb-2 text-[var(--color-blue)]">
        {changePassowrdLabels.changePassword}
      </h2>

      {formik.status?.error && (
        <div className="text-[var(--color-red)] text-sm p-2 bg-red-50 rounded">
          {formik.status.error}
        </div>
      )}

      {/* <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {changePassowrdLabels.email}
          </Label>
          <Input
            type="text"
            name="email"
            className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px]"
            placeholder="Enter Email"
            autoComplete="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            aria-label="Email"
          />
        </div> */}

      <div className="space-y-1 relative">
        <Label className="font-medium leading-[24.42px] tracking-[0px]">
          {changePassowrdLabels.oldPassword}
        </Label>
        <Input
          type={showOldPassword ? "text" : "password"}
          name="old_password"
          className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px]"
          placeholder="Enter Old Password"
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.old_password}
          //   onCopy={(e) => e.preventDefault()}
          //   onPaste={(e) => e.preventDefault()}
          error={formik.touched.old_password && formik.errors.old_password}
          aria-label="Password"
        />
        <span
          className="absolute right-3 top-9 cursor-pointer"
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          {showOldPassword ? <IconEyeClose /> : <IconEyeOpen />}
        </span>
      </div>

      <div className="space-y-1 relative">
        <Label className="font-medium leading-[24.42px] tracking-[0px]">
          {changePassowrdLabels.newPassword}
        </Label>
        <Input
          type={showNewPassword ? "text" : "password"}
          name="new_password"
          className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px]"
          placeholder="Enter New Password"
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.new_password}
          //   onCopy={(e) => e.preventDefault()}
          //   onPaste={(e) => e.preventDefault()}
          error={formik.touched.new_password && formik.errors.new_password}
          aria-label="Password"
        />
        <span
          className="absolute right-3 top-9 cursor-pointer"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? <IconEyeClose /> : <IconEyeOpen />}
        </span>
      </div>

      <div className="space-y-1 relative">
        <Label className="font-medium leading-[24.42px] tracking-[0px]">
          {changePassowrdLabels.confirmPassword}
        </Label>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          name="confirm_password"
          className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px]"
          placeholder="Enter Confirm Password"
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_password}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          error={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
          aria-label="Password"
        />
        <span
          className="absolute right-3 top-9 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <IconEyeClose /> : <IconEyeOpen />}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <Button
          type="submit"
          className="w-full sm:w-fit rounded-[50px] text-[12px]"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting
            ? "Submitting..."
            : changePassowrdLabels.changePassword}
        </Button>

        {!formik.isSubmitting && (
          <Button
            type="button"
            className="w-full sm:w-fit bg-gray-300 text-[var(--color-black)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] rounded-[50px] px-5 py-2 text-[12px]"
            disabled={formik.isSubmitting}
            onClick={() => {
              formik.resetForm();
              onBack?.();
            }}
          >
            {commonLabels.cancel}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ChangePassword;
