import type { StaticImageData } from "next/image";
import {
  eliteBlue,
  eliteBronze,
  eliteDiamond,
  eliteGold,
  elitePlatinum,
  eliteSilver,
} from "@/components/images";

export interface RewardRecord {
  active_sim_month: string;
  active_sim_year: string;
  amount_balance: number;
  cr_dr: "C" | "D";
  cr_dr_type: string | null;
  created_at: string;
  dealer_id: number;
  description: string;
  disc_code: string | null;
  is_activation_bonus: "Y" | "N";
  is_nvee_redeem: "0" | "1";
  is_paypal_transfer_eligible: "0" | "1";
  point_balance: number;
  redeem_amount: number;
  redeem_date: string;
  redeem_id: string;
  redeem_points: number;
}

export interface Gift {
  tier_qty: number;
  tier_title_line: string;
}

export interface TierReward {
  tier: string;
  tier_values: number;
  gifts: Gift[];
}

export interface RewardData {
  name: string;
  target: number;
  rewards: string[];
}


export type Medal = {
  name: string;
  color: string;
  trophyColor: string;
  downArrowColor: string;
  gradient?: string;
  borderColor?: string;
  image: string | StaticImageData;
};

export const medals: Medal[] = [
  {
    name: "Blue",
    color: "bg-[var(--color-blue)] text-[var(--color-white)]",
    trophyColor: "text-[var(--color-blue)]",
    downArrowColor: "text-[var(--color-white)]",
    borderColor: "border-[var(--color-blue)]",
    image: eliteBlue,
  },
  {
    name: "Bronze",
    color: "bg-[var(--color-bronze)] text-[var(--color-white)]",
    trophyColor: "text-[var(--color-bronze)]",
    downArrowColor: "text-[var(--color-white)]",
    borderColor: "border-[var(--color-bronze)]",
    image: eliteBronze,
  },
  {
    name: "Silver",
    color: "bg-[var(--color-silver)] text-[var(--color-black)]",
    trophyColor: "text-[var(--color-silver)]",
    downArrowColor: "text-[var(--color-black)]",
    borderColor: "border-[var(--color-silver)]",
    image: eliteSilver,
  },
  {
    name: "Gold",
    gradient: "linear-gradient(90deg, #C5A158 0%, #FAD97B 50%, #C5A158 100%)",
    color: "bg-[var(--color-blue)] text-[var(--color-white)]",
    trophyColor: "text-[var(--color-gold)]",
    downArrowColor: "text-[var(--color-black)]",
    borderColor: "border-[var(--color-gold)]",
    image: eliteGold,
  },
  {
    name: "Platinum",
    color: "bg-[var(--color-platinum)] text-[var(--color-black)]",
    trophyColor: "text-[var(--color-platinum)]",
    downArrowColor: "text-[var(--color-black)]",
    borderColor: "border-[var(--color-platinum)]",
    image: elitePlatinum,
  },
  {
    name: "Diamond",
    // gradient:
    //   " linear-gradient(90deg, #EBEFF9 27.68%, #D5DBEB 53.19%, #ECF0F9 71.09%)",
    color: "bg-[#BFF4FF] text-[var(--color-black)]",
    trophyColor: "text-[#D6DCEC]",
    downArrowColor: "text-[var(--color-black)]",
    borderColor: "border-[var(--color-silver)]",
    image: eliteDiamond,
  },
];

export interface RewardReqParams {
  cr_dr: "C" | "D" | "";
  is_dashboard: boolean;
  search: string;
}
