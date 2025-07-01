type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AuthCenter = ({ children, className }: Props) => {
  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center p-6 ${className}`}
    >
      <div className="w-full max-w-[420px]">
        {/* logo */}
        <div className="border-divider mx-auto mb-6 size-[76px] rounded-full border-2" />
        {children}
      </div>
    </div>
  );
};
