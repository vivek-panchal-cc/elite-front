export interface NetworkData {
  [networkId: string]: string;
}

export interface MonthlyDetail {
  d_id: number;
  d_dealer_id: number;
  d_dealer_ref: string;
  d_network_id: number;
  d_qty: number;
  d_date: string;
  d_created_date: string;
  monthTotal: string;
  dataMonth: number;
  dataYear: number;
}

export interface MonthlyData {
  [networkId: string]: MonthlyDetail;
}

export interface LastYearMonthlyData {
  [monthYear: string]: MonthlyData;
}

export interface LastYearMonthlyFirstTopUpData {
  [monthYear: string]: {
    [networkId: string]: number;
  };
}

export interface ActivationResponse {
  network: NetworkData;
  lastYearMonthlyData: LastYearMonthlyData;
  lastYearMonthlyFirstTopUpData: LastYearMonthlyFirstTopUpData;
}
