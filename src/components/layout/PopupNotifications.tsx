"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { ACCENT_STYLES } from "@/lib/theme";
import type { PopupNotificationItem } from "@/types/cms";

interface PopupNotificationsProps {
  popups: PopupNotificationItem[];
}

export function PopupNotifications({ popups }: PopupNotificationsProps) {
  const [open, setOpen] = useState(() => popups.length > 0);
  const [index, setIndex] = useState(0);

  const current = popups[index] ?? popups[0];
  const hasMultiple = popups.length > 1;
  const isLast = index >= popups.length - 1;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      } else if (event.key === "ArrowRight" && hasMultiple) {
        setIndex((prev) => (prev + 1) % popups.length);
      } else if (event.key === "ArrowLeft" && hasMultiple) {
        setIndex((prev) => (prev - 1 + popups.length) % popups.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, hasMultiple, popups.length]);

  if (!open || !current) return null;

  const styles = ACCENT_STYLES[current.accent];
  const isInternalLink =
    Boolean(current.ctaHref) && current.ctaHref!.startsWith("/");

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + popups.length) % popups.length);
  };

  const handleNext = () => {
    if (isLast) {
      setOpen(false);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="kb-popup-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D3436]/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-[#FF7A45]/20 bg-white shadow-warm-lg"
          >
            {/* 6-color Kids Berry top brand accent strip */}
            <div className="grid h-1.5 w-full grid-cols-6">
              <div className="bg-[#FF7A45]" />
              <div className="bg-[#FF6B81]" />
              <div className="bg-[#E91E63]" />
              <div className="bg-[#AED581]" />
              <div className="bg-[#26A69A]" />
              <div className="bg-[#5C6BC0]" />
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close announcement"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#2D3436]/10 bg-white/95 text-[#2D3436] shadow-sm transition-colors hover:bg-[#FFF1EB] hover:text-[#E91E63]"
            >
              <X className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.imageUrl && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FFF1EB]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.imageUrl}
                      alt={current.imageAlt || current.title}
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2D3436]/35 via-transparent to-transparent"
                    />
                    {current.badge && (
                      <span
                        className={`absolute bottom-3 left-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm ${styles.solidBg}`}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>{current.badge}</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {!current.imageUrl && current.badge ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold ${styles.badge}`}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>{current.badge}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    {hasMultiple && (
                      <span className="rounded-full bg-[#FFF8F5] px-3 py-1 text-xs font-semibold text-[#78909C]">
                        Notice {index + 1} of {popups.length}
                      </span>
                    )}
                  </div>

                  <h2
                    id="kb-popup-title"
                    className="mt-2 font-[family-name:var(--font-fredoka)] text-2xl font-semibold leading-snug text-[#2D3436] pr-6"
                  >
                    {current.title}
                  </h2>

                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#78909C] sm:text-[0.9375rem]">
                    {current.message}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#2D3436]/8 pt-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {current.ctaLabel &&
                        current.ctaHref &&
                        (isInternalLink ? (
                          <Link
                            href={current.ctaHref}
                            onClick={() => setOpen(false)}
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-warm transition-transform hover:-translate-y-0.5 ${styles.solidBg}`}
                          >
                            <span>{current.ctaLabel}</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        ) : (
                          <a
                            href={current.ctaHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-warm transition-transform hover:-translate-y-0.5 ${styles.solidBg}`}
                          >
                            <span>{current.ctaLabel}</span>
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        ))}

                      {hasMultiple ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-xs font-semibold text-[#2D3436] transition-colors hover:border-[#E91E63]/35 hover:text-[#E91E63]"
                        >
                          <span>{isLast ? "Dismiss" : "Next Notice"}</span>
                          {!isLast && <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-xs font-semibold text-[#2D3436] transition-colors hover:bg-[#FFF1EB]"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>

                    {hasMultiple && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Previous notice"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2D3436]/12 bg-white text-[#2D3436] hover:border-[#E91E63] hover:text-[#E91E63]"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-1 px-1">
                          {popups.map((p, idx) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setIndex(idx)}
                              aria-label={`Go to notice ${idx + 1}`}
                              className={`h-2 rounded-full transition-all ${
                                idx === index
                                  ? "w-5 bg-[#E91E63]"
                                  : "w-2 bg-[#2D3436]/20 hover:bg-[#E91E63]/50"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setIndex((prev) => (prev + 1) % popups.length)
                          }
                          aria-label="Next notice"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2D3436]/12 bg-white text-[#2D3436] hover:border-[#E91E63] hover:text-[#E91E63]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
