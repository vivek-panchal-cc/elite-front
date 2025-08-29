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
}

const ContactDetailsForm = ({
  setContactClose,
  details,
  handleDataNull,
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-2xl bg-[var(--color-white)] rounded-lg p-6 md:p-8 space-y-4 mx-auto"
    >
      <h2 className="text-xl font-bold text-left mb-2 text-[var(--color-blue)] pt-5">
        {registrationLabels.contactDetails}
      </h2>
      <p className="text-left mb-2 text-[var(--color-black)]">
        {registrationLabels.contactDetailsMsg}
      </p>

      {formik.status?.error && (
        <div className="text-[var(--color-red)] text-sm p-2 bg-red-50 rounded">
          {formik.status.error}
        </div>
      )}

      <div className="space-y-1">
        <Label className="font-medium">{registrationLabels.contactName}</Label>
        <Input
          type="text"
          name="contact_name"
          placeholder="Enter Contact Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contact_name}
          error={formik.touched.contact_name && formik.errors.contact_name}
        />
      </div>

      {/* Mobile Number */}
      <div className="space-y-1">
        <Label className="font-medium">{registrationLabels.mobileNumber}</Label>
        <Input
          type="tel"
          name="mobile_number"
          placeholder="Enter Mobile Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobile_number}
          error={formik.touched.mobile_number && formik.errors.mobile_number}
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label className="font-medium">{registrationLabels.email}</Label>
        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
      </div>

      {/* Document Upload */}
      <div className="space-y-1">
        <Label className="font-medium">{commonLabels.uploadDoc}</Label>
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
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[var(--color-blue)] file:text-[var(--color-white)]
            hover:file:bg-[var(--color-dark-blue)] cursor-pointer"
        />
        {/* {fileName && <p className="text-xs text-gray-500 mt-1">{fileName}</p>} */}
        {formik.touched.document && formik.errors.document && (
          <p className="text-[var(--color-red)] text-sm">
            {formik.errors.document as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <Button
          type="submit"
          className="w-full rounded-[50px]"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Sending in..." : commonLabels.send}
        </Button>
        <Button
          type="button"
          className="w-full bg-gray-300 text-[var(--color-black)] hover:bg-[var(--color-red-hover)] hover:text-[var(--color-white)] rounded-full px-5 py-2"
          disabled={formik.isSubmitting}
          onClick={() => {
            setContactClose(false);
            formik.resetForm();
          }}
        >
          {commonLabels.cancel}
        </Button>
      </div>
    </form>
  );
};

export default ContactDetailsForm;
