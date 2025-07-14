import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthService } from "@repo/gen/auth/v1/auth_pb";
import { onSuccessStep2 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterStep2;

export const useEnterDetails = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep2),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(AuthService.method.registerStep2);

  const onSubmit = handleSubmit((formData) => {
    mutate(
      {
        referralId: formData.referralId as number,
        fullname: formData.fullname,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        step1: {
          email: formData.email,
          password: formData.password,
        },
      },
      {
        onSuccess() {
          onSuccessStep2(formData);
        },
      },
    );
  });

  return { methods, isPending, onSubmit };
};
