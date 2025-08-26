export interface Branch {
  id: number;
  branch_name: string;
  address_line1: string;
  address_line2: string;
  country: string;
  city: string;
  postcode: string;
}

export interface BranchAdd {
  branch_name: string;
  address_line1: string;
  address_line2?: string;
  country: string;
  city: string;
  postcode: string;
}
