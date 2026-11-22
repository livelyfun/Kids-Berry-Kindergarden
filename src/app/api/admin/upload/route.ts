import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 },
      );
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be smaller than 8 MB." },
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

    const result = await uploadImageToCloudinary(file, "kids-berry");
    return NextResponse.json({
      ok: true,
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Image upload failed.";
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
