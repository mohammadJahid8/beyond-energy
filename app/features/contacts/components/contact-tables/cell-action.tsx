"use client";

import { AlertModal } from "@/app/components/ui/modal/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

import { IconDotsVertical, IconTrash, IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Contact } from "../contact-listing";
import axios from "axios";
import { toast } from "sonner";

interface CellActionProps {
  data: Contact;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/contact`, { data: { id: data._id } });
      router.refresh();
      toast.success("Contact deleted successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">First Name</div>
              <div className="col-span-3">{data.firstName}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Last Name</div>
              <div className="col-span-3">{data.lastName}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Email</div>
              <div className="col-span-3">{data.email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Subject</div>
              <div className="col-span-3">{data.subject}</div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="font-medium">Message</div>
              <div className="col-span-3 whitespace-pre-wrap">
                {data.message}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Created At</div>
              <div className="col-span-3">
                {new Date(data.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setViewOpen(true)}
            className="cursor-pointer"
          >
            <IconEye className="mr-2 h-4 w-4" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <IconTrash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
