import { Logo } from "@repo/ui/components/logo";
import { cn } from "@repo/ui/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AuthCenter = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center p-6",
        className,
      )}
    >
      <div className="w-full max-w-[420px]">
        {/* logo */}
        <div className="border-divider mx-auto mb-6 flex size-[76px] items-center justify-center rounded-full border">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
};
