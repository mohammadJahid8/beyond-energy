"use client";
import { DataTableColumnHeader } from "@/app/components/ui/table/data-table-column-header";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Mail, User } from "lucide-react";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { ClerkUser } from "../user-listing";

export const columns: ColumnDef<ClerkUser>[] = [
  {
    accessorKey: "imageUrl",
    header: "AVATAR",
    cell: ({ row }) => (
      <div className="relative h-10 w-10">
        <Image
          src={row.original.imageUrl}
          alt={row.original.firstName + " " + row.original.lastName}
          fill
          className="rounded-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }: { column: Column<ClerkUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => row.original.firstName,
    meta: {
      label: "First Name",
      placeholder: "Search by first name...",
      variant: "text",
      icon: User,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "lastName",
    header: ({ column }: { column: Column<ClerkUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => row.original.lastName,
    meta: {
      label: "Last Name",
      placeholder: "Search by last name...",
      variant: "text",
      icon: User,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: Column<ClerkUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        <span>{row.original.email}</span>
      </div>
    ),
    meta: {
      label: "Email",
      placeholder: "Search by email...",
      variant: "text",
      icon: Mail,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: { column: Column<ClerkUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
