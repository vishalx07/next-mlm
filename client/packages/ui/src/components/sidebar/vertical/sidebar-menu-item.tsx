import React from "react";
import NextLink from "next/link";
import { useDisclosure } from "@jamsr-ui/hooks";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuItem as JamsrUiSidebarMenuItem,
  SidebarMenu,
  SidebarMenuItemButton,
} from "@jamsr-ui/react";
import { EvaIcon } from "@repo/ui/config/icons";
import { useActiveLink } from "@repo/ui/hooks/use-active-link";
import { cn } from "@repo/ui/utils";
import type { NavItem } from "../types";

type Props = NavItem & { isNested?: boolean };

export const SidebarMenuItem = React.memo((props: Props) => {
  const { icon, title, url = "#", items = [], isNested } = props;
  const hasChild = items.length > 0;
  const { active } = useActiveLink({ path: url });
  const { isOpen, setIsOpen, onClose } = useDisclosure(active);

  React.useEffect(() => {
    if (!active) onClose();
  }, [active]);

  return (
    <Collapsible
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isDisabled={!hasChild}
    >
      <JamsrUiSidebarMenuItem className="relative">
        <CollapsibleTrigger as={"div"}>
          <SidebarMenuItemButton
            as={hasChild ? undefined : NextLink}
            href={url}
            prefetch={hasChild ? undefined : true}
            // dashboard-bullet class from global.css
            className={cn(
              "text-foreground-secondary relative h-(--dashboard-item-h) gap-0 rounded-lg pl-3 text-left",
              isNested && "dashboard-bullet h-(--dashboard-sub-item-h)",
              active &&
                "bg-primary/10 text-primary data-[hovered=true]:bg-primary/20!",
              isNested &&
                active &&
                "text-foreground-primary bg-content2/50 data-[hovered=true]:bg-content2!",
            )}
          >
            {icon && (
              <span className="mr-3 [&>svg]:size-(--dashboard-item-icon)">
                {icon}
              </span>
            )}
            <span
              className={cn("flex-1 font-medium", active && "font-semibold")}
            >
              {title}
            </span>
            {hasChild && (
              <EvaIcon.ArrowIosForward
                className={cn(
                  "ml-1.5 size-4 transition-transform duration-200",
                  isOpen && "rotate-90",
                )}
              />
            )}
          </SidebarMenuItemButton>
        </CollapsibleTrigger>
        {hasChild && (
          <CollapsibleContent>
            <div className="pl-6">
              {/* dashboard-bullet-join class from global.css */}
              <SidebarMenu className="dashboard-bullet-join relative flex flex-col gap-1 pl-3 [&>li:first-child]:mt-1">
                {items.map((item, index) => (
                  <SidebarMenuItem
                    key={index}
                    isNested
                    {...item}
                  />
                ))}
              </SidebarMenu>
            </div>
          </CollapsibleContent>
        )}
      </JamsrUiSidebarMenuItem>
    </Collapsible>
  );
});
