import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authValidator } from "@/validators";

const schema = authValidator.login;
export type FormValues = authValidator.Login;

const defaultValues: FormValues = {
  email: "",
  password: "",
};

export const useLoginForm = () => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    // mutation.mutate(formData);
  });

  return { methods, isPending: false, onSubmit };
};
