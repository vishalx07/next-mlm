import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthService } from "@repo/gen/auth/v1/auth_pb";
import { onSuccessStep1 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterStep1;

export const useEnterEmail = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep1),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(AuthService.method.registerStep1);

  const onSubmit = handleSubmit((formData) => {
    mutate(
      {
        email: formData.email,
        password: formData.password,
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
