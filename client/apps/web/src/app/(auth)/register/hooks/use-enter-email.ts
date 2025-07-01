import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { onSuccessStep2 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterStep_2;

export const useEnterEmail = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep_2),
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    onSuccessStep2(formData);
  });

  return { methods, isPending: false, onSubmit };
};
