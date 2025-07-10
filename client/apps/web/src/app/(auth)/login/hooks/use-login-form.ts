import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@repo/gen/auth/v1/auth-AuthService_connectquery";
import { authValidator } from "@/validators";

const schema = authValidator.login;
export type FormValues = authValidator.Login;

const defaultValues: FormValues = {
  email: "demo123@example.com",
  password: "demo123",
};

export const useLoginForm = () => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(login);

  const onSubmit = handleSubmit((formData) => {
    mutate({
      email: formData.email,
      password: formData.password,
    });
  });

  return { methods, isPending, onSubmit };
};
