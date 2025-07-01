import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { onSuccessStep3 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterStep_3;

export const useVerifyOtp = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep_3),
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    onSuccessStep3();
  });

  return { methods, isPending: false, onSubmit };
};
