import { commonValidations, createSchema } from "./commonSchema";

export const resetPasswordSchema = createSchema({
  email: commonValidations.email,
});
