"use client";

import { ThemeProvider } from "@/theme";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
