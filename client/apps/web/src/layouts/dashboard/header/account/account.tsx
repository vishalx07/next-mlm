import { profileClient } from "@repo/gen/grpc-client";
import { fetchWithAuth } from "@/utils";
import { AccountMenu } from "./account-menu";
import { LoginButton } from "./login-button";

export const Account = async () => {
  const result = await fetchWithAuth((otps) =>
    profileClient.getProfile({}, otps),
  );

  if (!result.success || !result.data.user) return <LoginButton />;

  return <AccountMenu user={result.data.user} />;
};
