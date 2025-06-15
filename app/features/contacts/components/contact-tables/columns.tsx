"use client";
import { DataTableColumnHeader } from "@/app/components/ui/table/data-table-column-header";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Mail, User, MessageSquare } from "lucide-react";
import { CellAction } from "./cell-action";
import { Contact } from "../contact-listing";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }: { column: Column<Contact, unknown> }) => (
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
    header: ({ column }: { column: Column<Contact, unknown> }) => (
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
    header: ({ column }: { column: Column<Contact, unknown> }) => (
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
    accessorKey: "subject",
    header: ({ column }: { column: Column<Contact, unknown> }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[200px] truncate">{row.original.subject}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.subject}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    meta: {
      label: "Subject",
      placeholder: "Search by subject...",
      variant: "text",
      icon: MessageSquare,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "message",
    header: ({ column }: { column: Column<Contact, unknown> }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[300px] truncate">{row.original.message}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-[300px] whitespace-normal">
              {row.original.message}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: { column: Column<Contact, unknown> }) => (
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
