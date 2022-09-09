import * as yup from "yup";
import { SchemaOf } from "yup";

import { IPaymentInfo } from "../interfaces/payment_info";

export const paymentInfoSchema: SchemaOf<IPaymentInfo> = yup.object().shape({
  card_name: yup.string().required(),
  card: yup.string().required(),
  due_date: yup.string().required(),
  sec_code: yup.number().required(),
});
