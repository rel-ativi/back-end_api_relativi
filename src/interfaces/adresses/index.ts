export interface IAddressRequest {
  street: string;
  number: string;
  zip_code: string;
  district_id: string;
  city_id: string;
  state_id: string;
  country_id: string;
}
export interface IAddressUpdate {
  street?: string;
  number?: string;
  zip_code?: string;
  district_id?: string;
  city_id?: string;
  state_id?: string;
  country_id?: string;
}
