import * as yup from "yup";
import { SchemaOf } from "yup";

import { INameNumber, INameOnly } from "../interfaces/generic";

export const nameOnlySchema: SchemaOf<INameOnly> = yup.object().shape({
  name: yup.string().required(),
});

export const nameNumberSchema: SchemaOf<INameNumber> = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required().min(0).max(6),
});
