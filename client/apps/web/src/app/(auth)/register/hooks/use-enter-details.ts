import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { onSuccessStep1 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterSetp_1;

export const useEnterDetails = (defaultValues: FormValues) => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep_1),
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    onSuccessStep1(formData);
  });

  return { methods, isPending: false, onSubmit };
};
