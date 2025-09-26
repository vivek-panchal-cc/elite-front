import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const transferSchema = createSchema({
  avaialble_balance: Yup.number()
    .required("Available blance is required")
    .positive("Available blance be positive")
    .typeError("Must be a valid number"),
  transfer_amount: Yup.number()
    .required("Transfer amount is required")
    .positive("Transfer amount be positive")
    .typeError("Must be a valid number"),
  paypal_fee: Yup.number()
    .required("Paypal fee is required")
    .typeError("Must be a valid number"),
  receivable_amount: Yup.number()
    .required("Receivable amount is required")
    .positive("Receivable amount be positive")
    .typeError("Must be a valid number"),
  paypal_email: commonValidations.email,
  confirm_paypal_email: Yup.string()
    .required("Confirm email is required")
    .oneOf([Yup.ref("paypal_email")], "Confirm email must match"),
});
