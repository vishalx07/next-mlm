import { SidebarHeader as JamsrUiSidebarHeader } from "@jamsr-ui/react";

type Props = {
  title: string;
  subTitle: string;
  image?: string;
};

export const SidebarHeader = ({ title, subTitle, image }: Props) => {
  return (
    <JamsrUiSidebarHeader>
      <div>SidebarHeader</div>
    </JamsrUiSidebarHeader>
  );
};
