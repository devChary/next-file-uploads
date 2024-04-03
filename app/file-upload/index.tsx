"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import "./styles.css";

export default function FileUpload() {
  const router = useRouter();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const sendThirdPartyCall = async () => {
    // Here we'll need to await the || Commented as it causes error due to improper url
    // await fetch(`https://example.com/`);
  };

  const handleChange = async (event: any) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }
    const file = inputFileRef.current.files[0];
    if (!file) {
      return;
    }
    const fileMb = file?.size / 1024 ** 2;
    if (fileMb > 5) {
      toast("Error uploading file!", {
        description: "File size cannot be greater than 5mb",
      });
      return;
    }
    try {
      setIsFileUploading(true);
      const response = await fetch(`/api/file?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;

      setBlob(newBlob);
      router.refresh();
      sendThirdPartyCall();
    } catch (err) {
      toast("Error uploading file!", {
        description: "Some error occured when uploading the file",
      });
      sendThirdPartyCall();
    }
    setIsFileUploading(false);
  };

  return (
    <div className="upload-wrapper">
      <div className="file-input">
        <input
          className="file-input__input"
          name="file-input"
          ref={inputFileRef}
          type="file"
          onChange={handleChange}
          required
          id="file-input"
          disabled={isFileUploading}
        />
        <label className="file-input__label" htmlFor="file-input">
          {!isFileUploading ? (
            <>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                className="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
              <span>Upload</span>
            </>
          ) : (
            <span>Uploading</span>
          )}
        </label>
      </div>
    </div>
  );
}
