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
