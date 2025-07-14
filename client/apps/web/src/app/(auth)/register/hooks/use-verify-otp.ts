import { useRouter } from "next/navigation";
import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { register } from "@repo/gen/auth/v1/auth-AuthService_connectquery";
import { SessionKey } from "@/configs";
import { ROUTES } from "@/configs/routes";
import { onSuccessStep3 } from "@/stores/use-register-store";
import { authValidator } from "@/validators";

export type FormValues = authValidator.RegisterStep3;

export const useVerifyOtp = (defaultValues: FormValues) => {
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authValidator.registerStep3),
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation(register);

  const onSubmit = handleSubmit((formData) => {
    mutate(
      {
        otp: formData.otp as number,
        step1: {
          email: formData.email,
          password: formData.password,
        },
        step2: {
          referralId: formData.referralId as number,
          fullname: formData.fullname,
          country: formData.country,
          phoneNumber: formData.phoneNumber,
          // pass step1 to satisfy proto validation
          step1: {
            email: formData.email,
            password: formData.password,
          },
        },
      },
      {
        onSuccess(data) {
          onSuccessStep3();
          Cookies.set(SessionKey, data.token, {
            secure: true,
            expires: 1,
            sameSite: "None",
          });
          router.replace(ROUTES.user.dashboard);
          router.refresh();
        },
      },
    );
  });

  return { methods, isPending, onSubmit };
};
