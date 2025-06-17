import { string } from "zod";
import { MIN_PASSWORD_LENGTH } from "@repo/app-config";

// -----------------------------------------

const str = () => string().trim();

const email = () =>
  str()
    .min(1, "Email is required")
    .email("Invalid eamil address")
    .toLowerCase();

const password = (name: string = "Password") =>
  str()
    .min(1, `${name} is required`)
    .min(
      MIN_PASSWORD_LENGTH,
      `${name} must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );

export const ZOD_SCHEMA = {
  str,
  email,
  password,
};
