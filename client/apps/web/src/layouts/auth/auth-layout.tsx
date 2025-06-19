type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return <main className="flex min-h-screen flex-col">{children}</main>;
};
