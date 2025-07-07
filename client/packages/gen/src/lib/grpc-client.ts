import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthService } from "../services/auth/v1/auth_pb";

export const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

export const authClient = createClient(AuthService, transport);
