import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const registrationSchema = createSchema({
  dealer_ref: commonValidations.referenceNumber,
  dealer_name: commonValidations.name,
  dealer_password: commonValidations.password,
  confirm_password: commonValidations.confirmPassword("dealer_password"),
  dealer_email: commonValidations.email,
  dealer_mobile: commonValidations.mobileNumber,
  postcode: commonValidations.postcode,
  dealer_city: commonValidations.city,
  dealer_address1: commonValidations.address,
  dealer_address2: Yup.string().optional(),
  captcha: commonValidations.checkbox("Please verify that you are human"),
  g_recaptcha_token: Yup.string().required(
    "ReCAPTCHA verification is required"
  ),
  marketing: Yup.boolean(),
  agree: commonValidations.checkbox(
    "You must agree to the terms and conditions"
  ),
});
