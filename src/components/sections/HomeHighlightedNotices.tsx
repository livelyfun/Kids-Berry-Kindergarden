"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, FileText, Megaphone, Paperclip } from "lucide-react";
import { NoticeDetailModal } from "@/components/sections/NoticeBoardClient";
import { ACCENT_STYLES } from "@/lib/theme";
import type { NoticeItem } from "@/types/cms";

const CATEGORY_LABELS: Record<NoticeItem["category"], string> = {
  notice: "General Notice",
  exam: "Exam Details",
  offer: "Special Offer",
  event: "School Event",
  holiday: "Holiday Notice",
};

export function HomeHighlightedNotices({
  notices,
}: {
  notices: NoticeItem[];
}) {
  const [selected, setSelected] = useState<NoticeItem | null>(null);

  if (notices.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E91E63]/20 bg-[#FFF1EB] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.05em] text-[#E91E63]">
            <Megaphone className="h-3.5 w-3.5" />
            Notice Board Highlights
          </span>
          <h2 className="mt-3 text-[1.6rem] font-semibold leading-[1.2] tracking-[-0.015em] text-[#2D3436] sm:text-[2rem]">
            Latest School Notices, Exams &amp; Offers
          </h2>
        </div>

        <Link
          href="/notices"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E91E63]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#E91E63] shadow-xs transition-all hover:bg-[#E91E63] hover:text-white sm:text-sm"
        >
          <span>View All Notices</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((item) => {
          const styles = ACCENT_STYLES[item.accent];
          return (
            <article
              key={item.id}
              className={`group flex flex-col justify-between rounded-[1.75rem] border ${styles.border} bg-white p-5 shadow-warm transition-all hover:-translate-y-0.5 hover:shadow-editorial sm:p-6`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${styles.badge}`}
                  >
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  {item.noticeDate && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#78909C]">
                      <Calendar className="h-3.5 w-3.5 text-[#FF7A45]" />
                      <span>{item.noticeDate}</span>
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-[family-name:var(--font-fredoka)] text-lg font-semibold leading-snug text-[#2D3436] transition-colors group-hover:text-[#E91E63]">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#78909C]">
                  {item.summary}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#2D3436]/8 pt-3.5">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${styles.iconText} hover:opacity-80`}
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {item.attachmentUrl && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF8F5] px-2.5 py-1 text-[11px] font-semibold text-[#2D3436]">
                    {item.attachmentType === "pdf" ? (
                      <FileText className="h-3 w-3 text-[#E91E63]" />
                    ) : (
                      <Paperclip className="h-3 w-3 text-[#26A69A]" />
                    )}
                    <span>
                      {item.attachmentType === "pdf"
                        ? "PDF"
                        : item.attachmentType === "image"
                          ? "Photo"
                          : "File"}
                    </span>
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <NoticeDetailModal
        notice={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
