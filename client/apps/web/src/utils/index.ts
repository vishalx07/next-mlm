import { cookies } from "next/headers";
import { type CallOptions } from "@connectrpc/connect";
import { getErrorMessage, type Result } from "@repo/ui/utils";
import { SessionKey } from "@/configs";

export const getAuthCallOptions = async (
  options?: CallOptions,
): Promise<CallOptions> => {
  const token = (await cookies()).get(SessionKey)?.value;

  return {
    ...options,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...options?.headers,
    },
  };
};

export const fetchWithAuth = async <T>(
  fn: (opts: CallOptions) => Promise<T>,
  options?: CallOptions,
): Promise<Result<T>> => {
  try {
    const opts = await getAuthCallOptions(options);
    const data = await fn(opts);
    return { success: true, data };
  } catch (err) {
    const error = getErrorMessage(err);
    return { success: false, error: error };
  }
};
