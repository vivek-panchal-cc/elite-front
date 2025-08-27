import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/ButtonUI";
import { commonLabels, loginLabels, registrationLabels } from "@/lib/labels";
import { loginSchema } from "@/lib/validations/loginSchema";
import { toast } from "sonner";
import { IconEyeClose, IconEyeOpen } from "@/components/images/icons";
import { Label } from "@/components/ui/Label";
import { login } from "@/http/auth/login";
import { useRouter } from "next/navigation";
import { AUTH_ENDPOINTS } from "@/constants/urls";
import { resetPasswordSchema } from "@/lib/validations/resetPasswordSchema";
import { apiRequest } from "@/lib/apiRequest";
import ReCAPTCHA from "react-google-recaptcha";
import { Input } from "@/components/ui/Input";

interface FormValues {
  email: string;
  captcha: boolean;
  g_recaptcha_token: string;
}
interface ResetPasswordFormProps {
  setLoginClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ResetPassword = ({ setLoginClose }: ResetPasswordFormProps) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      captcha: false,
      g_recaptcha_token: captchaToken ?? "",
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
      className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg p-6 md:p-8 space-y-4 mx-auto"
    >
      <h2 className="text-xl font-bold text-left mb-2 text-[var(--color-blue)]">
        {loginLabels.resetPassword}
      </h2>

      {formik.status?.error && (
        <div className="text-[var(--color-red)] text-sm p-2 bg-red-50 rounded">
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

      <div className="flex justify-left">
        {SITE_KEY ? (
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={(token: string | null) => {
              setCaptchaToken(token);
              formik.setFieldValue("captcha", Boolean(token));
              formik.setFieldValue("g_recaptcha_token", token || "");
            }}
            onExpired={() => {
              setCaptchaToken(null);
              formik.setFieldValue("captcha", false);
              formik.setFieldValue("g_recaptcha_token", "");
            }}
          />
        ) : (
          <div className="text-[var(--color-red)] text-sm">
            {registrationLabels.reCaptchaMissing}
          </div>
        )}
      </div>
      {formik.touched.captcha && formik.errors.captcha && (
        <div className="text-[var(--color-red)] text-sm mt-2">
          {formik.errors.captcha}
        </div>
      )}

      <Button
        type="submit"
        className="w-full rounded-[50px]"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Sending..." : commonLabels.send}
      </Button>
    </form>
  );
};

export default ResetPassword;
