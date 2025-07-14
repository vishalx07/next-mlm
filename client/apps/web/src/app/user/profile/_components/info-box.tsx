import { Text } from "@jamsr-ui/react";

export type InfoBoxType = {
  label: string;
  value: React.ReactNode;
  endContent?: React.ReactNode;
};

type Props = {
  info: InfoBoxType;
};

export const InfoBox = ({ info }: Props) => {
  const { label, value, endContent } = info;

  return (
    <div className="border-divider rounded-xl border p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <Text
            as="p"
            variant="paragraph2"
            className="text-foreground-secondary"
          >
            {label}
          </Text>

          {typeof value === "string" ? (
            <Text
              as="p"
              variant="paragraph"
              className="break-all"
            >
              {value}
            </Text>
          ) : (
            value
          )}
        </div>

        <div className="shrink-0">{endContent}</div>
      </div>
    </div>
  );
};
