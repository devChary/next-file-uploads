"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { TrashIcon } from "@radix-ui/react-icons";

interface IProps {
  url: string;
}

export default function DeleteButton({ url }: IProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await fetch(`/api/file`, {
        method: "DELETE",
        body: JSON.stringify({
          url,
        }),
      });
      router.refresh();
    } catch (e) {
      console.log(e);
    }
    setIsDeleting(false);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" disabled={isDeleting}>
            <TrashIcon className="delete-icon" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
