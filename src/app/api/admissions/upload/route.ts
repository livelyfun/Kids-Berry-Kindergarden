import { NextResponse } from "next/server";
import {
  isCloudinaryConfigured,
  uploadMediaToCloudinary,
} from "@/lib/cloudinary";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function detectFileType(file: File): "image" | "pdf" | "file" {
  if (file.type.startsWith("image/")) return "image";
  if (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  ) {
    return "pdf";
  }
  return "file";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No document file provided." },
        { status: 400 },
      );
    }

    const lowerName = file.name.toLowerCase();
    const isImage = file.type.startsWith("image/");
    const isAllowedDoc =
      isImage ||
      ALLOWED_MIME_TYPES.has(file.type) ||
      lowerName.endsWith(".pdf") ||
      lowerName.endsWith(".doc") ||
      lowerName.endsWith(".docx");

    if (!isAllowedDoc) {
      return NextResponse.json(
        { error: "Only images, PDFs, or Word documents are allowed." },
        { status: 400 },
      );
    }

    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: "File must be smaller than 10 MB." },
        { status: 400 },
      );
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: "Document upload service is not configured." },
        { status: 500 },
      );
    }

    const result = await uploadMediaToCloudinary(file, "kids-berry/admissions");

    return NextResponse.json({
      ok: true,
      url: result.url,
      publicId: result.publicId,
      fileType: detectFileType(file),
      fileName: file.name,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Document upload failed.";
    console.error("Admission document upload error:", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
