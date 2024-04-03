"use client";

import { Button } from "@/components/ui/button";

import { Pencil2Icon } from "@radix-ui/react-icons";

export default function EditButton({ openModal }: any) {
  return (
    <div className="actions">
      <Button onClick={openModal} variant="outline">
        <Pencil2Icon className="edit-icon" />
      </Button>
    </div>
  );
}
