"use client";

import type { ReactNode } from "react";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";

export const ACCENT_SWATCHES: Array<{
  id: string;
  label: string;
  hex: string;
}> = [
  { id: "magenta", label: "Magenta", hex: "#E91E63" },
  { id: "orange", label: "Orange", hex: "#FF7A45" },
  { id: "teal", label: "Teal", hex: "#26A69A" },
  { id: "coral", label: "Coral", hex: "#FF6B81" },
  { id: "olive", label: "Olive", hex: "#AED581" },
  { id: "blue", label: "Blue", hex: "#5C6BC0" },
];

export const ACCENT_OPTIONS = ACCENT_SWATCHES.map((s) => s.id);

export const ICON_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "sparkles", label: "Sparkles" },
  { value: "heart", label: "Heart" },
  { value: "handHeart", label: "Caring Hands" },
  { value: "shield", label: "Safety Shield" },
  { value: "camera", label: "CCTV Camera" },
  { value: "blocks", label: "Montessori Blocks" },
  { value: "bed", label: "Daycare Rest" },
  { value: "apple", label: "Fresh Fruits" },
  { value: "utensils", label: "Kitchen / Meals" },
  { value: "trees", label: "Play Garden" },
  { value: "sun", label: "Sunshine" },
  { value: "clock", label: "Clock / Timing" },
  { value: "book", label: "Books / Phonics" },
  { value: "palette", label: "Creative Art" },
  { value: "music", label: "Music & Rhymes" },
  { value: "smile", label: "Happy Child" },
  { value: "compass", label: "Compass / Explore" },
  { value: "calendarCheck", label: "Visit Calendar" },
  { value: "fileCheck", label: "Documents" },
  { value: "partyPopper", label: "Celebration" },
  { value: "users", label: "Age Group / Class" },
];

export function SectionCard({
  title,
  subtitle,
  onAdd,
  addLabel = "Add New",
  children,
}: {
  title: string;
  subtitle: string;
  onAdd?: () => void;
  addLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#2D3436]/8 bg-white p-6 shadow-warm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#2D3436]/8 pb-4">
        <div>
          <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-[#78909C]">{subtitle}</p>
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#E91E63] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#E91E63]/90"
          >
            <Plus className="h-4 w-4" />
            <span>{addLabel}</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export function ItemRow({
  title,
  meta,
  subtitle,
  imageUrl,
  published,
  onTogglePublish,
  onEdit,
  onDelete,
}: {
  title: string;
  meta: string;
  subtitle?: string;
  imageUrl?: string;
  published: boolean;
  onTogglePublish: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#2D3436]/8 bg-[#FFF8F5] p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-start gap-3">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="h-14 w-16 shrink-0 rounded-xl border border-[#2D3436]/10 bg-white object-cover"
          />
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-[#2D3436]">
              {title}
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                published
                  ? "bg-[#26A69A]/15 text-[#26A69A]"
                  : "bg-[#78909C]/15 text-[#78909C]"
              }`}
            >
              {published ? "Published" : "Draft"}
            </span>
          </div>
          <p className="mt-0.5 text-xs font-medium text-[#E91E63]">{meta}</p>
          {subtitle && (
            <p className="mt-1 line-clamp-2 text-xs text-[#78909C]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onTogglePublish}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
            published
              ? "border border-[#26A69A]/25 bg-white text-[#26A69A] hover:bg-[#26A69A]/10"
              : "bg-[#26A69A] text-white hover:bg-[#26A69A]/90"
          }`}
        >
          {published ? (
            <>
              <EyeOff className="h-3.5 w-3.5" />
              <span>Unpublish</span>
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" />
              <span>Publish</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-xl border border-[#2D3436]/12 bg-white px-3 py-2 text-xs font-semibold text-[#2D3436] hover:border-[#E91E63] hover:text-[#E91E63]"
        >
          <Pencil className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded-xl border border-[#FF6B81]/25 bg-white p-2 text-[#E91E63] hover:bg-[#FFF1EB]"
            aria-label={`Delete ${title}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      />
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  required,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <textarea
        rows={rows}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      />
    </div>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<string | { value: string; label: string }>;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      >
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function AccentSwatchPicker({
  label = "Accent Color",
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {ACCENT_SWATCHES.map((swatch) => {
          const active = value === swatch.id;
          return (
            <button
              key={swatch.id}
              type="button"
              onClick={() => onChange(swatch.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                active
                  ? "border-[#2D3436] bg-white text-[#2D3436] shadow-xs"
                  : "border-[#2D3436]/10 bg-[#FFF8F5] text-[#78909C] hover:border-[#2D3436]/30"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: swatch.hex }}
              />
              <span>{swatch.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
