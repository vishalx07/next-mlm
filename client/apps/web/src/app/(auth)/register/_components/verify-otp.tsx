import { Button, Text } from "@jamsr-ui/react";
import { RHFOtpInput, RHFProvider } from "@jamsr-ui/rhf";
import { OTP_LENGTH } from "@repo/ui/config/app-config";
import { onBack } from "@/stores/use-register-store";
import { useVerifyOtp, type FormValues } from "../hooks/use-verify-otp";

type Props = {
  defaultValues: FormValues;
};

export const VerifyOtp = ({ defaultValues }: Props) => {
  const { methods, isPending, onSubmit } = useVerifyOtp(defaultValues);

  return (
    <>
      <Text
        as="p"
        variant="paragraph2"
        className="text-foreground-secondary mb-6 text-center"
      >
        Otp has been send to email{" "}
        <span className="text-foreground">{defaultValues.email}</span>
      </Text>

      <RHFProvider
        methods={methods}
        isPending={isPending}
        onSubmit={onSubmit}
        className="items-center gap-6"
      >
        <RHFOtpInput<FormValues>
          name="otp"
          numberOfDigits={OTP_LENGTH}
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
            Verify OTP
          </Button>
        </div>
      </RHFProvider>

      <Text
        as="p"
        variant="paragraph2"
        className="text-foreground-secondary mt-6 text-center"
      >
        Don't receive the code?
      </Text>

      <div className="mt-1 flex justify-center">
        <Button
          size="xs"
          radius="md"
          color="primary"
          variant="light"
          //   isLoading={resendPending}
          //   onClick={handleResendOtp}
        >
          Resend
        </Button>
      </div>
    </>
  );
};
