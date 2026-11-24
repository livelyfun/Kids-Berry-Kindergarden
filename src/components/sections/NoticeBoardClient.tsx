"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Megaphone,
  Paperclip,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { ACCENT_STYLES } from "@/lib/theme";
import type { NoticeCategory, NoticeItem } from "@/types/cms";

const CATEGORY_TABS: Array<{
  id: NoticeCategory;
  label: string;
}> = [
  { id: "all", label: "All Updates" },
  { id: "notice", label: "Notices" },
  { id: "exam", label: "Exam Details" },
  { id: "offer", label: "Offers" },
  { id: "event", label: "Events" },
  { id: "holiday", label: "Holidays" },
];

const CATEGORY_BADGES: Record<Exclude<NoticeCategory, "all">, string> = {
  notice: "General Notice",
  exam: "Exam Details",
  offer: "Special Offer",
  event: "School Event",
  holiday: "Holiday Notice",
};

function getAttachmentKind(item: NoticeItem): "image" | "pdf" | "file" | null {
  if (!item.attachmentUrl) return null;
  if (item.attachmentType === "image") return "image";
  if (item.attachmentType === "pdf") return "pdf";
  const lower = item.attachmentUrl.split("?")[0].toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  if (/\.(png|jpe?g|webp|gif|svg|avif)$/.test(lower)) return "image";
  return "file";
}

export function NoticeDetailModal({
  notice,
  onClose,
}: {
  notice: NoticeItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!notice) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [notice, onClose]);

  if (!notice) return null;

  const styles = ACCENT_STYLES[notice.accent];
  const mediaKind = getAttachmentKind(notice);

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-modal-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D3436]/65 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto overflow-x-hidden no-scrollbar rounded-[2rem] border border-[#2D3436]/10 bg-white shadow-warm-lg"
        >
          <div className="grid h-1.5 w-full grid-cols-6">
            <div className="bg-[#FF7A45]" />
            <div className="bg-[#FF6B81]" />
            <div className="bg-[#E91E63]" />
            <div className="bg-[#AED581]" />
            <div className="bg-[#26A69A]" />
            <div className="bg-[#5C6BC0]" />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notice details"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#2D3436]/10 bg-white/95 text-[#2D3436] shadow-sm hover:bg-[#FFF1EB] hover:text-[#E91E63]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 pr-10">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
              >
                <Tag className="h-3 w-3" />
                <span>{CATEGORY_BADGES[notice.category]}</span>
              </span>
              {notice.noticeDate && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8F5] px-3 py-1 text-xs font-medium text-[#78909C]">
                  <Calendar className="h-3.5 w-3.5 text-[#E91E63]" />
                  <span>{notice.noticeDate}</span>
                </span>
              )}
              {notice.highlightOnHome && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF1EB] px-3 py-1 text-xs font-semibold text-[#E91E63]">
                  <Sparkles className="h-3 w-3" />
                  <span>Pinned Highlight</span>
                </span>
              )}
            </div>

            <h2
              id="notice-modal-title"
              className="mt-4 font-[family-name:var(--font-fredoka)] text-2xl font-semibold leading-snug text-[#2D3436] sm:text-[1.75rem]"
            >
              {notice.title}
            </h2>

            <p className="mt-2 text-sm font-medium text-[#78909C]">
              {notice.summary}
            </p>

            <div className="mt-5 rounded-3xl bg-[#FFF8F5] p-5 text-[0.9375rem] leading-[1.75] text-[#2D3436] whitespace-pre-line">
              {notice.content}
            </div>

            {/* Attachment Viewer */}
            {notice.attachmentUrl && (
              <div className="mt-6 space-y-3 rounded-3xl border border-[#2D3436]/10 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#2D3436]">
                    {mediaKind === "pdf" ? (
                      <FileText className="h-4 w-4 text-[#E91E63]" />
                    ) : (
                      <Paperclip className="h-4 w-4 text-[#26A69A]" />
                    )}
                    <span>
                      {notice.attachmentName ||
                        (mediaKind === "pdf"
                          ? "Attached PDF Document"
                          : mediaKind === "image"
                            ? "Attached Image"
                            : "Attached Document")}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={notice.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-1.5 text-xs font-semibold text-[#2D3436] hover:border-[#E91E63] hover:text-[#E91E63]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Open in New Tab</span>
                    </a>
                    <a
                      href={notice.attachmentUrl}
                      download={notice.attachmentName || undefined}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#26A69A] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#26A69A]/90"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>

                {mediaKind === "image" && (
                  <div className="overflow-hidden rounded-2xl border border-[#2D3436]/8 bg-[#FFF8F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={notice.attachmentUrl}
                      alt={notice.attachmentName || notice.title}
                      className="max-h-[460px] w-full object-contain"
                    />
                  </div>
                )}

                {mediaKind === "pdf" && (
                  <div className="overflow-hidden rounded-2xl border border-[#2D3436]/10 bg-[#FFF8F5]">
                    <iframe
                      title={notice.attachmentName || notice.title}
                      src={notice.attachmentUrl}
                      className="h-[440px] w-full border-0"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function NoticeBoardClient({ notices }: { notices: NoticeItem[] }) {
  const [activeCat, setActiveCat] = useState<NoticeCategory>("all");
  const [query, setQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const filtered = notices.filter((item) => {
    const matchesCat = activeCat === "all" || item.category === activeCat;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <>
      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-[#2D3436]/8 bg-white p-4 shadow-warm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab.id === "all"
                ? notices.length
                : notices.filter((n) => n.category === tab.id).length;
            const active = activeCat === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCat(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#E91E63] text-white shadow-sm"
                    : "bg-[#FFF8F5] text-[#2D3436] hover:bg-[#FFF1EB] hover:text-[#E91E63]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    active ? "bg-white/20 text-white" : "bg-white text-[#78909C]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-2.5 h-4 w-4 text-[#78909C]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notices, exams..."
            className="w-full rounded-full border border-[#2D3436]/12 bg-[#FFF8F5] py-2 pl-10 pr-4 text-xs text-[#2D3436] placeholder:text-[#78909C] focus:border-[#E91E63] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Notices Grid */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-[#2D3436]/8 bg-white p-12 text-center shadow-warm">
          <Megaphone className="mx-auto h-10 w-10 text-[#E91E63]/50" />
          <p className="mt-3 font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
            No notices match your filter
          </p>
          <p className="mt-1 text-sm text-[#78909C]">
            Try selecting &ldquo;All Updates&rdquo; or clearing the search box.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const styles = ACCENT_STYLES[item.accent];
            const mediaKind = getAttachmentKind(item);

            return (
              <article
                key={item.id}
                className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border ${styles.border} bg-white shadow-editorial transition-transform duration-300 hover:-translate-y-1`}
              >
                {mediaKind === "image" && item.attachmentUrl && (
                  <button
                    type="button"
                    onClick={() => setSelectedNotice(item)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF1EB] text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.attachmentUrl}
                      alt={item.attachmentName || item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${styles.solidBg}`}
                    >
                      {CATEGORY_BADGES[item.category]}
                    </span>
                  </button>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {mediaKind !== "image" && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
                      >
                        {CATEGORY_BADGES[item.category]}
                      </span>
                    )}
                    {item.noticeDate && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#78909C]">
                        <Calendar className="h-3.5 w-3.5 text-[#FF7A45]" />
                        <span>{item.noticeDate}</span>
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 font-[family-name:var(--font-fredoka)] text-[1.25rem] font-semibold leading-[1.28] text-[#2D3436] transition-colors group-hover:text-[#E91E63]">
                    {item.title}
                  </h2>

                  <p className="mt-2.5 flex-1 text-sm leading-[1.65] text-[#78909C]">
                    {item.summary}
                  </p>

                  {item.attachmentUrl && (
                    <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl border border-[#2D3436]/8 bg-[#FFF8F5] px-3.5 py-2.5 text-xs">
                      <span className="flex min-w-0 items-center gap-2 font-semibold text-[#2D3436]">
                        {mediaKind === "pdf" ? (
                          <FileText className="h-4 w-4 shrink-0 text-[#E91E63]" />
                        ) : (
                          <Paperclip className="h-4 w-4 shrink-0 text-[#26A69A]" />
                        )}
                        <span className="truncate">
                          {item.attachmentName ||
                            (mediaKind === "pdf"
                              ? "PDF Attachment"
                              : mediaKind === "image"
                                ? "Photo Attachment"
                                : "File Attachment")}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-[#E91E63]">
                        {mediaKind}
                      </span>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#2D3436]/8 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedNotice(item)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${styles.iconText} hover:opacity-80`}
                    >
                      <span>
                        {mediaKind === "pdf"
                          ? "Read & View PDF"
                          : "Read Full Details"}
                      </span>
                    </button>

                    {item.attachmentUrl && (
                      <a
                        href={item.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-[#FFF1EB] px-3 py-1 text-xs font-semibold text-[#E91E63] hover:bg-[#E91E63] hover:text-white"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </>
  );
}
