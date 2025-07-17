"use client";

import { DataTable } from "@jamsr-ui/react";
import type { TGetTotalTeamResponse } from "../types";
import { columns } from "./columns";

type Props = {
  resp: TGetTotalTeamResponse;
};

export const Table = ({ resp }: Props) => {
  return (
    <DataTable
      data={resp.team ?? []}
      columns={columns}
      rowCount={resp.team.length}
      sorting={{
        desc: true,
        id: "createdAt",
      }}
    />
  );
};
