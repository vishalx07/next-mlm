import { Link } from "@jamsr-ui/next";
import { Button, Divider, Text } from "@jamsr-ui/react";
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
          Create New Account
        </Text>
        <Text
          as="p"
          variant="paragraph2"
          className="text-foreground-secondary text-center"
        >
          Already have account?{" "}
          <Link
            href={"/login"}
            className="font-medium"
          >
            Sign in
          </Link>
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
        variant="lead"
        className="text-foreground-secondary mt-4 text-center"
      >
        By signing up, I agree to&nbsp;
        <Link
          href={"#"}
          underline="always"
          className="text-foreground font-medium"
        >
          Terms & Conditions
        </Link>
        &nbsp;and&nbsp;
        <Link
          href={"#"}
          underline="always"
          className="text-foreground font-medium"
        >
          Privacy Policy
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
