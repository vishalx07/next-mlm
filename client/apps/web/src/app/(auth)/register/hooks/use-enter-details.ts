import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerStep1 } from "@repo/gen/services/auth/v1/auth-AuthService_connectquery";
import { onSuccessStep1 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterSetp_1;

export const useEnterDetails = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep_1),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(registerStep1);

  const onSubmit = handleSubmit((formData) => {
    mutate(
      {
        referralId: formData.referralId as number,
        fullname: formData.fullname,
        username: formData.username,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
      },
      {
        onSuccess() {
          onSuccessStep1(formData);
        },
      },
    );
  });

  return { methods, isPending, onSubmit };
};
