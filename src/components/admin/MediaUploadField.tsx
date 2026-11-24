"use client";

import { useRef, useState } from "react";
import { FileText, Image as ImageIcon, Loader2, Paperclip, Upload, X } from "lucide-react";

interface MediaUploadFieldProps {
  label: string;
  url: string;
  mediaType: string;
  mediaName: string;
  onChange: (next: {
    attachmentUrl: string;
    attachmentType: string;
    attachmentName: string;
  }) => void;
}

function inferTypeFromUrl(url: string): "image" | "pdf" | "file" {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".pdf")) return "pdf";
  if (/\.(png|jpe?g|webp|gif|svg|avif)$/.test(clean)) return "image";
  if (clean.includes("/raw/upload/")) return "file";
  if (clean.includes("/image/upload/")) return "image";
  return "file";
}

export function MediaUploadField({
  label,
  url,
  mediaType,
  mediaName,
  onChange,
}: MediaUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const resolvedType = mediaType || (url ? inferTypeFromUrl(url) : "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", "media");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data?.url) {
        setUploadError(
          data?.error ||
            "Cloudinary upload failed. Verify CLOUDINARY_* credentials or paste a file URL below.",
        );
      } else {
        onChange({
          attachmentUrl: String(data.url),
          attachmentType: String(data.mediaType || "file"),
          attachmentName: mediaName || String(data.fileName || file.name),
        });
        setUploadSuccess("Uploaded to Cloudinary");
      }
    } catch {
      setUploadError("Upload request failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
          {label}
        </label>
        {url && (
          <button
            type="button"
            onClick={() => {
              setUploadError("");
              setUploadSuccess("");
              onChange({
                attachmentUrl: "",
                attachmentType: "",
                attachmentName: "",
              });
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#E91E63] hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            <span>Remove attachment</span>
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-[#2D3436]/12 bg-[#FFF8F5] p-3.5 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#2D3436]/10 bg-white">
            {url && resolvedType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={mediaName || "Attachment preview"}
                className="h-full w-full object-cover"
              />
            ) : url && resolvedType === "pdf" ? (
              <div className="flex flex-col items-center text-[#E91E63]">
                <FileText className="h-6 w-6" />
                <span className="mt-0.5 text-[10px] font-bold">PDF</span>
              </div>
            ) : url ? (
              <div className="flex flex-col items-center text-[#26A69A]">
                <Paperclip className="h-6 w-6" />
                <span className="mt-0.5 text-[10px] font-bold">FILE</span>
              </div>
            ) : (
              <ImageIcon className="h-5 w-5 text-[#78909C]" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                const nextUrl = e.target.value;
                setUploadError("");
                setUploadSuccess("");
                onChange({
                  attachmentUrl: nextUrl,
                  attachmentType: nextUrl ? inferTypeFromUrl(nextUrl) : "",
                  attachmentName: mediaName,
                });
              }}
              placeholder="Paste PDF/Image URL or upload a file via Cloudinary"
              className="w-full rounded-xl border border-[#2D3436]/15 bg-white px-3 py-2 text-xs text-[#2D3436] focus:border-[#E91E63] focus:outline-none"
            />

            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={inputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#26A69A] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#26A69A]/90 disabled:opacity-60"
              >
                {uploading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
                <span>
                  {uploading ? "Uploading..." : "Upload Image or PDF"}
                </span>
              </button>

              {uploadSuccess && (
                <span className="text-xs font-medium text-[#26A69A]">
                  {uploadSuccess}
                </span>
              )}
              {uploadError && (
                <span className="text-xs font-medium text-[#E91E63]">
                  {uploadError}
                </span>
              )}
            </div>
          </div>
        </div>

        {url && (
          <div className="grid grid-cols-1 gap-3 border-t border-[#2D3436]/8 pt-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#78909C]">
                Attachment Type
              </label>
              <select
                value={resolvedType || "file"}
                onChange={(e) =>
                  onChange({
                    attachmentUrl: url,
                    attachmentType: e.target.value,
                    attachmentName: mediaName,
                  })
                }
                className="w-full rounded-xl border border-[#2D3436]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#2D3436] focus:border-[#E91E63] focus:outline-none"
              >
                <option value="image">Image</option>
                <option value="pdf">PDF Document</option>
                <option value="file">Other Document / File</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#78909C]">
                Attachment Label (optional)
              </label>
              <input
                type="text"
                value={mediaName}
                onChange={(e) =>
                  onChange({
                    attachmentUrl: url,
                    attachmentType: resolvedType || "file",
                    attachmentName: e.target.value,
                  })
                }
                placeholder="e.g., Exam Routine PDF"
                className="w-full rounded-xl border border-[#2D3436]/15 bg-white px-3 py-1.5 text-xs text-[#2D3436] focus:border-[#E91E63] focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
