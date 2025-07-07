"use client";

import { ToastProvider } from "@jamsr-ui/react";
import { ThemeProvider } from "@/theme";
import { ReactQueryProvider } from "./react-query";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <ToastProvider />
    </ThemeProvider>
  );
};
