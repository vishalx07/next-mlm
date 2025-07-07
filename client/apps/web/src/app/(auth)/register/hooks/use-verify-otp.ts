import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { register } from "@repo/gen/services/auth/v1/auth-AuthService_connectquery";
import { onSuccessStep3 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterStep_3;

export const useVerifyOtp = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep_3),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(register);

  const onSubmit = handleSubmit((formData) => {
    mutate(
      {
        otp: formData.otp as number,
        step1: {
          referralId: formData.referralId as number,
          fullname: formData.fullname,
          username: formData.username,
          country: formData.country,
          phoneNumber: formData.phoneNumber,
        },
        step2: {
          email: formData.email,
          password: formData.password,
        },
      },
      {
        onSuccess() {
          onSuccessStep3();
        },
      },
    );
  });

  return { methods, isPending, onSubmit };
};
