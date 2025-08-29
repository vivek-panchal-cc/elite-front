import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const changePasswordSchema = createSchema({
  // email: commonValidations.email,
  old_password: Yup.string().required("Old password is required"),
  new_password: Yup.string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password")], "Confirm passwords must match"),
});
