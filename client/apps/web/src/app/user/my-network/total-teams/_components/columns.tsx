import { type ColumnDef } from "@jamsr-ui/react";
import { TableTimestamp, TableUser } from "@repo/ui/components/table";
import type { TTeam } from "../types";

export const columns: ColumnDef<TTeam>[] = [
  {
    accessorKey: "fullname",
    header: "Member",
    size: 200,
    cell: ({ row }) => {
      const { email, fullname, avatar } = row.original;
      return (
        <TableUser
          avatar={avatar}
          title={fullname}
          subtitle={email}
        />
      );
    },
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    size: 160,
  },
  {
    accessorKey: "referralId",
    header: "Referral ID",
    accessorFn: ({ referralId }) => (referralId === 0 ? "root" : referralId),
  },
  {
    accessorKey: "createdAt",
    header: "Registered at",
    size: 140,
    cell: ({ row }) => {
      return <TableTimestamp time={row.original.createdAt} />;
    },
  },
];
