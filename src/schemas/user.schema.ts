import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/users";

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  is_adm: yup.boolean(),
  is_pro_user: yup.boolean(),
  bio: yup.string().required(),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, "Only numbers are accepted in phone number")
    .required(),
});
