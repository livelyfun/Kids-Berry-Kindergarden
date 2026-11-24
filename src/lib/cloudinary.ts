import crypto from "crypto";

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  resourceType?: string;
  format?: string;
  width?: number;
  height?: number;
}

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

const CLOUD_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;

/** Strips surrounding whitespace and any wrapping quotes pasted from .env files. */
function unquote(raw: string | undefined): string {
  let value = (raw ?? "").trim();

  while (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith("`") && value.endsWith("`")))
  ) {
    value = value.slice(1, -1).trim();
  }

  try {
    value = decodeURIComponent(value).trim();
  } catch {
    // Keep the raw value if it is not valid percent-encoded text.
  }

  return value;
}

/**
 * Cloudinary's cloud name must be a bare identifier (e.g. "m2ns7bvs").
 * People commonly paste a management URL or a `cloudinary://key:secret@name`
 * string instead, which makes the API return an HTML 404 page. Normalising
 * here keeps uploads working even when the env value is a URL.
 */
export function normalizeCloudName(raw: string | undefined): string {
  let value = unquote(raw);
  if (!value) return "";

  // https://res.cloudinary.com/<cloud_name>/image/upload/...
  const urlMatch = value.match(/res\.cloudinary\.com\/([^/?#\s]+)/i);
  if (urlMatch) value = urlMatch[1];

  // cloudinary://<api_key>:<api_secret>@<cloud_name>
  const atIndex = value.lastIndexOf("@");
  if (value.includes("://") && atIndex !== -1) {
    value = value.slice(atIndex + 1);
  } else if (value.includes("@") && value.includes(":")) {
    value = value.slice(atIndex + 1);
  }

  const firstSegment = value.split(/[/?#\s]+/).filter(Boolean)[0] ?? "";
  const match = firstSegment.match(/^[a-zA-Z0-9_-]+/);
  return match ? match[0] : "";
}

function resolveConfig(): CloudinaryConfig {
  return {
    cloudName: normalizeCloudName(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: unquote(process.env.CLOUDINARY_API_KEY),
    apiSecret: unquote(process.env.CLOUDINARY_API_SECRET),
  };
}

/**
 * Returns a human readable explanation when the Cloudinary credentials are
 * missing or malformed, or `null` when they look usable.
 */
export function getCloudinaryConfigIssue(): string | null {
  const { cloudName, apiKey, apiSecret } = resolveConfig();

  if (!cloudName) {
    return "CLOUDINARY_CLOUD_NAME is missing or invalid. It should be just your Cloudinary cloud name, for example \"m2ns7bvs\".";
  }

  if (!CLOUD_NAME_PATTERN.test(cloudName) || cloudName === "your_cloud_name") {
    return "CLOUDINARY_CLOUD_NAME is invalid. Use only the cloud name from your Cloudinary dashboard (letters, numbers, dashes or underscores), not a URL or API key.";
  }

  if (!apiKey || apiKey === "your_api_key") {
    return "CLOUDINARY_API_KEY is missing or invalid. Copy the API key from your Cloudinary dashboard.";
  }

  if (!apiSecret || apiSecret === "your_api_secret") {
    return "CLOUDINARY_API_SECRET is missing or invalid. Copy the API secret from your Cloudinary dashboard.";
  }

  return null;
}

export function isCloudinaryConfigured(): boolean {
  return getCloudinaryConfigIssue() === null;
}

async function uploadToCloudinaryEndpoint(
  file: File,
  folder: string,
  resourceType: "image" | "auto",
): Promise<CloudinaryUploadResult> {
  const { cloudName, apiKey, apiSecret } = resolveConfig();

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing.");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  // Cloudinary signature expects alphabetical parameters joined with & + apiSecret
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign)
    .digest("hex");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", folder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const rawBody = await response.text();
  let data: {
    secure_url?: unknown;
    public_id?: unknown;
    resource_type?: unknown;
    format?: unknown;
    width?: unknown;
    height?: unknown;
    error?: { message?: unknown };
  } | null = null;

  try {
    data = JSON.parse(rawBody);
  } catch {
    data = null;
  }

  if (!response.ok || !data || typeof data.secure_url !== "string") {
    const apiMessage =
      typeof data?.error?.message === "string" ? data.error.message : null;

    if (apiMessage) {
      throw new Error(apiMessage);
    }

    if (rawBody.trimStart().startsWith("<")) {
      throw new Error(
        `Cloudinary returned an HTML error page (HTTP ${response.status}). This almost always means CLOUDINARY_CLOUD_NAME is wrong — it must be just your cloud name (e.g. "m2ns7bvs"), not a URL or API credentials.`,
      );
    }

    throw new Error(`Cloudinary upload failed (HTTP ${response.status}).`);
  }

  return {
    url: String(data.secure_url),
    publicId: String(data.public_id || ""),
    resourceType:
      typeof data.resource_type === "string" ? data.resource_type : undefined,
    format: typeof data.format === "string" ? data.format : undefined,
    width: typeof data.width === "number" ? data.width : undefined,
    height: typeof data.height === "number" ? data.height : undefined,
  };
}

export async function uploadImageToCloudinary(
  file: File,
  folder = "kids-berry",
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinaryEndpoint(file, folder, "image");
}

export async function uploadMediaToCloudinary(
  file: File,
  folder = "kids-berry",
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinaryEndpoint(file, folder, "auto");
}
