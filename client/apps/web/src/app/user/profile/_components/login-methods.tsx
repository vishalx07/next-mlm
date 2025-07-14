import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Text,
} from "@jamsr-ui/react";
import { FluentIcon, LogosIcon } from "@repo/ui/config/icons";
import { fDateTime } from "@repo/ui/utils/time";

export const LoginMethods = () => {
  const options = Options();

  return (
    <Card>
      <CardHeader
        heading="Login Methods"
        subHeading="Link your account to third-party authentication providers."
        className="mb-2"
        classNames={{ innerWrapper: "gap-1", subHeading: "text-base" }}
      />
      <CardContent className="flex flex-col gap-6">
        {options.map((option) => (
          <div
            key={option.provider}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              {option.icon}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Text
                    as="p"
                    variant="paragraph"
                    className="font-semibold"
                  >
                    {option.provider}&nbsp;
                  </Text>
                  {option.isCurrent && (
                    <Chip
                      color="success"
                      variant="dot"
                      className="text-success"
                    >
                      Current
                    </Chip>
                  )}
                </div>
                <Text
                  as="p"
                  variant="paragraph2"
                  className="text-foreground-secondary"
                >
                  Connected on {fDateTime(option.connectedOn)}
                </Text>
              </div>
            </div>

            {option.action}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

function Options(): {
  icon: React.ReactNode;
  provider: string;
  connectedOn: Date;
  action: React.ReactNode;
  isCurrent?: boolean;
}[] {
  return [
    {
      icon: <FluentIcon.Mail />,
      provider: "Email & Password",
      connectedOn: new Date(),
      action: null,
      isCurrent: true,
    },
    {
      icon: <LogosIcon.Google className="size-5" />,
      provider: "Google",
      connectedOn: new Date(),
      action: (
        <Button
          size="sm"
          radius="full"
          variant="outlined"
          color="danger"
          className="border"
        >
          Disable
        </Button>
      ),
    },
    {
      icon: <LogosIcon.Linkedin className="size-5" />,
      provider: "LinkedIn",
      connectedOn: new Date(),
      action: (
        <Button
          size="sm"
          radius="full"
          variant="outlined"
          color="success"
          className="border"
        >
          Enable
        </Button>
      ),
    },
  ];
}
