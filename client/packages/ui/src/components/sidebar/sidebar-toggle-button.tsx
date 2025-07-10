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
      size="sm"
      radius="full"
      disableRipple
      variant="outlined"
      onClick={onToggleNav}
      className={cn(
        "border-divider bg-background fixed top-6 z-[61] -translate-x-1/2 border",
        isNavMini ? "left-(--dashboard-mini-w)" : "left-(--dashboard-w)",
      )}
    >
      <EvaIcon.ArrowIosBack
        className={cn(
          "size-4 transition-transform duration-200",
          isNavMini && "rotate-180",
        )}
      />
    </IconButton>
  );
};
