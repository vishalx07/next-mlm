"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@jamsr-ui/react";
import { SessionKey } from "@/configs";

// import { APP_ROUTES } from "@/config/routes";

export const LoginButton = () => {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove(SessionKey);
    router.push("/login");
  }, []);

  return (
    <Button
      radius="full"
      color="primary"
      as={NextLink}
      href={"/login"}
    >
      Login
    </Button>
  );
};
