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
  duration: string;
  category_id: string;
  recurrent: boolean;
  starting_date: string;
  address: IAddressRequest;
  activity_schedule_id?: string;
  image_url?: string;
}

export type ActivityUpdate = {
  name?: string;
  price?: number;
  min_users?: number;
  max_users?: number;
  duration?: string;
  category_id?: string;
  recurrent?: boolean;
  starting_date?: string;
  activity_schedule_id?: string;
  image_url?: string;
};
