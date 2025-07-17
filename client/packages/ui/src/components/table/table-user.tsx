import { Avatar } from "@jamsr-ui/next";
import { Text } from "@jamsr-ui/react";

type Props = {
  avatar: string;
  title: string;
  subtitle: string;
};

export const TableUser = (props: Props) => {
  const { avatar, title, subtitle } = props;

  return (
    <div className="flex items-center gap-2">
      <Avatar
        width={50}
        height={50}
        size="lg"
        // src={getFileSrc(avatar ?? "")}
        src={""}
        alt={title}
      />
      <div>
        <p>{title}</p>
        <Text
          as="p"
          variant="paragraph2"
          className="text-foreground-secondary"
        >
          {subtitle}
        </Text>
      </div>
    </div>
  );
};
