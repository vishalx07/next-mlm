import * as z from "zod/v4";
import { ZOD_SCHEMA } from "@repo/ui/libs/zod";

// login
export const login = z.object({
  email: ZOD_SCHEMA.email(),
  password: ZOD_SCHEMA.password(),
});

export type Login = z.input<typeof login>;

// register
export const registerStep1 = z
  .object({
    email: ZOD_SCHEMA.email(),
    password: ZOD_SCHEMA.password(),
    confirmPassword: ZOD_SCHEMA.str().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords are not matching",
  });
export type RegisterStep1 = z.input<typeof registerStep1>;

export const registerStep2 = z
  .object({
    referralId: ZOD_SCHEMA.number().min(1, "Referral Id is required"),
    fullname: ZOD_SCHEMA.str().min(1, "Fullname is required"),
    username: ZOD_SCHEMA.username(),
    country: ZOD_SCHEMA.str().min(1, "Country is required"),
    phoneNumber: ZOD_SCHEMA.str().min(1, "Phone number is required"),
  })
  .and(registerStep1);
export type RegisterStep2 = z.input<typeof registerStep2>;

export const registerStep3 = z
  .object({ otp: ZOD_SCHEMA.otp() })
  .and(registerStep2);
export type RegisterStep3 = z.input<typeof registerStep3>;
