import { Dashboard } from "@/layouts/dashboard";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <Dashboard>{children}</Dashboard>;
}
