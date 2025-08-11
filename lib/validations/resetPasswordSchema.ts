import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const resetPasswordSchema = createSchema({
  email: commonValidations.email,
  captcha: commonValidations.checkbox("Please verify that you are human"),
  g_recaptcha_token: Yup.string().required(
    "ReCAPTCHA verification is required"
  ),
});
