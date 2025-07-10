import { useMemo } from "react";
import { usePathname } from "next/navigation";

type Props = {
  path: string;
  deep?: boolean;
};

export const useActiveLink = ({ path, deep = true }: Props) => {
  const pathname = usePathname();

  const isHashLink = path.startsWith("#");
  const isExternalLink = path.startsWith("http");

  const active = useMemo(() => {
    if (isHashLink || isExternalLink) return false;

    const normalActive = pathname === path;
    const deepActive = pathname.includes(path);

    return deep ? deepActive : normalActive;
  }, [pathname, path, deep]);

  return {
    active,
    isExternalLink,
  };
};
