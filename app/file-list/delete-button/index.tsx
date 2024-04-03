"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { TrashIcon } from "@radix-ui/react-icons";

interface IProps {
  url: string;
}

export default function DeleteButton({ url }: IProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const openModal = () => {};

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
      <Button onClick={handleDelete} variant="outline" disabled={isDeleting}>
        <TrashIcon className="delete-icon" />
      </Button>
    </div>
  );
}
