import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { rpcTransport } from "@repo/gen/grpc-client";
import { type User } from "@repo/gen/types/v1/user_pb";
import { ProfileService } from "@repo/gen/user/profile/v1/profile_pb";
import { profileValidator } from "@/validators";

export type FormValues = profileValidator.UpdateProfile;

type Props = {
  user: User;
  onClose: () => void;
};

export const useUpdateProfile = ({ user, onClose }: Props) => {
  const queryClient = useQueryClient();

  const queryKey = createConnectQueryKey({
    schema: ProfileService.method.getProfile,
    transport: rpcTransport,
    cardinality: "finite",
    input: {},
  });

  const defaultValues: FormValues = {
    avatar: user.avatar ?? "",
    fullname: user.fullname,
    country: user.country,
    phoneNumber: user.phoneNumber,
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(profileValidator.updateProfile),
  });

  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(
    ProfileService.method.updateProfile,
    {
      onSuccess({ user }) {
        queryClient.setQueryData(queryKey, (prev) => {
          if (!prev) return prev;
          return { ...prev, user };
        });
        onClose();
      },
    },
  );

  const onSubmit = handleSubmit((formData) => {
    mutate({
      avatar: formData.avatar,
      fullname: formData.fullname,
      country: formData.country,
      phoneNumber: formData.phoneNumber,
    });
  });

  return { methods, isPending, onSubmit };
};
