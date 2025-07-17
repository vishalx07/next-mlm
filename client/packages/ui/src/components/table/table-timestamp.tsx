import { Text } from "@jamsr-ui/react";
import type { Timestamp } from "@repo/ui/types";
import { fDate, fTime, timestampToDate } from "@repo/ui/utils/time";

type Props = {
  time: Timestamp | undefined;
};

export const TableTimestamp = ({ time }: Props) => {
  if (!time) return "_";
  return (
    <div>
      <p>{fDate(timestampToDate(time))}</p>
      <Text
        as="p"
        variant="lead"
        className="text-foreground-secondary text-xs"
      >
        {fTime(timestampToDate(time))}
      </Text>
    </div>
  );
};
