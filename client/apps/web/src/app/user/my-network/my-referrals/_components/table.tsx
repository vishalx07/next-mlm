"use client";

import { DataTable } from "@jamsr-ui/react";
import type { TGetMyReferralsResponse } from "../types";
import { columns } from "./columns";

type Props = {
  resp: TGetMyReferralsResponse;
};

export const Table = ({ resp }: Props) => {
  return (
    <DataTable
      data={resp.referrals ?? []}
      columns={columns}
      rowCount={resp.referrals.length}
      sorting={{
        desc: true,
        id: "createdAt",
      }}
    />
  );
};
