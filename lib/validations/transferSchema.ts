import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const transferSchema = createSchema({
  transfer_amount: Yup.number()
    .required("Transfer amount is required")
    .positive("Transfer amount be positive")
    .typeError("Must be a valid number"),
  paypal_email: commonValidations.email,
  confirm_paypal_email: Yup.string()
    .required("Confirm email is required")
    .oneOf([Yup.ref("paypal_email")], "Confirm email must match"),
});
