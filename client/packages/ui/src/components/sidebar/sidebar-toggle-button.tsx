import { IconButton } from "@jamsr-ui/react";
import { EvaIcon } from "@repo/ui/config/icons";
import { cn } from "@repo/ui/utils";

type Props = {
  isNavMini: boolean;
  onToggleNav: () => void;
};

export const SidebarToggleButton = ({ isNavMini, onToggleNav }: Props) => {
  return (
    <IconButton
      label="Toggle sidebar"
      size="xs"
      variant="outlined"
      onClick={onToggleNav}
      className={cn(
        "border-divider bg-content1 text-foreground-secondary fixed top-6 z-[61] -translate-x-1/2 border",
        isNavMini ? "left-(--dashboard-mini-w)" : "left-(--dashboard-w)",
      )}
    >
      <EvaIcon.ArrowIosForward
        className={cn(
          "size-4 transition-transform duration-200",
          isNavMini && "rotate-180",
        )}
      />
    </IconButton>
  );
};
