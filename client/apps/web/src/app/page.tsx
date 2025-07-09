import { Button } from "@jamsr-ui/react";
import { EvaIcons } from "@repo/ui/config/icons";

export default function page() {
  return (
    <>
      <div className="bg-red-500">Web App</div>
      <Button>Click Me</Button>
      <EvaIcons.ArrowIosForward className="size-10" />
    </>
  );
}
