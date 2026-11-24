import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary,
  uploadMediaToCloudinary,
} from "@/lib/cloudinary";

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

    const maxBytes = (isMediaMode ? 15 : 8) * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: `File must be smaller than ${isMediaMode ? 15 : 8} MB.`,
        },
        { status: 400 },
      );
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Cloudinary is not configured. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.",
        },
        { status: 400 },
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
