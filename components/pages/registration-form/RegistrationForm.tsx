import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import { commonLabels, registrationLabels } from "@/lib/labels";
import { registrationSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconEyeClose, IconEyeOpen } from "@/components/images/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { apiRequest } from "@/lib/apiRequest";
import { useLoader } from "@/components/providers/loader-provider";
import { Label } from "@/components/ui/Label";

interface FormValues {
  dealer_ref: string;
  dealer_name: string;
  dealer_password: string;
  confirm_password: string;
  dealer_email: string;
  dealer_mobile: string;
  postcode: string;
  dealer_city: string;
  dealer_address1: string;
  dealer_address2: string;
  captcha: boolean;
  marketing: boolean;
  term_and_condition: boolean;
  g_recaptcha_token: string;
}

interface RegistrationFormProps {
  setRegistrationClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const RegistrationForm = ({ setRegistrationClose }: RegistrationFormProps) => {
  const { setIsLoading } = useLoader();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      dealer_ref: "",
      dealer_name: "",
      dealer_password: "",
      confirm_password: "",
      dealer_email: "",
      dealer_mobile: "",
      postcode: "",
      dealer_city: "",
      dealer_address1: "",
      dealer_address2: "",
      captcha: false,
      marketing: false,
      term_and_condition: false,
      g_recaptcha_token: captchaToken ?? "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      // setIsLoading(true);
      try {
        const { data } = await apiRequest.register(values);
        if (!data.success) throw data.message;
        toast.success(data.message);
        setRegistrationClose(false);
        router.push("/");
      } catch (error: any) {
        if (typeof error === "string") return toast.error(error);
      } finally {
        setSubmitting(false);
        // setIsLoading(false);
      }
    },
  });

  // Scroll to first error when form is submitted with errors
  useEffect(() => {
    const { errors, isSubmitting } = formik;
    if (isSubmitting && Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [formik.isSubmitting]);

  const handleSubmit = async (values: FormValues) => {
    try {
      // Transform the data to match the API format
      const formData = {
        dealer_ref: values.dealer_ref,
        dealer_name: values.dealer_name,
        dealer_email: values.dealer_email,
        dealer_password: values.dealer_password,
        dealer_address1: values.dealer_address1,
        dealer_address2: values.dealer_address2 || "",
        dealer_city: values.dealer_city,
        postcode: values.postcode,
        dealer_mobile: values.dealer_mobile,
        captcha: values.captcha,
        marketing: values.marketing,
        term_and_condition: values.term_and_condition,
        g_recaptcha_token: values.g_recaptcha_token,
      };

      // Call the registration API
      const response = await apiRequest.register(formData);

      if (response.data.status) {
        toast.success(response.data.message || "Registration successful!");
        router.push("/");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed";
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg p-6 md:p-8 space-y-4 mx-auto"
    >
      <h2 className="text-xl md:text-2xl font-bold text-left text-[var(--color-blue)]">
        {registrationLabels.dealerRegistration}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.dealerAccountRef}
          </Label>
          <Input
            type="text"
            name="dealer_ref"
            placeholder="Enter Dealer Account/Reference Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_ref}
            error={formik.touched.dealer_ref && formik.errors.dealer_ref}
          />
        </div>

        <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.dealerName}
          </Label>
          <Input
            type="text"
            name="dealer_name"
            placeholder="Enter Dealer Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_name}
            error={formik.touched.dealer_name && formik.errors.dealer_name}
          />
        </div>

        <div className="space-y-1 relative">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.password}
          </Label>
          <Input
            type={showPassword.password ? "text" : "password"}
            name="dealer_password"
            placeholder="Enter Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_password}
            autoComplete={"new-password"}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            error={
              formik.touched.dealer_password && formik.errors.dealer_password
            }
          />
          <span
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() =>
              setShowPassword((prev) => ({ ...prev, password: !prev.password }))
            }
          >
            {showPassword.password ? <IconEyeClose /> : <IconEyeOpen />}
          </span>
        </div>

        <div className="space-y-1 relative">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.confirmPassword}
          </Label>
          <Input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirm_password"
            placeholder="Enter Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            error={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
          />
          <span
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
          >
            {showPassword.confirmPassword ? <IconEyeClose /> : <IconEyeOpen />}
          </span>
        </div>

        <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.email}
          </Label>
          <Input
            type="text"
            name="dealer_email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_email}
            error={formik.touched.dealer_email && formik.errors.dealer_email}
          />
        </div>

        <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.mobileNumber}
          </Label>
          <Input
            type="tel"
            name="dealer_mobile"
            placeholder="Enter Mobile Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_mobile}
            error={formik.touched.dealer_mobile && formik.errors.dealer_mobile}
          />
        </div>

        <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.postCode}
          </Label>
          <Input
            type="text"
            name="postcode"
            placeholder="Enter Postcode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.postcode}
            error={formik.touched.postcode && formik.errors.postcode}
          />
        </div>

        <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.city}
          </Label>
          <Input
            type="text"
            name="dealer_city"
            placeholder="Enter City"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_city}
            error={formik.touched.dealer_city && formik.errors.dealer_city}
          />
        </div>
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <Label className="font-medium leading-[24.42px] tracking-[0px]">
            {registrationLabels.address}
          </Label>
          <Input
            type="text"
            name="dealer_address1"
            placeholder="Address Line 1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_address1}
            error={
              formik.touched.dealer_address1 && formik.errors.dealer_address1
            }
          />
        </div>
        <div className="space-y-1">
          <Input
            type="text"
            name="dealer_address2"
            placeholder="Address Line 2 (Optional)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dealer_address2}
            error={
              formik.touched.dealer_address2 && formik.errors.dealer_address2
            }
          />
        </div>
      </div>

      {/* reCAPTCHA */}
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

      {/* Checkboxes */}
      <div className="space-y-2 text-sm text-[var(--color-gray)]">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="marketing"
            name="marketing"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.marketing}
            className="mt-1"
          />
          <label htmlFor="marketing">{registrationLabels.receiveOffer}</label>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="term_and_condition"
            name="term_and_condition"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.term_and_condition}
            className="mt-1"
          />
          <div className="flex flex-col">
            <label htmlFor="term_and_condition">
              {registrationLabels.iConfirm}
            </label>
            {formik.touched.term_and_condition &&
              formik.errors.term_and_condition && (
                <div className="text-[var(--color-red)] text-sm">
                  {formik.errors.term_and_condition}
                </div>
              )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-4 rounded-[50px]"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Submitting..." : commonLabels.submit}
      </Button>
    </form>
  );
};

export default RegistrationForm;
