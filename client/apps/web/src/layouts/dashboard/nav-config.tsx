import type { NavItem } from "@repo/ui/components/sidebar";
import { DashboardIcon } from "@repo/ui/config/icons";
import { ROUTES } from "@/configs/routes";

export const navConfig: NavItem[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        icon: <DashboardIcon.Dashboard />,
        url: ROUTES.user.dashboard,
      },
      {
        title: "Plans",
        icon: <DashboardIcon.Plan />,
        url: ROUTES.user.plans,
      },
      {
        title: "Profile",
        icon: <DashboardIcon.Profile />,
        url: ROUTES.user.profile,
      },
      {
        title: "My Network",
        icon: <DashboardIcon.MyNetwork />,
        url: ROUTES.user.myNetwork.root,
        items: [
          {
            title: "Genealogy",
            url: ROUTES.user.myNetwork.genealogy,
          },
          {
            title: "My Referrals",
            url: ROUTES.user.myNetwork.myReferrals,
          },
          {
            title: "Total Teams",
            url: ROUTES.user.myNetwork.totalTeams,
          },
        ],
      },
      {
        title: "Referral Link",
        icon: <DashboardIcon.ReferralLink />,
        url: ROUTES.user.referralLink,
      },
    ],
  },
  {
    title: "Levels",
    items: [
      {
        title: "Levels",
        icon: <DashboardIcon.Level />,
        url: "#",
        items: [
          {
            title: "Level 1",
            url: "#",
          },
          {
            title: "Level 2",
            url: "#",
            items: [
              {
                title: "Level 2.1",
                url: "#",
              },
              {
                title: "Level 2.2",
                url: "#",
              },
              {
                title: "Level 2.3",
                url: "#",
              },
            ],
          },
          {
            title: "Level 3",
            url: "#",
          },
        ],
      },
      {
        title: "Level 1",
        icon: <DashboardIcon.Level />,
        url: "#",
      },
      {
        title: "Level 2",
        icon: <DashboardIcon.Level />,
        url: "#",
      },
      {
        title: "Level 3",
        icon: <DashboardIcon.Level />,
        url: "#",
      },
      {
        title: "Level 4",
        icon: <DashboardIcon.Level />,
        url: "#",
      },
      {
        title: "Level 5",
        icon: <DashboardIcon.Level />,
        url: "#",
      },
      {
        title: "Level 6",
        icon: <DashboardIcon.Level />,
        url: "#",
      },
    ],
  },
];
