import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Text,
} from "@jamsr-ui/react";
import { AuthProvider } from "@repo/gen/enums/v1/enums_pb";
import { type User } from "@repo/gen/types/v1/user_pb";
import { FluentIcon, LogosIcon } from "@repo/ui/config/icons";

type Props = {
  providers: User["providers"];
};

export const LoginMethods = ({ providers }: Props) => {
  const options = Options({ providers });

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
                  {option.description}
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

function Options({ providers }: Props): {
  icon: React.ReactNode;
  provider: string;
  description: string;
  action: React.ReactNode;
  isCurrent?: boolean;
}[] {
  var isEmail_Password = false;
  var isGoogle = false;
  var isLinkedin = false;

  providers.forEach((provider) => {
    if (provider === AuthProvider.EMAIL_PASSWORD) isEmail_Password = true;
    if (provider === AuthProvider.GOOGLE) isGoogle = true;
    if (provider === AuthProvider.LINKEDIN) isLinkedin = true;
  });

  return [
    {
      icon: <FluentIcon.Mail />,
      provider: "Email & Password",
      description: "Log in with your email & password",
      action: isEmail_Password ? null : (
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
      isCurrent: true,
    },
    {
      icon: <LogosIcon.Google className="size-5" />,
      provider: "Google",
      description: "Log in with OAuth Google Provider",
      action: (
        <Button
          size="sm"
          radius="full"
          variant="outlined"
          color={isGoogle ? "danger" : "success"}
          className="border"
        >
          {isGoogle ? "Disable" : "Enable"}
        </Button>
      ),
    },
    {
      icon: <LogosIcon.Linkedin className="size-5" />,
      provider: "LinkedIn",
      description: "Log in with OAuth LinkedIn Provider",
      action: (
        <Button
          size="sm"
          radius="full"
          variant="outlined"
          color={isLinkedin ? "danger" : "success"}
          className="border"
        >
          {isLinkedin ? "Disable" : "Enable"}
        </Button>
      ),
    },
  ];
}
