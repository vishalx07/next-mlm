import { type ComponentProps } from "react";
import { Link } from "@jamsr-ui/next";
import { cn } from "@repo/ui/utils";

type Props = {
  isFullLogo?: boolean;
  disableLink?: boolean;
  href?: string;
  className?: string;
} & ComponentProps<"img">;

export const Logo = ({ isFullLogo, disableLink, href, ...props }: Props) => {
  const logo = (
    <img
      src="/nextmlm_logo.png"
      alt="logo"
      className={cn("size-10", props.className)}
      {...props}
    />
  );

  const fullLogo = (
    <img
      src="/nextmlm_full_logo.png"
      alt="logo"
      className={cn("h-10", props.className)}
      {...props}
    />
  );

  const logoToRender = isFullLogo ? fullLogo : logo;

  if (disableLink) return logoToRender;

  return <Link href={href ?? "/"}>{logoToRender}</Link>;
};
