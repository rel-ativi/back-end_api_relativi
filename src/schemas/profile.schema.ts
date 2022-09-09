import * as yup from "yup";
import { SchemaOf } from "yup";

import { IProfileSchema, IUserScheduleRequest } from "../interfaces/profiles";

export const profileSchema: SchemaOf<IProfileSchema> = yup.object().shape({
  bio: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  bank_info: yup.string(),
  payment_info: yup.string(),
});

export const userScheduleSchema: SchemaOf<IUserScheduleRequest> = yup
  .object()
  .shape({
    date: yup.date().required(),
  });
