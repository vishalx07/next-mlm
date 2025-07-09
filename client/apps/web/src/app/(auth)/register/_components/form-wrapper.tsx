"use client";

import { switchInvalidCase } from "@repo/ui/utils";
import { useRegisterStore } from "@/stores/use-register-store";
import { EnterDetails } from "./enter-details";
import { EnterEmail } from "./enter-email";
import { VerifyOtp } from "./verify-otp";

export const FormWrapper = () => {
  const defaultValues = useRegisterStore();

  switch (defaultValues.step) {
    case 1:
      return <EnterDetails defaultValues={defaultValues} />;
    case 2:
      return <EnterEmail defaultValues={defaultValues} />;
    case 3:
      return <VerifyOtp defaultValues={defaultValues} />;
    default:
      return switchInvalidCase("Invalid step");
  }
};
