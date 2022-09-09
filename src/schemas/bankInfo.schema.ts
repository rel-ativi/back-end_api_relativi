import * as yup from "yup";
import { SchemaOf } from "yup";

import { IBankInfo } from "../interfaces/bank_info";

export const bankInfoSchema: SchemaOf<IBankInfo> = yup.object().shape({
  bank: yup.string().required(),
  agency: yup.string().required(),
  account_number: yup.string().required(),
});
