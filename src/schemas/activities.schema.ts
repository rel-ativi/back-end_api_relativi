import * as yup from "yup";
import { SchemaOf } from "yup";

import { IActivitySchedule, IActivitySchema } from "../interfaces/activities";
import { addressSchema } from "./address.schema";

export const activitySchema: SchemaOf<IActivitySchema> = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  min_users: yup.number(),
  max_users: yup.number().required(),
  duration: yup.number().required(),
  category_id: yup.string().required(),
  recurrent: yup.boolean().required(),
  starting_date: yup.string().required(),
  address: addressSchema,
  activity_schedule_id: yup.string(),
});

export const activityScheduleSchema: SchemaOf<IActivitySchedule> = yup
  .object()
  .shape({
    time: yup.string().required(),
    days: yup.array(),
  });
