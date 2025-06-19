import { UINextConfigProvider } from "@jamsr-ui/next";
import { UIConfigProvider, UIProvider } from "@jamsr-ui/react";
import { UIRHFConfigProvider } from "@jamsr-ui/rhf";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  return (
    <UIProvider>
      <UINextConfigProvider
        link={{
          prefetch: true,
        }}
      >
        <UIConfigProvider
          accordion={{
            radius: "lg",
          }}
          accordionItem={{
            classNames: /** @tw */ {
              trigger: "cursor-pointer",
            },
          }}
          alert={{
            radius: "lg",
          }}
          button={{
            radius: "lg",
            props({ variant }) {
              return variant === "solid" || variant === "flat"
                ? { className: "border border-divider-light" }
                : {};
            },
          }}
          card={{
            radius: "2xl",
            className: "shadow-card",
          }}
          dataTable={{
            allowHover: true,
            isServer: false,
            radius: "2xl",
            classNames: /** @tw */ {
              td: "first:rounded-l-xl last:rounded-r-xl",
            },
          }}
          dialog={{
            radius: "2xl",
            backdrop: "blur",
            classNames: /** @tw */ {
              closeButton: "size-8 min-w-8",
            },
          }}
          editor={{
            radius: "lg",
            contentType: "json",
            classNames: /** @tw */ {
              base: "gap-2",
              editor:
                "border dark:border-default-200/50 dark:uig-hover:border-default-200",
              label: "text-foreground-secondary",
              content: "p-6",
            },
          }}
          //   fileUploadSingle={{
          //     radius: "lg",
          //     uploadIcon: <EvaIcon.CloudUpload />,
          //     classNames: /** @tw */ {
          //       picker: "border dark:border-default-200/50 dark:uig-hover:border-default-200",
          //       label: "text-foreground-secondary",
          //     },
          //   }}
          //   fileUploadMulti={{
          //     radius: "lg",
          //     uploadIcon: <EvaIcon.CloudUpload />,
          //     classNames: /** @tw */ {
          //       picker: "border dark:border-default-200/50 dark:uig-hover:border-default-200",
          //       label: "text-foreground-secondary",
          //     },
          //   }}
          iconButton={{
            radius: "lg",
          }}
          input={{
            fullWidth: true,
            variant: "bordered",
            props({ variant, isFilled }) {
              switch (variant) {
                case "outlined": {
                  return {
                    size: "sm",
                    classNames: /** @tw */ {
                      inputWrapper: isFilled
                        ? "border border-transparent uig-hover:border-transparent"
                        : "border border-divider uig-hover:border-divider-dark",
                    },
                  };
                }
                default:
                  // for variant "bordered"
                  return {
                    classNames: /** @tw */ {
                      inputWrapper: isFilled
                        ? "border border-transparent uig-hover:border-transparent"
                        : "border border-divider uig-hover:border-divider-dark",
                      label: "group-data-[filled-within=true]:font-semibold",
                    },
                  };
              }
            },
          }}
          menu={{
            radius: "lg",
            classNames: /** @tw */ {
              popover: "outline-hidden",
            },
          }}
          menuItem={{
            className:
              /** @tw */ "[&>.grow]:flex [&>.grow]:gap-3 [&>.grow]:items-center",
          }}
          otpInput={{
            radius: "lg",
            classNames: /** @tw */ {
              input:
                "border dark:border-default-200/50 dark:uig-hover:border-default-200",
            },
          }}
          popover={{
            classNames: /** @tw */ {
              base: "outline-hidden",
            },
          }}
          rating={{
            classNames: /** @tw */ {
              starWrapper: "text-default-400",
            },
          }}
          select={{
            radius: "lg",
            classNames: /** @tw */ {
              trigger:
                "border dark:border-default-200/50 dark:uig-hover:border-default-200",
            },
          }}
          skeleton={{
            className: "rounded-xl h-[100px]",
          }}
          tagsInput={{
            classNames: /** @tw */ {
              contentWrapper: "py-2 px-3 gap-1.5",
              input: "placeholder:text-base",
            },
            slotProps: {
              chip: {
                size: "sm",
                radius: "lg",
              },
            },
          }}
          textarea={{
            fullWidth: true,
            rows: 4,
            radius: "lg",
            classNames: /** @tw */ {
              inputWrapper:
                "border dark:border-default-200/50 dark:uig-hover:border-default-200",
              label: "text-foreground-secondary",
              mainWrapper: "gap-2",
            },
          }}
          tooltip={{
            classNames: /** @tw */ {
              content: "border-[0.5px] border-divider text-xs",
            },
          }}
          tabs={{
            classNames: /** @tw */ {
              base: "overflow-x-auto scrollbar-hide",
            },
          }}
        >
          <UIRHFConfigProvider>{children}</UIRHFConfigProvider>
        </UIConfigProvider>
      </UINextConfigProvider>
    </UIProvider>
  );
};
