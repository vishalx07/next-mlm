"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { RHFInput } from "@jamsr-ui/rhf";
import { FormDialog } from "@repo/ui/components/form-dialog";
import { SolarIcon } from "@repo/ui/config/icons";
import {
  useUpdatePassword,
  type FormValues,
} from "../hooks/use-update-password";

export const UpdatePassword = () => {
  const disclosure = useDisclosure();
  const { onOpen, onClose } = disclosure;
  const { methods, isPending, onSubmit } = useUpdatePassword({ onClose });

  return (
    <>
      <SolarIcon.Pen
        className="size-4.5 cursor-pointer"
        onClick={onOpen}
      />

      <FormDialog<FormValues>
        heading="Update Password"
        disclosure={disclosure}
        methods={methods}
        isPending={isPending}
        onSubmit={onSubmit}
      >
        <RHFInput<FormValues>
          name="currentPassword"
          label="Current password"
          isSecuredText
        />
        <RHFInput<FormValues>
          name="newPassword"
          label="New password"
          isSecuredText
        />
        <RHFInput<FormValues>
          name="confirmPassword"
          label="Confirm password"
          isSecuredText
        />
      </FormDialog>
    </>
  );
};
