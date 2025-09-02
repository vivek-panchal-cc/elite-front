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
