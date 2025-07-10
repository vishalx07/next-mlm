import type { Route } from "next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@jamsr-ui/react";
import { Logo } from "@repo/ui/components/logo";
import type { NavItem } from "../types";
import { SidebarMenuItem } from "./sidebar-menu-item";

type Props = {
  logoHref?: Route;
  navItems: NavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const SidebarVertical = (props: Props) => {
  const { logoHref, navItems, header, footer } = props;
  return (
    <Sidebar className={"sticky top-0 w-full p-0"}>
      <div className="pt-5 pb-2 pl-7">
        <Logo href={logoHref} />
      </div>
      {header}
      {/* scrollbar-thin class from global.css */}
      <SidebarContent className="scrollbar-thin overflow-hidden overflow-y-auto pr-2 pl-4">
        {navItems.map((item) => {
          const { title, items = [] } = item;
          return (
            <SidebarGroup
              key={title}
              className="gap-3"
            >
              <SidebarGroupLabel className="pl-3 font-bold uppercase opacity-80">
                {title}
              </SidebarGroupLabel>
              <SidebarMenu className="flex flex-col gap-1">
                {items.map((item) => {
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      {...item}
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      {footer}
    </Sidebar>
  );
};
