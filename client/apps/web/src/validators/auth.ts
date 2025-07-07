import * as z from "zod/v4";
import { ZOD_SCHEMA } from "@repo/libs/zod";

// login
export const login = z.object({
  email: ZOD_SCHEMA.email(),
  password: ZOD_SCHEMA.password(),
});

export type Login = z.input<typeof login>;

// register
export const registerStep_1 = z.object({
  referralId: ZOD_SCHEMA.number().min(1, "Referral Id is required"),
  fullname: ZOD_SCHEMA.str().min(1, "Fullname is required"),
  username: ZOD_SCHEMA.username(),
  country: ZOD_SCHEMA.str().min(1, "Country is required"),
  phoneNumber: ZOD_SCHEMA.str().min(1, "Phone number is required"),
});
export type RegisterSetp_1 = z.input<typeof registerStep_1>;

export const registerStep_2 = z
  .object({
    email: ZOD_SCHEMA.email(),
    password: ZOD_SCHEMA.password(),
    confirmPassword: ZOD_SCHEMA.str().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords are not matching",
  })
  .and(registerStep_1);
export type RegisterStep_2 = z.input<typeof registerStep_2>;

export const registerStep_3 = z
  .object({ otp: ZOD_SCHEMA.otp() })
  .and(registerStep_2);
export type RegisterStep_3 = z.input<typeof registerStep_3>;
