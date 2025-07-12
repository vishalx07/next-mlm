import { Link } from "@jamsr-ui/next";
import { Button, Checkbox } from "@jamsr-ui/react";
import { RHFInput, RHFProvider } from "@jamsr-ui/rhf";
import { ROUTES } from "@/configs/routes";
import { useLoginForm, type FormValues } from "../hooks/use-login-form";

export const LoginForm = () => {
  const { methods, isPending, onSubmit } = useLoginForm();

  return (
    <RHFProvider
      methods={methods}
      isPending={isPending}
      onSubmit={onSubmit}
      className="gap-6"
    >
      <RHFInput<FormValues>
        name="email"
        type="email"
        label="Email address"
        isFilled
      />
      <RHFInput<FormValues>
        name="password"
        label="Password"
        isSecuredText
        isFilled
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked
        />
        <Link
          href={ROUTES.forgotPassword}
          variant="paragraph2"
          className="self-end font-medium"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        fullWidth
        type="submit"
        variant="flat"
        isLoading={isPending}
      >
        Sign in
      </Button>
    </RHFProvider>
  );
};
