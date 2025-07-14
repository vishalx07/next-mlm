import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerStep2 } from "@repo/gen/auth/v1/auth-AuthService_connectquery";
import { onSuccessStep2 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterStep2;

export const useEnterDetails = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep2),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(registerStep2);

  const onSubmit = handleSubmit((formData) => {
    mutate(
      {
        referralId: formData.referralId as number,
        fullname: formData.fullname,
        username: formData.username,
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
