import { useRouter } from "next/navigation";
import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { login } from "@repo/gen/auth/v1/auth-AuthService_connectquery";
import { SessionKey } from "@/configs";
import { authValidator } from "@/validators";

const schema = authValidator.login;
export type FormValues = authValidator.Login;

const defaultValues: FormValues = {
  email: "demo123@example.com",
  password: "demo123",
};

export const useLoginForm = () => {
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(login, {
    onSuccess(data) {
      Cookies.set(SessionKey, data.token, {
        secure: true,
        expires: 1,
        sameSite: "None",
      });
      router.replace("/user/dashboard");
      router.refresh();
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutate({
      email: formData.email,
      password: formData.password,
    });
  });

  return { methods, isPending, onSubmit };
};
