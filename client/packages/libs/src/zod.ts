import * as z from "zod/v4";
import { MIN_PASSWORD_LENGTH, OTP_LENGTH } from "@repo/app-config";

// -----------------------------------------

const str = () => z.string().trim();

const number = () => z.coerce.number();

const email = () => z.email("Invalid eamil address").trim().toLowerCase();

const username = () => str().min(1, "Username is required").toLowerCase();

const password = (name: string = "Password") =>
  str()
    .min(1, `${name} is required`)
    .min(
      MIN_PASSWORD_LENGTH,
      `${name} must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );

const otp = (name: string = "OTP") =>
  number()
    .gte(10 ** (OTP_LENGTH - 1), `${name} must be ${OTP_LENGTH} digits`)
    .lte(10 ** OTP_LENGTH - 1, `${name} must be ${OTP_LENGTH} digits`);

export const ZOD_SCHEMA = {
  str,
  number,
  email,
  username,
  password,
  otp,
};
