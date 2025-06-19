import { Link } from "@jamsr-ui/next";
import { Button, Card, Divider, Text } from "@jamsr-ui/react";
import { FormWrapper } from "./_components/form-wrapper";

export default function page() {
  return (
    <div className="container flex flex-1 items-center justify-center py-6">
      <Card className="w-full max-w-screen-lg">
        <div className="grid h-full grid-cols-2">
          {/* left setion */}
          <div className="py-2 pl-2">
            <div className="h-full rounded-2xl bg-[url('/eye.webp')] bg-cover bg-center bg-no-repeat p-2" />
          </div>

          {/* right setion */}
          <div className="flex flex-col p-10">
            {/* logo */}
            <div className="border-divider mx-auto mb-6 size-[76px] rounded-full border-2" />

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
                href={"/register"}
                className="font-medium"
              >
                Join Us
              </Link>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
