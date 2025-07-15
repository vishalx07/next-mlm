"use client";

import { useQuery } from "@connectrpc/connect-query";
import { Avatar } from "@jamsr-ui/next";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Text,
} from "@jamsr-ui/react";
import { AuthProvider, UserStatus } from "@repo/gen/enums/v1/enums_pb";
import { type User } from "@repo/gen/types/v1/user_pb";
import {
  ProfileService,
  type GetProfileResponse,
} from "@repo/gen/user/profile/v1/profile_pb";
import { cn } from "@repo/ui/utils";
import { fDateTime, timestampToDate } from "@repo/ui/utils/time";
// import { getFileSrc } from "@/utils/url";

import { InfoBox, type InfoBoxType } from "./info-box";
import { UpdatePassword } from "./update-password";
import { UpdateProfile } from "./update-profile";

type Props = {
  initialData: GetProfileResponse;
};

export const ProfileCard = ({ initialData }: Props) => {
  const { data, isLoading } = useQuery(
    ProfileService.method.getProfile,
    {},
    { initialData },
  );

  if (isLoading) return <Skeleton className="h-[100px] w-full rounded-2xl" />;

  if (!data || !data.user || !data.loginMethod) return null;

  const { userId, fullname, avatar } = data.user;

  const isEmail_Password = data.user.providers.includes(
    AuthProvider.EMAIL_PASSWORD,
  );

  return (
    <Card className="w-full">
      <CardHeader
        heading="Profile Details"
        subHeading="View and update your account details, profile and more."
        className="mb-2"
        classNames={{ innerWrapper: "gap-1", subHeading: "text-base" }}
      />
      <CardContent>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              width={100}
              height={100}
              // src={getFileSrc(avatar ?? "")}
              src={avatar}
              alt={fullname}
              className="size-20"
            />

            <div>
              <Text
                as="h4"
                variant="h4"
              >
                {fullname}
              </Text>
              <Text
                as="p"
                variant="paragraph2"
                className="text-foreground-secondary"
              >
                {userId}
              </Text>
            </div>
          </div>

          <UpdateProfile user={data.user} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {INFO(data.user, isEmail_Password).map((item) => (
            <InfoBox
              key={item.label}
              info={item}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

function INFO(user: User, isEmail_Password: boolean): InfoBoxType[] {
  const { email, referralId, status, country, phoneNumber, createdAt } = user;

  return [
    {
      label: "Email",
      value: email,
    },
    {
      label: "Password",
      value: String("*").repeat(8),
      endContent: isEmail_Password ? (
        <UpdatePassword />
      ) : (
        <Button
          size="xs"
          variant="flat"
        >
          Set Password
        </Button>
      ),
    },
    {
      label: "Country",
      value: country,
    },
    {
      label: "Phone Number",
      value: phoneNumber,
    },
    {
      label: "Member Since",
      value: createdAt ? fDateTime(timestampToDate(createdAt)) : "_",
    },
    {
      label: "Referral Id",
      value: referralId === 0 ? "_" : referralId,
    },
    {
      label: "Status",
      value: (
        <div
          className={cn(
            "flex items-center gap-2",
            status === UserStatus.ACTIVE
              ? "[--status-color:var(--ui-success)]"
              : "[--status-color:var(--ui-danger)]",
          )}
        >
          <div className={"size-2 rounded-full bg-(--status-color)"} />
          <Text
            as="p"
            variant="paragraph"
            className={"text-(--status-color) uppercase"}
          >
            {status === UserStatus.ACTIVE ? "ACTIVE" : "BLOCKED"}
          </Text>
        </div>
      ),
    },
    {
      label: "Plans",
      value: "No Plans",
    },
  ];
}
