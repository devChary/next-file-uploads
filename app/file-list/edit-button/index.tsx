"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { Pencil2Icon } from "@radix-ui/react-icons";
interface EditButtonProps {
  pathname: string;
}

/* This functionality is incomplete as edit functionality is not connected to an API call | Just mimicking the functionality here */
export default function EditButton({ pathname }: EditButtonProps) {
  const [fileName, setFileName] = useState(pathname);

  const onSubmit = () => {
    if (!fileName.trim()) {
      toast("Error renaming file!", {
        description: "File name cannot be empty",
      });
    } else {
      // Make API call with new filename
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil2Icon className="edit-icon" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit File Name</DialogTitle>
          <DialogDescription>
            Make changes to your filename here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              File Name
            </Label>
            <Input
              id="fileName"
              onChange={(e) => setFileName(e.target.value)}
              value={fileName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onSubmit} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
