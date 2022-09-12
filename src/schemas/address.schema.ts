import * as yup from "yup";
import { SchemaOf } from "yup";

import { IAddressRequest } from "../interfaces/adresses";

export const addressSchema: SchemaOf<IAddressRequest> = yup.object().shape({
  street: yup.string().required(),
  number: yup.string().required(),
  zip_code: yup
    .string()
    .required()
    .test("len", "Invalid zip code", (val) => val!.length === 8),
  district_id: yup.string().required(),
  city_id: yup.string().required(),
  state_id: yup.string().required(),
  country_id: yup.string().required(),
});
