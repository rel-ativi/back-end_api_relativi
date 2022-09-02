import { IAddressRequest } from "../adresses";

export interface IActivitySchedule {
  time: string;
  days: string[];
}

export interface IActivityRequest {
  name: string;
  price: number;
  min_users: number;
  max_users: number;
  duration: number;
  category_id: string;
  address?: IAddressRequest;
  recurrent: boolean;
  starting_date: string;
  schedule?: IActivitySchedule;
}
