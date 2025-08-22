import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const loginSchema = createSchema({
  email: commonValidations.email,
  password: Yup.string().required("Password is required"),
});
