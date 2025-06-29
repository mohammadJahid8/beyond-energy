"use client";
import { Badge } from "@/app/components/ui/badge";
import { DataTableColumnHeader } from "@/app/components/ui/table/data-table-column-header";
import { Column, ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Text, XCircle } from "lucide-react";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { CATEGORY_OPTIONS } from "./options";
import { Proposal } from "@/app/constants/data";

export const columns: ColumnDef<Proposal>[] = [
  {
    accessorKey: "photo_url",
    header: "IMAGE",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue("photo_url")}
            alt={row.getValue("name")}
            fill
            className="rounded-lg"
          />
        </div>
      );
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }: { column: Column<Proposal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Proposal["name"]>()}</div>,
    meta: {
      label: "Name",
      placeholder: "Search proposals...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "category",
    accessorKey: "category",
    header: ({ column }: { column: Column<Proposal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Proposal["category"]>();
      const Icon = status === "active" ? CheckCircle2 : XCircle;

      return (
        <Badge variant="outline" className="capitalize">
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: "categories",
      variant: "multiSelect",
      options: CATEGORY_OPTIONS,
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
