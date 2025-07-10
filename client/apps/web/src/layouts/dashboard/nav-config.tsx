import type { NavItem } from "@repo/ui/components/sidebar";
import { EvaIcon } from "@repo/ui/config/icons";

// import { DashboardIcon } from "@/config/icons";

export const navConfig: NavItem[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
        // url: SELLER_ROUTES.general.dashboard,
      },
      {
        title: "Profile",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
        // url: SELLER_ROUTES.general.myStore,
      },
    ],
  },
];
