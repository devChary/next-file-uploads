import { put, del, BlobAccessError } from "@vercel/blob";
import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

/* POST REQUEST */
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  try {
    if (filename && request.body) {
      const blob = await put(filename, request.body, {
        access: "public",
      });
      return NextResponse.json(blob);
    } else {
      return NextResponse.json({ message: "No filename detected!" });
    }
  } catch (error) {
    if (error instanceof BlobAccessError) {
      return NextResponse.json({
        message: "There was an error uploading the file!",
      });
    } else {
      throw error;
    }
  }
}

/* DELETE REQUEST */
export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const response = await request.json();
    await del(response.url);

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof BlobAccessError) {
      return NextResponse.json({
        message: "There was an error delete the file!",
      });
    } else {
      throw error;
    }
  }
}

export async function GET() {
  try {
    const { blobs } = await list();
    return Response.json({ blobs });
  } catch (error) {
    throw error;
  }
}
