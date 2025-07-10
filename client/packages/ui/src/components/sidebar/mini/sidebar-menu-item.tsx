import React from "react";
import NextLink from "next/link";
import {
  SidebarMenuItem as JamsrUiSidebarMenuItem,
  Menu,
  MenuItem,
  SidebarMenuItemButton,
} from "@jamsr-ui/react";
import { EvaIcon } from "@repo/ui/config/icons";
import { useActiveLink } from "@repo/ui/hooks/use-active-link";
import { cn } from "@repo/ui/utils";
import type { NavItem } from "../types";

type Props = NavItem;

export const SidebarMenuItem = React.memo(({ items = [], ...props }: Props) => {
  const hasChild = items.length > 0;

  return (
    <JamsrUiSidebarMenuItem>
      {hasChild ? (
        <Menu
          placement="right"
          triggerOn="hover"
          trigger={
            <Trigger
              hasChild={hasChild}
              {...props}
            />
          }
          classNames={{
            base: "w-full",
          }}
        >
          <NestedMenuItem items={items} />
        </Menu>
      ) : (
        <Trigger
          hasChild={hasChild}
          {...props}
        />
      )}
    </JamsrUiSidebarMenuItem>
  );
});

const Trigger = React.memo((props: Props & { hasChild: boolean }) => {
  const { icon, title, url = "#", hasChild } = props;
  const { active } = useActiveLink({ path: url });

  return (
    <SidebarMenuItemButton
      as={hasChild ? undefined : NextLink}
      href={url}
      prefetch={hasChild ? undefined : true}
      className={cn(
        "text-foreground-secondary relative inline-flex flex-col items-center justify-center gap-1 rounded-lg",
        active &&
          "bg-primary/10 text-primary data-[hovered=true]:bg-primary/20!",
      )}
    >
      {icon && (
        <span className="[&>svg]:size-(--dashboard-mini-item-icon)">
          {icon}
        </span>
      )}
      <span className="text-center text-[10px] leading-4 font-medium">
        {title}
      </span>
      {hasChild && (
        <EvaIcon.ArrowIosForward className="absolute top-2.5 right-1.5 size-4" />
      )}
    </SidebarMenuItemButton>
  );
});

type NestedMenuItemProps = {
  items: NavItem[];
};

const NestedMenuItem = React.memo(({ items }: NestedMenuItemProps) => {
  return items.map((item) => {
    const { title, url = "#", items = [] } = item;
    const hasChild = items.length > 0;
    const { active } = useActiveLink({ path: url });

    return hasChild ? (
      <Menu
        key={title}
        trigger={title}
        placement="right"
        classNames={{
          menuItem: "data-[active=true]:bg-content2/50!",
        }}
      >
        <NestedMenuItem items={items} />
      </Menu>
    ) : (
      <MenuItem
        key={title}
        as={NextLink}
        href={url}
        className={cn(
          active && "bg-content2/50 data-[hovered=true]:bg-content2!",
        )}
      >
        {title}
      </MenuItem>
    );
  });
});
