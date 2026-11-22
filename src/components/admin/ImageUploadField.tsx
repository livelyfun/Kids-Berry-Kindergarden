"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Upload } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = "/images/hero-classroom.jpg or https://res.cloudinary.com/...",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data?.url) {
        setUploadError(
          data?.error ||
            "Cloudinary upload failed. Verify CLOUDINARY_* credentials in .env or paste an image URL below.",
        );
      } else {
        onChange(data.url);
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
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>

      <div className="flex flex-col gap-3 rounded-2xl border border-[#2D3436]/12 bg-[#FFF8F5] p-3 sm:flex-row sm:items-center">
        <div className="relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#2D3436]/10 bg-white">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-5 w-5 text-[#78909C]" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setUploadError("");
              setUploadSuccess("");
            }}
            placeholder={placeholder}
            className="w-full rounded-xl border border-[#2D3436]/15 bg-white px-3 py-2 text-xs text-[#2D3436] focus:border-[#E91E63] focus:outline-none"
          />

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
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
              <span>{uploading ? "Uploading..." : "Upload via Cloudinary"}</span>
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
    </div>
  );
}
