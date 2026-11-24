import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getCloudinaryConfigIssue,
  uploadImageToCloudinary,
  uploadMediaToCloudinary,
} from "@/lib/cloudinary";

// Vercel caps serverless request bodies at ~4.5 MB, so anything larger must be
// rejected here with a clear message instead of failing with a 413 page.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_MEDIA_BYTES = 4 * 1024 * 1024;

const ALLOWED_MEDIA_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function detectMediaType(
  file: File,
): "image" | "pdf" | "file" {
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
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const mode = String(formData.get("mode") || "image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 },
      );
    }

    const isMediaMode = mode === "media";
    const isImage = file.type.startsWith("image/");
    const isAllowedMedia =
      isImage ||
      ALLOWED_MEDIA_MIME_TYPES.has(file.type) ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isMediaMode && !isImage) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 },
      );
    }

    if (isMediaMode && !isAllowedMedia) {
      return NextResponse.json(
        { error: "Only images, PDFs, or Word documents are allowed." },
        { status: 400 },
      );
    }

    const maxBytes = isMediaMode ? MAX_MEDIA_BYTES : MAX_IMAGE_BYTES;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: `File must be smaller than ${Math.round(
            maxBytes / (1024 * 1024),
          )} MB. Please compress or resize it and try again.`,
        },
        { status: 413 },
      );
    }

    const configIssue = getCloudinaryConfigIssue();
    if (configIssue) {
      return NextResponse.json(
        {
          error: `${configIssue} Fix these in Vercel → Project → Settings → Environment Variables.`,
        },
        { status: 503 },
      );
    }

    const result = isMediaMode
      ? await uploadMediaToCloudinary(file, "kids-berry/notices")
      : await uploadImageToCloudinary(file, "kids-berry");

    return NextResponse.json({
      ok: true,
      url: result.url,
      publicId: result.publicId,
      mediaType: detectMediaType(file),
      fileName: file.name,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "File upload failed.";
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
