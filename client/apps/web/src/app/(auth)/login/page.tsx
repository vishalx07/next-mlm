import { Link } from "@jamsr-ui/next";
import { Button, Divider, Text } from "@jamsr-ui/react";
import { ROUTES } from "@/configs/routes";
import { AuthCenter, AuthSplit } from "@/layouts/auth";
import { FormWrapper } from "./_components/form-wrapper";

export default function page() {
  const content = (
    <>
      <div className="mb-8 flex flex-col gap-1 text-center">
        <Text
          as="h1"
          variant="h3"
        >
          Welcome Back
        </Text>
        <Text
          as="p"
          variant="paragraph"
          className="text-foreground-secondary"
        >
          Sign in to access your dashboard
        </Text>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="flat">Google</Button>
        <Button variant="flat">LinkedIn</Button>
      </div>

      <Divider className="my-5">
        <Text
          as="span"
          variant="caption"
          className="text-foreground-secondary min-w-max uppercase"
        >
          Or continue with
        </Text>
      </Divider>

      <FormWrapper />

      <Text
        as="p"
        variant="paragraph2"
        className="text-foreground-secondary mt-4 text-center"
      >
        New to Next MLM?{" "}
        <Link
          href={ROUTES.register}
          className="font-medium"
        >
          Join Us
        </Link>
      </Text>
    </>
  );

  return (
    <>
      <AuthCenter className="lg:hidden">{content}</AuthCenter>
      <AuthSplit className="hidden lg:flex">{content}</AuthSplit>
    </>
  );
}
