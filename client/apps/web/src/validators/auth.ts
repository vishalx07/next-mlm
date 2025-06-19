import { object, type TypeOf } from "zod";
import { ZOD_SCHEMA } from "@repo/libs/zod";

export const login = object({
  email: ZOD_SCHEMA.email(),
  password: ZOD_SCHEMA.password(),
});

export type Login = TypeOf<typeof login>;
