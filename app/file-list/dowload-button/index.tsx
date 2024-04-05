"use client";

import { Button } from "@/components/ui/button";

import { DownloadIcon } from "@radix-ui/react-icons";

export default function DownloadButton({ downloadUrl, pathname }: any) {
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = pathname;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={downloadFile} variant="outline">
      <DownloadIcon className="download-icon" />
    </Button>
  );
}
