import * as yup from "yup";
import { SchemaOf } from "yup";

import { IUserCertifications } from "../interfaces/user_certifications";

export const userCertificationSchema: SchemaOf<IUserCertifications> = yup
  .object()
  .shape({
    name: yup.string().required(),
    emmited_by: yup.string().required(),
    emission_date: yup.string().required(),
    expiration_date: yup.string(),
    user_id: yup.string().required(),
  });
