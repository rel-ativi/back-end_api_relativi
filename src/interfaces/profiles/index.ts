import { IAddressRequest } from "../adresses";
import { IBankInfo } from "../bank_info";
import { IPaymentInfo } from "../payment_info";

export interface IProfile {
  bio?: string;
  phone?: string;
  address?: IAddressRequest;
  bank_info?: IBankInfo;
  payment_info?: IPaymentInfo;
}

export interface IProfileSchema
  extends Omit<IProfile, "address" | "bank_info" | "payment_info"> {
  address?: string;
  bank_info?: string;
  payment_info?: string;
}

export interface IUserScheduleRequest {
  date: Date;
}
