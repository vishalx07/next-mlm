import { useDisclosure } from "@jamsr-ui/hooks";
import { Button } from "@jamsr-ui/react";
import { RHFInput } from "@jamsr-ui/rhf";
import { type User } from "@repo/gen/types/v1/user_pb";
import { FormDialog } from "@repo/ui/components/form-dialog";
import { SolarIcon } from "@repo/ui/config/icons";
// import { RHFImage } from "@/components/upload";
import { useUpdateProfile, type FormValues } from "../hooks/use-update-profile";

type Props = {
  user: User;
};

export const UpdateProfile = ({ user }: Props) => {
  const disclosure = useDisclosure();
  const { onOpen, onClose } = disclosure;
  const { methods, isPending, onSubmit } = useUpdateProfile({ user, onClose });

  return (
    <>
      <Button
        color="primary"
        size="sm"
        variant="outlined"
        className="border"
        startContent={<SolarIcon.Pen className="size-3.5" />}
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <FormDialog<FormValues>
        heading="Update Profile"
        disclosure={disclosure}
        methods={methods}
        isPending={isPending}
        onSubmit={onSubmit}
      >
        {/* <RHFImage<FormValues>
          name="avatar"
          label="Avatar"
          isAvatar={true}
          isValueString={true}
        /> */}
        <RHFInput<FormValues>
          name="fullname"
          label="Fullname"
        />
        <RHFInput<FormValues>
          name="country"
          label="Country"
        />
        <RHFInput<FormValues>
          name="phoneNumber"
          label="Phone Number"
        />
      </FormDialog>
    </>
  );
};
