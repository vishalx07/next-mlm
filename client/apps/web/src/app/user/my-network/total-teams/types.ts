import { type GetTotalTeamResponse } from "@repo/gen/user/my_network/v1/my_network_pb";

export type TGetTotalTeamResponse = GetTotalTeamResponse;
export type TTeam = GetTotalTeamResponse["team"][number];
