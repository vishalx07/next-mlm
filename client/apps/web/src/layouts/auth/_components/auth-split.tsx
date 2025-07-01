import { Card } from "@jamsr-ui/react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AuthSplit = ({ children, className }: Props) => {
  return (
    <div className={`flex flex-1 items-center justify-center p-6 ${className}`}>
      <Card className="w-full max-w-screen-lg">
        <div className="grid h-full grid-cols-2">
          {/* left section */}
          <div className="py-2 pl-2">
            <div className="h-full rounded-2xl bg-[url('/eye.webp')] bg-cover bg-center bg-no-repeat" />
          </div>
          {/* right section */}
          <div className="flex flex-col p-10">
            {/* logo */}
            <div className="border-divider mx-auto mb-6 size-[76px] rounded-full border-2" />

            {children}
          </div>
        </div>
      </Card>
    </div>
  );
};
