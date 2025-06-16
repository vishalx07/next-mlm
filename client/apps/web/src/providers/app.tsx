"use client";

import { UIProvider } from "@jamsr-ui/react";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return <UIProvider>{children}</UIProvider>;
};
