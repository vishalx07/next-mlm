import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthService } from "./services/auth/v1/auth_pb";
import { env } from "@repo/env";

export const transport = createConnectTransport({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
});

export const authClient = createClient(AuthService, transport);
