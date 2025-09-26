import { images } from "@/components/images";

const ELITE_LOGO = images.elite_logo;
const ELITE_WALLET = images.eliteWallet;
const CURRENCY_SYMBOL = "£";
const CAT_TYPE_ID = process.env.NODE_ENV === "production" ? 21 : 22;
const WITHDRAWAL = "withdrawal";
const SAVED_CARD = "SAVED_CARDS_PAYMENT";
const NEW_CARD = "NEW_CARD_PAYMENT";

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

const getRewardGraphData = (dealerGraphData: any) => {
  return {
    labels:
      dealerGraphData?.data?.labels?.map((label: string) =>
        label.slice(0, 3)
      ) || [],
    datasets:
      dealerGraphData?.data?.datasets?.map((dataset: any) => {
        let borderColor = "#ff3e00";
        let backgroundColor = "rgba(255, 75, 110, 0.2)";

        if (dataset.label.toLowerCase() === WITHDRAWAL) {
          borderColor = "#10499e";
          backgroundColor = "rgba(31, 111, 235, 0.2)";
        }

        return {
          label: dataset.label,
          data: dataset.data,
          borderColor,
          backgroundColor,
          tension: 0.4,
        };
      }) || [],
  };
};

const rewardGraphOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
    },
    y: { display: false, grid: { display: false } },
  },
};

const normalizeMonthKey = (key: string) => {
  const [year, month] = key.split("_");
  return `${year}_${Number(month)}`;
};

const safeNumber = (val: any) => {
  const num = Number(val);
  return Number.isNaN(num) ? 0 : num;
};

export {
  ELITE_LOGO,
  ELITE_WALLET,
  CURRENCY_SYMBOL,
  objectToFormData,
  formatDate,
  getRewardGraphData,
  rewardGraphOptions,
  CAT_TYPE_ID,
  WITHDRAWAL,
  SAVED_CARD,
  NEW_CARD,
  normalizeMonthKey,
  safeNumber,
};
