import { Button } from "@jamsr-ui/react";
import { EvaIcon } from "@repo/ui/config/icons";

export default function page() {
  return (
    <>
      <div className="bg-red-500">Web App</div>
      <Button>Click Me</Button>
      <EvaIcon.ArrowIosForward className="size-10" />
    </>
  );
}
