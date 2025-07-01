import { Button } from "@jamsr-ui/react";
import { RHFInput, RHFProvider } from "@jamsr-ui/rhf";
import { onBack } from "@/stores/use-register-store";
import { useEnterEmail, type FormValues } from "../hooks/use-enter-email";

type Props = {
  defaultValues: FormValues;
};

export const EnterEmail = ({ defaultValues }: Props) => {
  const { methods, isPending, onSubmit } = useEnterEmail(defaultValues);

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
      <RHFInput<FormValues>
        name="confirmPassword"
        label="Confirm Password"
        isSecuredText
        isFilled
      />

      <div className="grid w-full grid-cols-2 gap-4">
        <Button
          fullWidth
          variant="flat"
          onClick={onBack}
        >
          Go Back
        </Button>
        <Button
          fullWidth
          type="submit"
          variant="flat"
          isLoading={isPending}
        >
          Continue
        </Button>
      </div>
    </RHFProvider>
  );
};
