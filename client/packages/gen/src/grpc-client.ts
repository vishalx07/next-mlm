import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import Cookies from "js-cookie";
import { env } from "@repo/env";
// import services
import { AuthService } from "./services/auth/v1/auth_pb";
import { ProfileService } from "./services/user/profile/v1/profile_pb";
import { MyNetworkService } from "./services/user/my_network/v1/my_network_pb";

const SessionKey = "x-session";
const SessionAdminKey = "x-session-admin";

export const rpcTransport = createConnectTransport({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  // fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
  interceptors: [
    (next) => async (req) => {
      if (req.url.startsWith(`${env.NEXT_PUBLIC_API_URL}/admin`)) {
        const token = Cookies.get(SessionAdminKey);
        if (token) {
          req.header.set("Authorization", `Bearer ${token}`);
        }
        return next(req);
      }

      const token = Cookies.get(SessionKey);
      if (token) {
        req.header.set("Authorization", `Bearer ${token}`);
      }
      return next(req);
    },
  ],
});

// root
export const authClient = createClient(AuthService, rpcTransport);

// user
export const profileClient = createClient(ProfileService, rpcTransport);
export const myNetworkClient = createClient(MyNetworkService, rpcTransport);

// admin
