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
import Modal from "@/components/ui/Modal";
import ContactDetailsForm from "../contact-details/ContactDetailsForm";
import AlertModal from "../AlertModal";
import CheckCircle from "@/components/images/svgs/CheckCircle";

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

interface RegisteredDealer {
  dealer_acc: string;
  postcode: string;
  msg: string;
}

interface RegistrationFormProps {
  setRegistrationClose: React.Dispatch<React.SetStateAction<boolean>>;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Wizard steps
type Step = "verifyDealer" | "postcode" | "registration";

const RegistrationForm = ({
  setRegistrationClose,
  setLogin,
}: RegistrationFormProps) => {
  const { setIsLoading } = useLoader();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [step, setStep] = useState<Step>("verifyDealer");
  const [registeredDealermsg, setRegisteredDealermsg] =
    useState<RegisteredDealer | null>(null);
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

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
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
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
        setIsContactDetailsOpen(false);
        setStep("verifyDealer"); // reset flow after submit
        setRegisteredDealermsg(null);
        setIsLoading(false);
      }
    },
  });

  const handleDealerExists = async () => {
    if (!formik.values.dealer_ref.trim()) {
      formik.setFieldTouched("dealer_ref", true);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await apiRequest.checkDealerExists({
        dealer_acc: formik.values.dealer_ref,
      });
      setStep(data.success ? "postcode" : "registration");
    } catch (error: any) {
      if (typeof error === "string") return toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDealerVerify = async () => {
    if (!formik.values.dealer_ref.trim()) {
      formik.setFieldTouched("dealer_ref", true);
      return;
    }
    if (!formik.values.postcode.trim()) {
      formik.setFieldTouched("postcode", true);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await apiRequest.verifyDealer({
        dealer_acc: formik.values.dealer_ref,
        postcode: formik.values.postcode,
      });
      if (!data.success) throw data.message;
      setRegisteredDealermsg(data.data.result);
      formik.setStatus("");
    } catch (error: any) {
      formik.setStatus(error);
      setRegisteredDealermsg(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataNull = () => {
    setRegistrationClose(false);
    setRegisteredDealermsg(null);
    setIsContactDetailsOpen(false);
    setRegisteredDealermsg(null);
    setAlertModal(false);
    setLogin(true);
  };

  const handleLogin = () => {
    setRegistrationClose(false);
    setLogin(true);
  };

  // Scroll to first error when form is submitted with errors
  useEffect(() => {
    if (formik.isSubmitting && Object.keys(formik.errors).length > 0) {
      const firstError = Object.keys(formik.errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [formik.errors, formik.isSubmitting]);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-full bg-[var(--color-white)] rounded-lg p-6 md:p-8 space-y-4 mx-auto"
      >
        {/* Step 1: Verify Dealer */}
        {step === "verifyDealer" && (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-center text-[var(--color-blue)] pt-4">
              {registrationLabels.verifyDealer}
            </h2>
            <div className="space-y-1 lg:px-8">
              <Label className="text-[11px] opacity-90 lg:text-[11px] font-medium">
                {registrationLabels.dealerAccountRef}
              </Label>
              <Input
                type="text"
                name="dealer_ref"
                className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                // placeholder="Enter Dealer Account/Reference Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dealer_ref}
                error={formik.touched.dealer_ref && formik.errors.dealer_ref}
              />
              <div className="mt-6 flex w-full gap-4 pb-4">
                <Button
                  type="button"
                  className="h-[32px] flex-1 rounded-[50px] font-bold leading-[52px] bg-[var(--color-red)] hover:bg-[var(--color-red-hover)]"
                  onClick={handleDealerExists}
                >
                  {registrationLabels.submit}
                </Button>
                <Button
                  type="button"
                  className="h-[32px] flex-1 font-bold leading-[52px] rounded-[50px] text-[var(--color-white)] border border-[var(--color-blue)] hover:text-[var(--color-white)]"
                  onClick={handleLogin}
                >
                  {commonLabels.loginCaps}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Postcode verification */}
        {step === "postcode" && (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-center text-[var(--color-blue)] pt-4">
              {registrationLabels.verifyDealer}
            </h2>
            {formik.status && (
              <div className="text-[var(--color-red)] text-sm p-2 bg-red-50 rounded sm:max-w-[236px] md:max-w-[336px] lg:max-w-[436px] xl:max-w-[536px]">
                {formik.status}
              </div>
            )}
            {registeredDealermsg?.msg && (
              <div className="text-[var(--color-red)] text-sm p-2 bg-red-50 rounded sm:max-w-[236px] md:max-w-[336px] lg:max-w-[436px] xl:max-w-[536px]">
                <p>{registeredDealermsg.msg}</p>
                <a
                  className="mt-1 text-[var(--color-blue)] font-bold cursor-pointer hover:underline"
                  onClick={() => setIsContactDetailsOpen(true)}
                >
                  {registrationLabels.notYourEmail}
                </a>
              </div>
            )}
            <div className="space-y-1 lg:px-8">
              <Label className="text-[11px] font-medium opacity-90 lg:text-[11px]">
                {registrationLabels.dealerAccountRef}
              </Label>
              <Input
                type="text"
                name="dealer_ref"
                // placeholder="Enter Dealer Account/Reference Number"
                className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                disabled
                onBlur={formik.handleBlur}
                value={formik.values.dealer_ref}
                error={formik.touched.dealer_ref && formik.errors.dealer_ref}
              />

              <Label className="text-[11px] font-medium opacity-90 lg:text-[11px]">
                {registrationLabels.postCode}
              </Label>
              <Input
                type="text"
                name="postcode"
                // placeholder="Enter Postcode"
                className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postcode}
                error={formik.touched.postcode && formik.errors.postcode}
              />
              <div className="mt-6 flex w-full gap-4 pb-4">
                <Button
                  type="button"
                  className="h-[32px] flex-1 rounded-[50px] font-bold leading-[52px] bg-[var(--color-red)] hover:bg-[var(--color-red-hover)]"
                  onClick={handleDealerVerify}
                >
                  {registrationLabels.submit}
                </Button>
                <Button
                  type="button"
                  className="h-[32px] flex-1 font-bold leading-[52px] rounded-[50px] text-[var(--color-white)] border border-[var(--color-blue)] hover:text-[var(--color-white)]"
                  onClick={handleLogin}
                >
                  {commonLabels.loginCaps}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Registration */}
        {step === "registration" && (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-left text-[var(--color-blue)]">
              {registrationLabels.dealerRegistration}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.dealerAccountRef}
                </Label>
                <Input
                  type="text"
                  name="dealer_ref"
                  // placeholder="Enter Dealer Account/Reference Number"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  // onChange={formik.handleChange}
                  disabled
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_ref}
                  error={formik.touched.dealer_ref && formik.errors.dealer_ref}
                />
              </div>

              <div className="space-y-1">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.dealerName}
                </Label>
                <Input
                  type="text"
                  name="dealer_name"
                  // placeholder="Enter Dealer Name"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_name}
                  error={
                    formik.touched.dealer_name && formik.errors.dealer_name
                  }
                />
              </div>

              <div className="space-y-1 relative">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.password}
                </Label>
                <Input
                  type={showPassword.password ? "text" : "password"}
                  name="dealer_password"
                  // placeholder="Enter Password"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_password}
                  autoComplete={"new-password"}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  error={
                    formik.touched.dealer_password &&
                    formik.errors.dealer_password
                  }
                />
                <span
                  className="absolute right-3 top-9 cursor-pointer"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                >
                  {showPassword.password ? <IconEyeClose /> : <IconEyeOpen />}
                </span>
              </div>

              <div className="space-y-1 relative">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.confirmPassword}
                </Label>
                <Input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirm_password"
                  // placeholder="Enter Confirm Password"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  error={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
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
                  {showPassword.confirmPassword ? (
                    <IconEyeClose />
                  ) : (
                    <IconEyeOpen />
                  )}
                </span>
              </div>

              <div className="space-y-1">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.email}
                </Label>
                <Input
                  type="text"
                  name="dealer_email"
                  // placeholder="Enter Email"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_email}
                  error={
                    formik.touched.dealer_email && formik.errors.dealer_email
                  }
                />
              </div>

              <div className="space-y-1">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.mobileNumber}
                </Label>
                <Input
                  type="tel"
                  name="dealer_mobile"
                  // placeholder="Enter Mobile Number"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_mobile}
                  error={
                    formik.touched.dealer_mobile && formik.errors.dealer_mobile
                  }
                />
              </div>

              <div className="space-y-1">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.postCode}
                </Label>
                <Input
                  type="text"
                  name="postcode"
                  // placeholder="Enter Postcode"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postcode}
                  error={formik.touched.postcode && formik.errors.postcode}
                />
              </div>

              <div className="space-y-1">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.city}
                </Label>
                <Input
                  type="text"
                  name="dealer_city"
                  // placeholder="Enter City"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_city}
                  error={
                    formik.touched.dealer_city && formik.errors.dealer_city
                  }
                />
              </div>
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <Label className="font-medium opacity-90 leading-[24.42px] tracking-[0px] lg:text-[15px]">
                  {registrationLabels.address}
                </Label>
                <Input
                  type="text"
                  name="dealer_address1"
                  // placeholder="Address Line 1"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_address1}
                  error={
                    formik.touched.dealer_address1 &&
                    formik.errors.dealer_address1
                  }
                />
              </div>
              <div className="space-y-1">
                <Input
                  type="text"
                  name="dealer_address2"
                  className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:!text-[15px] leading-[24px] font-medium"
                  // placeholder="Address Line 2 (Optional)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealer_address2}
                  error={
                    formik.touched.dealer_address2 &&
                    formik.errors.dealer_address2
                  }
                />
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-left">
              {SITE_KEY ? (
                <div className="scale-80 origin-left sm:scale-100 sm:origin-left relative z-[1001]">
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
                </div>
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
            <div className="space-y-1 text-sm text-[var(--color-gray)] px-4 font-medium">
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
                <label
                  htmlFor="marketing"
                  className="mt-1 text-[9px] font-medium opacity-80 text-[var(--color-black)]"
                >
                  {registrationLabels.receiveOffer}
                </label>
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
                  <label
                    htmlFor="term_and_condition"
                    className="mt-1 text-[9px] font-medium opacity-80 text-[var(--color-black)]"
                  >
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
              className="w-full mt-0 rounded-[50px] text-[16px] font-semibold"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : commonLabels.submit}
            </Button>
          </>
        )}
      </form>
      <Modal
        isOpen={isContactDetailsOpen}
        onClose={() => setIsContactDetailsOpen(false)}
        classStyle="sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]"
        isClose={true}
      >
        <ContactDetailsForm
          setContactClose={setIsContactDetailsOpen}
          details={formik.values}
          handleDataNull={() => setAlertModal(true)}
        />
      </Modal>
      <Modal
        isOpen={alertModal}
        onClose={handleDataNull}
        classStyle="sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]"
        isClose={false}
      >
        <AlertModal
          setModalClose={setAlertModal}
          headerMsg={registrationLabels.thankYou}
          message={registrationLabels.thankYouMsg}
          btnLabel={commonLabels.okay}
          handleCallback={handleDataNull}
          icon={<CheckCircle />}
        />
      </Modal>
    </>
  );
};

export default RegistrationForm;
