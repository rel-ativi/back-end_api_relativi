import { IAddressRequest } from "../adresses";

export interface IActivitySchedule {
  time: string;
  days: string[];
}

export interface IActivityRequest {
  name: string;
  price: number;
  min_users?: number;
  max_users: number;
  duration: number;
  category_id: string;
  recurrent: boolean;
  starting_date: string;
  address: IAddressRequest;
  activity_schedule_id?: string;
  image?: string;
}

export type IActivitySchema = Omit<IActivityRequest, "image">;
