import type { Route } from "next";

export type NavItem = {
  title: string;
  icon?: React.ReactNode;
  url?: Route;
  items?: NavItem[];
};
