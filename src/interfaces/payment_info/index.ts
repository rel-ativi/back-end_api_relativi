export interface IPaymentInfo {
  card_name: string;
  card: string;
  due_date: string;
  sec_code: number;
}

export interface IPaymentInfoUpdate {
  card_name?: string;
  card?: string;
  due_date?: string;
  sec_code?: number;
}
