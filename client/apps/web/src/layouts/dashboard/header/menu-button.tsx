"use client";

// import MenuIcon from "~/svg/menu.svg";
import { IconButton } from "@jamsr-ui/react";
import { useSidebarOpen } from "@repo/ui/stores/use-sidebar-open";

export const MenuButton = () => {
  const onOpen = useSidebarOpen((s) => s.onOpen);

  return (
    <IconButton
      label="menu-icon"
      size="sm"
      variant="outlined"
      radius="lg"
      className="border lg:hidden"
      onClick={onOpen}
    >
      {/* <MenuIcon /> */}
      MenuIcon
    </IconButton>
  );
};
