import * as z from "zod/v4";
import { ZOD_SCHEMA } from "@repo/ui/libs/zod";

export const updateProfile = z.object({
  avatar: ZOD_SCHEMA.str(),
  fullname: ZOD_SCHEMA.str().min(1, "Fullname is required"),
  country: ZOD_SCHEMA.str().min(1, "Country is required"),
  phoneNumber: ZOD_SCHEMA.str().min(1, "Phone number is required"),
});

export type UpdateProfile = z.input<typeof updateProfile>;

export const updatePassword = z
  .object({
    currentPassword: ZOD_SCHEMA.password("Current password"),
    newPassword: ZOD_SCHEMA.password("New password"),
    confirmPassword: ZOD_SCHEMA.str().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords are not matching",
  });

export type UpdatePassword = z.input<typeof updatePassword>;
