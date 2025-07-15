import { profileClient } from "@repo/gen/grpc-client";
import { FetchError } from "@repo/ui/components/fetch-error";
import { fetchWithAuth } from "@/utils";
import { LoginMethods } from "./_components/login-methods";
import { ProfileCard } from "./_components/profile-card";

export default async function page() {
  const result = await fetchWithAuth((otps) =>
    profileClient.getProfile({}, otps),
  );
  if (!result.success) return <FetchError error={result.error} />;
  if (!result.data.user || !result.data.loginMethod) return null;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12">
      <ProfileCard initialData={result.data} />
      <LoginMethods
        providers={result.data.user.providers}
        loginMethod={result.data.loginMethod}
      />
    </div>
  );
}
