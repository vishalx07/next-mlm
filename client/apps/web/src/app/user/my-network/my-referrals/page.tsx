import { myNetworkClient } from "@repo/gen/grpc-client";
import { FetchError } from "@repo/ui/components/fetch-error";
import { fetchWithAuth } from "@/utils";
import { Table } from "./_components/table";

export default async function page() {
  const result = await fetchWithAuth((opts) =>
    myNetworkClient.getMyReferrals({}, opts),
  );
  if (!result.success) return <FetchError error={result.error} />;

  return <Table resp={result.data} />;
}
