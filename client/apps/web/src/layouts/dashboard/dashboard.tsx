import { Sidebar } from "@repo/ui/components/sidebar";
import { Header } from "./header";
import { navConfig } from "./nav-config";

type Props = {
  children: React.ReactNode;
};

export const Dashboard = ({ children }: Props) => {
  return (
    <div className="light:bg-default-100 flex h-full">
      <Sidebar navItems={navConfig} />

      <div className="flex grow flex-col">
        <Header />
        <main className="dashboard-container">{children}</main>
      </div>
    </div>
  );
};
