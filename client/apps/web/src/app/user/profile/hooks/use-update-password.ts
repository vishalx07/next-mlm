import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileService } from "@repo/gen/user/profile/v1/profile_pb";
import { profileValidator } from "@/validators";

export type FormValues = profileValidator.UpdatePassword;

const defaultValues: FormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

type Props = {
  onClose: () => void;
};

export const useUpdatePassword = ({ onClose }: Props) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(profileValidator.updatePassword),
  });
  const { reset, handleSubmit } = methods;

  const { mutate, isPending } = useMutation(
    ProfileService.method.updatePassword,
    {
      onSuccess() {
        reset();
        onClose();
      },
    },
  );

  const onSubmit = handleSubmit((formData) => {
    mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  });

  return { methods, isPending, onSubmit };
};
