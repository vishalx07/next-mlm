import { create } from "zustand";
import { authValidator } from "@/validators";

type Step1 = {
  step: 1;
} & authValidator.RegisterStep1;

type Step2 = {
  step: 2;
} & authValidator.RegisterStep2;

type Step3 = {
  step: 3;
} & authValidator.RegisterStep3;

type State = Step1 | Step2 | Step3;

const defaultValues: State = {
  step: 1,
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegisterStore = create<State>(() => defaultValues);

const onReset = () => {
  useRegisterStore.setState(defaultValues);
};

export const onBack = () => {
  useRegisterStore.setState((defaultValues) => {
    switch (defaultValues.step) {
      case 1:
        return defaultValues;
      case 2:
        return { ...defaultValues, step: 1 };
      case 3:
        return { ...defaultValues, step: 2 };
    }
  });
};

export const onSuccessStep1 = (formValues: Omit<Step1, "step">) => {
  const step2DefaultValues: Step2 = {
    ...formValues,
    step: 2,
    referralId: "",
    fullname: "",
    country: "",
    phoneNumber: "",
  };
  useRegisterStore.setState(step2DefaultValues);
};

export const onSuccessStep2 = (formValues: Omit<Step2, "step">) => {
  const step3DefaultValues: Step3 = {
    ...formValues,
    step: 3,
    otp: "",
  };
  useRegisterStore.setState(step3DefaultValues);
};

export const onSuccessStep3 = () => {
  onReset();
};
