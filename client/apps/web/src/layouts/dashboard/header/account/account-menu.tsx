import { type Route } from "next";
import NextLink from "next/link";
import { Avatar, Menu, MenuItem, Text } from "@jamsr-ui/react";
import type { User } from "@repo/gen/types/v1/user_pb";
// import { APP_ROUTES } from "@/config/routes";
// import { getFileSrc } from "@/utils/url";
import { LogoutMenuItem } from "./logout-menu-item";

const MENU_ITEMS: { label: string; href: Route }[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/user/profile" },
];

type Props = {
  user: User;
};

export const AccountMenu = ({ user }: Props) => {
  const { userId, fullname, avatar } = user;
  return (
    <Menu
      triggerOn="hover"
      trigger={
        <Avatar
          width={50}
          height={50}
          // src={getFileSrc(avatar ?? "")}
          src={""}
          alt={fullname}
        />
      }
      className="w-[200px] p-0"
    >
      <div className="px-4 py-3">
        <Text
          as="p"
          variant="paragraph"
          className="font-semibold"
        >
          {fullname}
        </Text>
        <Text
          as="p"
          variant="paragraph2"
          className="text-foreground-secondary line-clamp-1"
        >
          {userId}
        </Text>
      </div>

      <div className="border-divider border-t" />

      <div className="p-2">
        {MENU_ITEMS.map(({ label, href }) => (
          <MenuItem
            key={label}
            as={NextLink}
            href={href}
          >
            {label}
          </MenuItem>
        ))}
      </div>

      <div className="border-divider border-t" />

      <div className="p-2">
        <LogoutMenuItem />
      </div>
    </Menu>
  );
};
