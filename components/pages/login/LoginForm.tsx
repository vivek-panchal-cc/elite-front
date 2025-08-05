import React, { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/ButtonUI";
import { commonLabels, loginLabels } from "@/lib/labels";
import { loginSchema } from "@/lib/validations/loginSchema";
import { toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "@/components/images/icons";

interface LoginFormProps {
  setLoginClose: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setLoginClose, setSignUpOpen }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        // TODO: Implement your API call here
        console.log("Login values:", values);
        
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success("Login successful!");
        setLoginClose(false);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Login failed";
        toast.error(errorMessage);
        setStatus({ error: errorMessage });
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
        {commonLabels.login}
      </h2>

      {formik.status?.error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {formik.status.error}
        </div>
      )}

      <div className="space-y-1">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
          aria-label="Email"
        />
      </div>

      <div className="space-y-1 relative">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
          aria-label="Password"
        />
        <button
          type="button"
          className="absolute right-3 top-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IconEyeClose /> : <IconEyeOpen />}
        </button>
      </div>

      <div className="text-xs text-left">
        {loginLabels.forgotPassword}{" "}
        <a href="#" className="text-pink-600">
          {loginLabels.resetPassword}
        </a>
      </div>

      <Button 
        type="submit" 
        className="w-full rounded-[50px]"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Logging in..." : commonLabels.login}
      </Button>

      <div className="text-xs text-center mt-2 cursor-pointer">
        {loginLabels.dontHaveAccount}{" "}
        <a
          className="text-pink-600"
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
