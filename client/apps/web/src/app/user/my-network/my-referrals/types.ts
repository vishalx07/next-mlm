import { type GetMyReferralsResponse } from "@repo/gen/user/my_network/v1/my_network_pb";

export type TGetMyReferralsResponse = GetMyReferralsResponse;
export type TReferral = GetMyReferralsResponse["referrals"][number];
