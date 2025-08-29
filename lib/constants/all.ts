import { images } from "@/components/images";

const ELITE_LOGO = images.elite_logo;
const ELITE_WALLET = images.eliteWallet;
const CURRENCY_SYMBOL = "£";

const objectToFormData = (values: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // If it's a File (like document upload), keep as-is
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  return formData;
};

export { ELITE_LOGO, ELITE_WALLET, CURRENCY_SYMBOL, objectToFormData };
