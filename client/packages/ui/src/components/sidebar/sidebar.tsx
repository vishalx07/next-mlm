"use client";

import type { Route } from "next";
import { useDisclosure } from "@jamsr-ui/hooks";
import { Drawer } from "@jamsr-ui/react";
import { useSidebarOpen } from "@repo/ui/stores/use-sidebar-open";
import { cn } from "@repo/ui/utils";
import { SidebarMini } from "./mini";
import { SidebarToggleButton } from "./sidebar-toggle-button";
import type { NavItem } from "./types";
import { SidebarVertical } from "./vertical";

type Props = {
  navItems: NavItem[];
  logoHref?: Route;
};

export const Sidebar = ({ navItems, logoHref }: Props) => {
  const openSidebar = useSidebarOpen((s) => s.isOpen);
  const setOpenSidebar = useSidebarOpen((s) => s.setIsOpen);

  const { isOpen: isNavMini, onToggle: onToggleNav } = useDisclosure();

  return (
    <>
      <div
        className={cn(
          "border-divider relative shrink-0 border-r transition-[width] max-lg:hidden",
          isNavMini ? "w-(--dashboard-mini-w)" : "w-(--dashboard-w)",
        )}
      >
        <SidebarToggleButton
          isNavMini={isNavMini}
          onToggleNav={onToggleNav}
        />
        {isNavMini ? (
          <SidebarMini
            navItems={navItems}
            logoHref={logoHref}
          />
        ) : (
          <SidebarVertical
            navItems={navItems}
            logoHref={logoHref}
          />
        )}
      </div>

      <Drawer
        anchor="left"
        isOpen={openSidebar}
        onOpenChange={setOpenSidebar}
        className="max-w-(--dashboard-w)! bg-transparent lg:hidden"
      >
        <SidebarVertical
          navItems={navItems}
          logoHref={logoHref}
        />
      </Drawer>
    </>
  );
};
