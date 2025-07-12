"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MenuItem } from "@jamsr-ui/react";
import { SessionKey } from "@/configs";

export const LogoutMenuItem = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove(SessionKey);
    router.refresh();
  };

  return (
    <MenuItem
      color="danger"
      onClick={handleLogout}
    >
      Logout
    </MenuItem>
  );
};
