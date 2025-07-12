import type { NavItem } from "@repo/ui/components/sidebar";
import { EvaIcon } from "@repo/ui/config/icons";
import { ROUTES } from "@/configs/routes";

// import { DashboardIcon } from "@/config/icons";

export const navConfig: NavItem[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        icon: <EvaIcon.ArrowIosForward />,
        url: ROUTES.user.dashboard,
      },
      {
        title: "Profile",
        icon: <EvaIcon.ArrowIosForward />,
        url: ROUTES.user.profile,
      },
      {
        title: "Settings",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
      {
        title: "Plans",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
    ],
  },
  {
    title: "Levels",
    items: [
      {
        title: "Levels",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
        items: [
          {
            title: "Level 1",
            icon: <EvaIcon.ArrowIosForward />,
            url: "#",
          },
          {
            title: "Level 2",
            icon: <EvaIcon.ArrowIosForward />,
            url: "#",
            items: [
              {
                title: "Level 2.1",
                icon: <EvaIcon.ArrowIosForward />,
                url: "#",
              },
              {
                title: "Level 2.2",
                icon: <EvaIcon.ArrowIosForward />,
                url: "#",
              },
              {
                title: "Level 2.3",
                icon: <EvaIcon.ArrowIosForward />,
                url: "#",
              },
            ],
          },
          {
            title: "Level 3",
            icon: <EvaIcon.ArrowIosForward />,
            url: "#",
          },
        ],
      },
      {
        title: "Level 1",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
      {
        title: "Level 2",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
      {
        title: "Level 3",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
      {
        title: "Level 4",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
      {
        title: "Level 5",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
      {
        title: "Level 6",
        icon: <EvaIcon.ArrowIosForward />,
        url: "#",
      },
    ],
  },
];
