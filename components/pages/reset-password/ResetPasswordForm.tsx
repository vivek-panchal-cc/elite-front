import React, { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import { commonLabels, loginLabels } from "@/lib/labels";
import { loginSchema } from "@/lib/validations/loginSchema";
import { toast } from "sonner";
import { IconEyeClose, IconEyeOpen } from "@/components/images/icons";
import { Label } from "@/components/ui/Label";
import { login } from "@/http/auth/login";
import { useRouter } from "next/navigation";
import { AUTH_ENDPOINTS } from "@/constants/urls";
import { resetPasswordSchema } from "@/lib/validations/resetPasswordSchema";
import { apiRequest } from "@/lib/apiRequest";

interface ResetPasswordFormProps {
  setLoginClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword = ({ setLoginClose }: ResetPasswordFormProps) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await apiRequest.forgotPassword(values);
        if (!data.success) throw data.message;
        toast.success(data.message);
        setLoginClose(false);
        router.push("/");
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-2xl bg-white rounded-lg p-6 md:p-8 space-y-4 mx-auto"
    >
      <h2 className="text-xl font-bold text-left mb-2 text-[var(--color-blue)]">
        {loginLabels.resetPassword}
      </h2>

      {formik.status?.error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {formik.status.error}
        </div>
      )}

      <div className="space-y-1">
        <Label className="font-medium leading-[24.42px] tracking-[0px]">
          {loginLabels.email}
        </Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
          aria-label="Email"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-[50px]"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Submitting..." : commonLabels.submit}
      </Button>
    </form>
  );
};

export default ResetPassword;
