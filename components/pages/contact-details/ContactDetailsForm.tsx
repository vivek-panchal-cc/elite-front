import React, { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import { commonLabels, loginLabels, registrationLabels } from "@/lib/labels";
import { loginSchema } from "@/lib/validations/loginSchema";
import { toast } from "sonner";
import { IconEyeClose, IconEyeOpen } from "@/components/images/icons";
import { Label } from "@/components/ui/Label";
import { login } from "@/http/auth/login";
import { useRouter } from "next/navigation";
import { AUTH_ENDPOINTS } from "@/constants/urls";
import { useAuthContext } from "@/lib/AuthProvider";
import { useLoader } from "@/components/providers/loader-provider";
import { contactDetailsSchema } from "@/lib/validations";
import { apiRequest } from "@/lib/apiRequest";

interface FormValues {
  contact_name: string;
  mobile_number: string;
  email: string;
  document: File | null;
}

interface FormStateValues {
  dealer_ref: string;
  postcode: string;
}

interface ContactDetailsFormProps {
  setContactClose: React.Dispatch<React.SetStateAction<boolean>>;
  details: FormStateValues;
  handleDataNull: () => void;
  handleLogin: () => void;
}

const ContactDetailsForm = ({
  setContactClose,
  details,
  handleDataNull,
  handleLogin,
}: ContactDetailsFormProps) => {
  const router = useRouter();
  const { setIsLoading } = useLoader();
  const [fileName, setFileName] = useState<string>("");

  const formik = useFormik<FormValues>({
    initialValues: {
      contact_name: "",
      mobile_number: "",
      email: "",
      document: null,
    },
    validationSchema: contactDetailsSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setIsLoading(true);
      try {
        const { data } = await apiRequest.sendContactDetails({
          name: values.contact_name,
          phone: values.mobile_number,
          email: values.email,
          utility_bill: values.document,
          dealer_ref: details.dealer_ref,
          postcode: details.postcode,
        });
        if (!data.success) throw data.message;
        handleDataNull();
      } catch (error: any) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  const handleLoginOpen = () => {
    setContactClose(false);
    formik.resetForm();
    handleLogin();
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg p-6 md:p-8 space-y-4 mx-auto"
    >
      <h2 className="text-[18px] sm:text-[25px] font-bold text-center leading-[33px] sm:leading-[50px] mb-0 text-[#00539C]">
        {registrationLabels.contactDetails}
      </h2>
      <p className="text-[10px] font-medium  ml-0 text-[var(--color-black)]/70 !text-[11px]leading-[12px] text-center mb-0 px-2 md:px-4">
        {registrationLabels.contactDetailsMsg}
      </p>

      {formik.status?.error && (
        <div className="text-[var(--color-red)] text-sm p-2 bg-red-50 rounded">
          {formik.status.error}
        </div>
      )}
      <div className="space-y-4 p-4 px-6 md:px-8">
        <div className="">
          <Label className="font-medium ml-0 text-[var(--color-black)]/70 !text-[11px]">
            {registrationLabels.contactName}
          </Label>
          <Input
            type="text"
            name="contact_name"
            // placeholder="Enter Contact Name"
            className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:text-[14px]"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact_name}
            error={formik.touched.contact_name && formik.errors.contact_name}
          />
        </div>

        {/* Mobile Number */}
        <div className="">
          <Label className="font-medium ml-0 text-[var(--color-black)]/70 !text-[11px]">
            {registrationLabels.mobileNumber}
          </Label>
          <Input
            type="tel"
            name="mobile_number"
            // placeholder="Enter Mobile Number"
            className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:text-[14px]"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile_number}
            error={formik.touched.mobile_number && formik.errors.mobile_number}
          />
        </div>

        {/* Email */}
        <div className="">
          <Label className="font-medium ml-0 text-[var(--color-black)]/70 !text-[11px]">
            {registrationLabels.email}
          </Label>
          <Input
            type="email"
            name="email"
            // placeholder="Enter Email"
            className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:text-[14px]"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
        </div>

        {/* Document Upload */}
        <div className="">
          <Label className="font-medium ml-0 text-[var(--color-black)]/70 !text-[11px]">
            {commonLabels.uploadDoc}
          </Label>
          <input
            id="document"
            name="document"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              formik.setFieldValue("document", file);
              setFileName(file ? file.name : "");
            }}
            onBlur={formik.handleBlur}
            className="block w-full text-[11px] text-gray-500
            file:mr-4 file:py-2 file:px-8 file:h-[28px] file:leading-[10px]
            file:rounded-full file:border-1 file:border-[var(--color-smooth-gray)]
            file:text-[11px] file:font-semibold
            file:bg-[var(--color-soft-white)] file:text-[var(--color-black)]/50
            hover:file:bg-[var(--color-soft-white)] cursor-pointer"
          />
          {/* {fileName && <p className="text-xs text-gray-500 mt-1">{fileName}</p>} */}
          {formik.touched.document && formik.errors.document && (
            <p className="text-[var(--color-red)] text-sm">
              {formik.errors.document as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 pt-4">
          <Button
            type="submit"
            className="w-full h-[30px] font-bold rounded-[50px] bg-[var(--color-red)] hover:bg-[var(--color-red-hover)]"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submit in..." : registrationLabels.submit}
          </Button>
          {/* <Button
            type="button"
            className="w-full h-[30px] bg-gray-300 text-[var(--color-black)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] rounded-full px-5 py-2"
            disabled={formik.isSubmitting}
            onClick={() => {
              setContactClose(false);
              formik.resetForm();
            }}
          >
            {commonLabels.cancel}
          </Button> */}
          <Button
            type="button"
            className="h-[30px] flex-1 font-bold leading-[52px] rounded-[50px] text-[var(--color-white)] border border-[var(--color-blue)] hover:text-[var(--color-white)]"
            onClick={handleLoginOpen}
          >
            {commonLabels.loginCaps}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactDetailsForm;
