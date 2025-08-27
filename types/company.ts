export interface Company {
  id: number;
  company_name: string;
  address_line1: string;
  address_line2: string;
  country: string;
  city: string;
  postcode: string;
}

export interface CompanyAdd {
  company_name: string;
  address_line1: string;
  address_line2: string;
  country: string;
  city: string;
  postcode: string;
}
