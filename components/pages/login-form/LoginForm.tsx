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
import { useAuthContext } from "@/lib/AuthProvider";
import { useLoader } from "@/components/providers/loader-provider";
interface LoginFormProps {
  setLoginClose: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResetPasswordOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormValues {
  email: string;
  password: string;
}

const LoginForm = ({
  setLoginClose,
  setSignUpOpen,
  setResetPasswordOpen,
}: LoginFormProps) => {
  const router = useRouter();
  const { setIsLoading } = useLoader();
  const { setIsAuthenticated } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setIsLoading(true);
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };
        await login({ queryKey: AUTH_ENDPOINTS.LOGIN, payload });
        setLoginClose(false); // Close login modal
        setIsAuthenticated(true);
        router.push("/dashboard");
      } catch (error: any) {
        const errorMessage = error.message || "Login failed";
        toast.error(errorMessage);
        // setStatus({ error: errorMessage });
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
      <h2 className="text-[25px] ml-3 font-bold text-left mb-4 text-[var(--color-blue)]">
        {commonLabels.loginFormLabel}
      </h2>

      {formik.status?.error && (
        <div className="text-[var(--color-red)] text-sm p-2 bg-red-50 rounded">
          {formik.status.error}
        </div>
      )}

      <div className="space-y-1">
        <Label className="font-medium leading-[24.42px] tracking-[0px] lg:text-[15px]">
          {loginLabels.email}
        </Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter Email"
          className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:text-[14px]"
          autoComplete="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
          aria-label="Email"
        />
      </div>

      <div className="space-y-1 relative">
        <Label className="font-medium leading-[24.42px] tracking-[0px] lg:text-[15px]">
          {loginLabels.password}
        </Label>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          className="bg-[var(--color-white)] placeholder:text-[12px] sm:placeholder:text-[14px] text-[12px] sm:text-[14px]"
          autoComplete="current-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          // onCopy={(e) => e.preventDefault()}
          // onPaste={(e) => e.preventDefault()}
          error={formik.touched.password && formik.errors.password}
          aria-label="Password"
        />
        <span
          className="absolute right-3 top-9 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IconEyeClose /> : <IconEyeOpen />}
        </span>
      </div>

      <div className="text-xs text-left mb-1 ml-2 mt-8">
        <span className="text-[var(--color-black)]">
          {loginLabels.forgotPassword}{" "}
        </span>
        <a
          className="text-[var(--color-red)] cursor-pointer"
          onClick={() => {
            setLoginClose(false);
            setResetPasswordOpen(true);
          }}
        >
          {loginLabels.resetPassword}
        </a>
      </div>

      <Button
        type="submit"
        className="w-full rounded-[50px]"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Logging in..." : commonLabels.loginFormLabel}
      </Button>

      <div className="text-xs text-center mt-2 cursor-pointer">
        <span className="text-[var(--color-black)]">
          {loginLabels.dontHaveAccount}
        </span>{" "}
        <a
          className="text-[var(--color-red)]"
          onClick={() => {
            setLoginClose(false);
            setSignUpOpen(true);
          }}
        >
          {commonLabels.signUp}
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
