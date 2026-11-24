"use client";

/**
 * Client-side helper that keeps uploads below Vercel's ~4.5 MB serverless
 * request-body limit by downscaling large photos before they are sent to the
 * upload API. Small files are returned untouched.
 */
const COMPRESS_THRESHOLD_BYTES = 3.5 * 1024 * 1024;

const ATTEMPTS = [
  { maxDimension: 2200, quality: 0.85 },
  { maxDimension: 1800, quality: 0.75 },
  { maxDimension: 1400, quality: 0.7 },
];

function loadImage(file: File): Promise<{ image: HTMLImageElement; revoke: () => void }> {
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = () => resolve({ image, revoke: () => URL.revokeObjectURL(objectUrl) });
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to read image."));
    };
    image.src = objectUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

export async function prepareImageForUpload(file: File): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!file.type.startsWith("image/")) return file;
  // Keep animated/vector images intact.
  if (file.type === "image/gif" || file.type === "image/svg+xml") return file;
  if (file.size <= COMPRESS_THRESHOLD_BYTES) return file;

  let loaded: Awaited<ReturnType<typeof loadImage>>;

  try {
    loaded = await loadImage(file);
  } catch {
    return file;
  }

  const { image, revoke } = loaded;

  try {
    const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
    let best: Blob | null = null;

    for (const attempt of ATTEMPTS) {
      const scale = Math.min(1, attempt.maxDimension / longestSide);
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) return file;

      // JPEG has no alpha channel; paint white so transparent PNGs don't go black.
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, width, height);

      const blob = await canvasToBlob(canvas, attempt.quality);
      if (blob && (!best || blob.size < best.size)) best = blob;

      if (best && best.size <= COMPRESS_THRESHOLD_BYTES) break;
    }

    if (!best || best.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "upload";
    return new File([best], `${baseName}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  } finally {
    revoke();
  }
}
