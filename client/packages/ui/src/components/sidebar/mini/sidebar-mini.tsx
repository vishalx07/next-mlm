import type { Route } from "next";
import { Sidebar, SidebarContent, SidebarMenu } from "@jamsr-ui/react";
import { Logo } from "@repo/ui/components/logo";
import type { NavItem } from "../types";
import { SidebarMenuItem } from "./sidebar-menu-item";

type Props = { navItems: NavItem[]; logoHref?: Route };

export const SidebarMini = ({ navItems, logoHref }: Props) => {
  return (
    <Sidebar className={"sticky top-0 w-full p-0"}>
      <div className="flex justify-center py-5">
        <Logo href={logoHref} />
      </div>
      <SidebarContent className="scrollbar-hide gap-1 overflow-hidden overflow-y-auto px-1 py-0 pb-4">
        {navItems.map(({ title, items = [] }) => (
          <SidebarMenu
            key={title}
            className="flex flex-col gap-1"
          >
            {items.map((item) => (
              <SidebarMenuItem
                key={item.title}
                {...item}
              />
            ))}
          </SidebarMenu>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
