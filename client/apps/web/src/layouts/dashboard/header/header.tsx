import { Suspense } from "react";
import { Skeleton, Header as UIHeader } from "@jamsr-ui/react";
import { Account } from "./account";
import { MenuButton } from "./menu-button";

export const Header = () => {
  return (
    <UIHeader
      isBordered
      className="backdrop-blur-header container h-(--header-mobile-height) max-w-full justify-between bg-transparent lg:h-(--header-desktop-height) lg:px-10"
    >
      <div>
        <MenuButton />
      </div>
      <div className="flex items-center gap-4">
        {/* <Search /> */}

        <Suspense fallback={<Skeleton className="size-10 rounded-full" />}>
          <Account />
        </Suspense>
      </div>
    </UIHeader>
  );
};
