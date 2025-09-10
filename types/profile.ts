export interface UserDetails {
  user_fname: string;
  user_lname: string;
  user_cname: string;
  user_email: string;
  user_address1: string;
  user_address2: string;
  user_city: string;
  user_county: string;
  user_country: string;
  user_post: string;
  user_phone: string;
  user_s_fname: string;
  user_s_lname: string;
  user_s_cname: string;
  user_s_address1: string;
  user_s_address2: string;
  user_s_city: string;
  user_s_county: string;
  user_s_country: string;
  user_s_post: string;
  user_s_phone: string;
}

export interface User {
  user_id: number;
  user_email: string;
  dealer_id: number;
  user_fname: string;
  user_lname: string;
  user_cname: string;
  user_address1: string;
  user_address2: string;
  user_country: string;
  user_county: string;
  user_city: string;
  user_post: string;
  user_phone: string;
  user_s_fname: string;
  user_s_lname: string;
  user_s_cname: string;
  user_s_address1: string;
  user_s_address2: string;
  user_s_country: string;
  user_s_county: string;
  user_s_city: string;
  user_s_post: string;
  user_s_phone: string;
  user_sub_newsletter: number; // 0 or 1
  user_discount_code: string;
  user_is_firsttime_login: number; // 0 or 1
  user_created: string; // ISO date string
  user_last_updated: string | null;
  user_status: number; // 0 or 1 (active/inactive)
  user_hear_aboutus: string;
  user_otherdetails: string;
  user_type: string; // e.g. "T"
  user_register_id: string;
  user_ref_number: string;
  user_credit: number;
  user_buyable_credit: number;
  gc_block_status: number; // 0 or 1
  user_token: string;
  send_email_date: string | null;
}

export const mapProfileToUser = (profileData: any): User => ({
  user_id: profileData.user_id,
  user_email: profileData.user_email,
  dealer_id: profileData.dealer_id,
  user_fname: profileData.user_fname,
  user_lname: profileData.user_lname,
  user_cname: profileData.user_cname,
  user_address1: profileData.user_address1,
  user_address2: profileData.user_address2,
  user_country: profileData.user_country,
  user_county: profileData.user_county,
  user_city: profileData.user_city,
  user_post: profileData.user_post,
  user_phone: profileData.user_phone,
  user_s_fname: profileData.user_s_fname,
  user_s_lname: profileData.user_s_lname,
  user_s_cname: profileData.user_s_cname,
  user_s_address1: profileData.user_s_address1,
  user_s_address2: profileData.user_s_address2,
  user_s_country: profileData.user_s_country,
  user_s_county: profileData.user_s_county,
  user_s_city: profileData.user_s_city,
  user_s_post: profileData.user_s_post,
  user_s_phone: profileData.user_s_phone,
  user_sub_newsletter: profileData.user_sub_newsletter,
  user_discount_code: profileData.user_discount_code,
  user_is_firsttime_login: profileData.user_is_firsttime_login,
  user_created: profileData.user_created,
  user_last_updated: profileData.user_last_updated,
  user_status: profileData.user_status,
  user_hear_aboutus: profileData.user_hear_aboutus,
  user_otherdetails: profileData.user_otherdetails,
  user_type: profileData.user_type,
  user_register_id: profileData.user_register_id,
  user_ref_number: profileData.user_ref_number,
  user_credit: profileData.user_credit,
  user_buyable_credit: profileData.user_buyable_credit,
  gc_block_status: profileData.gc_block_status,
  user_token: profileData.user_token,
  send_email_date: profileData.send_email_date,
});

export interface Dealer {
  activate_date: string;
  current_amount_bal: number;
  current_point_bal: number;
  customer_category: string;
  customer_source: string;
  dealer_ac_number: string;
  dealer_address1: string;
  dealer_address2: string;
  dealer_city: string;
  dealer_comm_profile: string;
  dealer_company_name: string | null;
  dealer_created: string;
  dealer_email: string;
  dealer_first_login: string;
  dealer_first_time_login_ip: string;
  dealer_id: number;
  dealer_ip_address: string;
  dealer_landline: string;
  dealer_last_updated: string;
  dealer_mobile: string;
  dealer_name: string;
  dealer_ref: string;
  dealer_register_id: string;
  dealer_session: string;
  dealer_status: number;
  dealer_temp_email: string | null;
  dealer_type: string;
  end_date: string;
  erp_addressid: string;
  extra_info: string;
  extra_value: number;
  first_login_date: string;
  gcerp_addressid: string;
  gcerpid: string;
  is_mobile_topup_eligible: string;
  is_topup_eligible: string;
  last_loggedin_date: string;
  last_login_device_token: string;
  lat: number;
  login_from: string;
  lon: number;
  manager_topup_flag: string;
  marketing: number;
  marketing_email_subscription: string;
  maximum: number;
  multiple_mobile_topup_flag: string;
  multiple_topup_flag: string;
  note: string;
  paypal_transfer_eligible: string;
  postcode: string;
  redeem_bonus: number;
  salesmen_ref: string | null;
  send_email_date: string | null;
  simply_user_ref: string;
  stand_type: string;
  start_date: string;
  system_email_subscription: string;
  term_and_condition: number;
  tier_reward_date_ee: string | null;
  tier_reward_date_giffgaff: string | null;
  tier_reward_date_lebara: string | null;
  tier_reward_date_lyca: string | null;
  tier_reward_date_o2: string | null;
  tier_reward_date_o2_international: string | null;
  tier_reward_date_orange: string | null;
  tier_reward_date_smarty: string | null;
  tier_reward_date_t_mobile: string | null;
  tier_reward_date_talk_mobile: string | null;
  tier_reward_date_three: string | null;
  tier_reward_date_total: string;
  tier_reward_date_virgin_mobile: string | null;
  tier_reward_date_vodafone: string | null;
  tier_reward_date_voxi: string | null;
  tier_reward_ee: string;
  tier_reward_giffgaff: string;
  tier_reward_lebara: string;
  tier_reward_lyca: string;
  tier_reward_o2: string;
  tier_reward_o2_international: string;
  tier_reward_orange: string;
  tier_reward_smarty: string;
  tier_reward_t_mobile: string;
  tier_reward_talk_mobile: string;
  tier_reward_three: string;
  tier_reward_total: string;
  tier_reward_virgin_mobile: string;
  tier_reward_vodafone: string;
  tier_reward_voxi: string;
  topup_authenticated: string;
  topup_daily_limit: number;
  topup_mobile_authenticated: string;
  topup_mobile_daily_limit: number;
  topup_mobile_password: string;
  topup_password: string;
  user_already_exists: string;
}

export const mapProfileToDealer = (profileDataDealer: any): Dealer => ({
  activate_date: profileDataDealer.activate_date,
  current_amount_bal: profileDataDealer.current_amount_bal,
  current_point_bal: profileDataDealer.current_point_bal,
  customer_category: profileDataDealer.customer_category,
  customer_source: profileDataDealer.customer_source,
  dealer_ac_number: profileDataDealer.dealer_ac_number,
  dealer_address1: profileDataDealer.dealer_address1,
  dealer_address2: profileDataDealer.dealer_address2,
  dealer_city: profileDataDealer.dealer_city,
  dealer_comm_profile: profileDataDealer.dealer_comm_profile,
  dealer_company_name: profileDataDealer.dealer_company_name,
  dealer_created: profileDataDealer.dealer_created,
  dealer_email: profileDataDealer.dealer_email,
  dealer_first_login: profileDataDealer.dealer_first_login,
  dealer_first_time_login_ip: profileDataDealer.dealer_first_time_login_ip,
  dealer_id: profileDataDealer.dealer_id,
  dealer_ip_address: profileDataDealer.dealer_ip_address,
  dealer_landline: profileDataDealer.dealer_landline,
  dealer_last_updated: profileDataDealer.dealer_last_updated,
  dealer_mobile: profileDataDealer.dealer_mobile,
  dealer_name: profileDataDealer.dealer_name,
  dealer_ref: profileDataDealer.dealer_ref,
  dealer_register_id: profileDataDealer.dealer_register_id,
  dealer_session: profileDataDealer.dealer_session,
  dealer_status: profileDataDealer.dealer_status,
  dealer_temp_email: profileDataDealer.dealer_temp_email,
  dealer_type: profileDataDealer.dealer_type,
  end_date: profileDataDealer.end_date,
  erp_addressid: profileDataDealer.erp_addressid,
  extra_info: profileDataDealer.extra_info,
  extra_value: profileDataDealer.extra_value,
  first_login_date: profileDataDealer.first_login_date,
  gcerp_addressid: profileDataDealer.gcerp_addressid,
  gcerpid: profileDataDealer.gcerpid,
  is_mobile_topup_eligible: profileDataDealer.is_mobile_topup_eligible,
  is_topup_eligible: profileDataDealer.is_topup_eligible,
  last_loggedin_date: profileDataDealer.last_loggedin_date,
  last_login_device_token: profileDataDealer.last_login_device_token,
  lat: profileDataDealer.lat,
  login_from: profileDataDealer.login_from,
  lon: profileDataDealer.lon,
  manager_topup_flag: profileDataDealer.manager_topup_flag,
  marketing: profileDataDealer.marketing,
  marketing_email_subscription: profileDataDealer.marketing_email_subscription,
  maximum: profileDataDealer.maximum,
  multiple_mobile_topup_flag: profileDataDealer.multiple_mobile_topup_flag,
  multiple_topup_flag: profileDataDealer.multiple_topup_flag,
  note: profileDataDealer.note,
  paypal_transfer_eligible: profileDataDealer.paypal_transfer_eligible,
  postcode: profileDataDealer.postcode,
  redeem_bonus: profileDataDealer.redeem_bonus,
  salesmen_ref: profileDataDealer.salesmen_ref,
  send_email_date: profileDataDealer.send_email_date,
  simply_user_ref: profileDataDealer.simply_user_ref,
  stand_type: profileDataDealer.stand_type,
  start_date: profileDataDealer.start_date,
  system_email_subscription: profileDataDealer.system_email_subscription,
  term_and_condition: profileDataDealer.term_and_condition,
  tier_reward_date_ee: profileDataDealer.tier_reward_date_ee,
  tier_reward_date_giffgaff: profileDataDealer.tier_reward_date_giffgaff,
  tier_reward_date_lebara: profileDataDealer.tier_reward_date_lebara,
  tier_reward_date_lyca: profileDataDealer.tier_reward_date_lyca,
  tier_reward_date_o2: profileDataDealer.tier_reward_date_o2,
  tier_reward_date_o2_international:
    profileDataDealer.tier_reward_date_o2_international,
  tier_reward_date_orange: profileDataDealer.tier_reward_date_orange,
  tier_reward_date_smarty: profileDataDealer.tier_reward_date_smarty,
  tier_reward_date_t_mobile: profileDataDealer.tier_reward_date_t_mobile,
  tier_reward_date_talk_mobile: profileDataDealer.tier_reward_date_talk_mobile,
  tier_reward_date_three: profileDataDealer.tier_reward_date_three,
  tier_reward_date_total: profileDataDealer.tier_reward_date_total,
  tier_reward_date_virgin_mobile:
    profileDataDealer.tier_reward_date_virgin_mobile,
  tier_reward_date_vodafone: profileDataDealer.tier_reward_date_vodafone,
  tier_reward_date_voxi: profileDataDealer.tier_reward_date_voxi,
  tier_reward_ee: profileDataDealer.tier_reward_ee,
  tier_reward_giffgaff: profileDataDealer.tier_reward_giffgaff,
  tier_reward_lebara: profileDataDealer.tier_reward_lebara,
  tier_reward_lyca: profileDataDealer.tier_reward_lyca,
  tier_reward_o2: profileDataDealer.tier_reward_o2,
  tier_reward_o2_international: profileDataDealer.tier_reward_o2_international,
  tier_reward_orange: profileDataDealer.tier_reward_orange,
  tier_reward_smarty: profileDataDealer.tier_reward_smarty,
  tier_reward_t_mobile: profileDataDealer.tier_reward_t_mobile,
  tier_reward_talk_mobile: profileDataDealer.tier_reward_talk_mobile,
  tier_reward_three: profileDataDealer.tier_reward_three,
  tier_reward_total: profileDataDealer.tier_reward_total,
  tier_reward_virgin_mobile: profileDataDealer.tier_reward_virgin_mobile,
  tier_reward_vodafone: profileDataDealer.tier_reward_vodafone,
  tier_reward_voxi: profileDataDealer.tier_reward_voxi,
  topup_authenticated: profileDataDealer.topup_authenticated,
  topup_daily_limit: profileDataDealer.topup_daily_limit,
  topup_mobile_authenticated: profileDataDealer.topup_mobile_authenticated,
  topup_mobile_daily_limit: profileDataDealer.topup_mobile_daily_limit,
  topup_mobile_password: profileDataDealer.topup_mobile_password,
  topup_password: profileDataDealer.topup_password,
  user_already_exists: profileDataDealer.user_already_exists,
});
