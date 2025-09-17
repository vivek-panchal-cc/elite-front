import { images } from "@/components/images";

const ELITE_LOGO = images.elite_logo;
const ELITE_WALLET = images.eliteWallet;
const CURRENCY_SYMBOL = "£";
const CAT_TYPE_ID = 21;

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

function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // fallback if invalid

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export {
  ELITE_LOGO,
  ELITE_WALLET,
  CURRENCY_SYMBOL,
  objectToFormData,
  formatDate,
  CAT_TYPE_ID,
};
