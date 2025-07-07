import { Button } from "@jamsr-ui/react";
import { RHFInput, RHFProvider } from "@jamsr-ui/rhf";
import { useEnterDetails, type FormValues } from "../hooks/use-enter-details";

type Props = {
  defaultValues: FormValues;
};

export const EnterDetails = ({ defaultValues }: Props) => {
  const { methods, isPending, onSubmit } = useEnterDetails(defaultValues);

  return (
    <>
      <RHFProvider
        methods={methods}
        isPending={isPending}
        onSubmit={onSubmit}
        className="gap-6"
      >
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <RHFInput<FormValues>
            name="referralId"
            label="Referral Id"
            isFilled
            isNumberInput
          />
          <RHFInput<FormValues>
            name="fullname"
            label="Fullname"
            isFilled
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <RHFInput<FormValues>
            name="username"
            label="Username"
            isFilled
          />
          <RHFInput<FormValues>
            name="country"
            label="Country"
            isFilled
          />
        </div>
        <RHFInput<FormValues>
          name="phoneNumber"
          label="Phone Number"
          isFilled
          isNumberInput
        />

        <Button
          fullWidth
          type="submit"
          variant="flat"
          isLoading={isPending}
        >
          Continue
        </Button>
      </RHFProvider>
    </>
  );
};
