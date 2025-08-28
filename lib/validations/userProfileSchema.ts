import * as Yup from "yup";
import { commonValidations, createSchema } from "./commonSchema";

export const userProfileSchema = createSchema({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  customerEmail: commonValidations.email,
  billing: Yup.object().shape({
    firstName: Yup.string().required("Billing First Name is required"),
    lastName: Yup.string().required("Billing Last Name is required"),
    telephone: commonValidations.mobileNumber,
    cityOrTown: commonValidations.city,
    companyName: Yup.string().required("Company Name is required"),
    countryOrState: Yup.string().required("Country/State is required"),
    address1: Yup.string().required("Address 1 is required"),
    postcode: commonValidations.postcode,
    address2: Yup.string().required("Address 2 is required"),
    country: commonValidations.country,
  }),
  shipping: Yup.object().shape({
    firstName: Yup.string().required("Shipping First Name is required"),
    lastName: Yup.string().required("Shipping Last Name is required"),
    telephone: commonValidations.mobileNumber,
    cityOrTown: commonValidations.city,
    companyName: Yup.string().required("Company Name is required"),
    countryOrState: Yup.string().required("Country/State is required"),
    address1: Yup.string().required("Address 1 is required"),
    postcode: commonValidations.postcode,
    address2: Yup.string().required("Address 2 is required"),
    country: commonValidations.country,
  }),
});
