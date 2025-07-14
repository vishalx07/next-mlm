import type { Dispatch, SetStateAction } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  type DialogProps,
} from "@jamsr-ui/react";
import { RHFProvider } from "@jamsr-ui/rhf";

type Props<T extends FieldValues> = {
  heading: string;
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  };
  // rhf
  methods: UseFormReturn<T>;
  isPending: boolean;
  onSubmit: () => void;
} & DialogProps;

export const FormDialog = <T extends FieldValues>(props: Props<T>) => {
  const {
    heading,
    disclosure,
    children,
    methods,
    isPending,
    onSubmit,
    ...other
  } = props;
  const { isOpen, onClose, setIsOpen } = disclosure;

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      {...other}
    >
      <DialogContent>
        <DialogHeader>{heading}</DialogHeader>
        <DialogBody>
          <RHFProvider
            methods={methods}
            isPending={isPending}
            onSubmit={onSubmit}
          >
            {children}
            <div className="flex justify-end gap-3">
              <Button
                variant="outlined"
                className="border"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isPending}
                className="custom-button"
              >
                Submit
              </Button>
            </div>
          </RHFProvider>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
