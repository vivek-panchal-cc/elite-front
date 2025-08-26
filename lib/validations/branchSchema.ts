import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const branchSchema = createSchema({
  branch_name: Yup.string().required("Branch name is required"),
  address_line1: Yup.string().required("Address Line 1 is required"),
  address_line2: Yup.string().required("Address Line 2 is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  postcode: commonValidations.postcode,
});
