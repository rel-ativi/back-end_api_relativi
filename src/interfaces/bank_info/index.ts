export interface IBankInfo {
  bank: string;
  agency: string;
  account_number: string;
}

export interface IBankInfoUpdate {
  bank?: string;
  agency?: string;
  account_number?: string;
}
