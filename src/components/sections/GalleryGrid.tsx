"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/types/cms";

interface GalleryGridProps {
  items: GalleryItem[];
}

const CATEGORIES: Array<{ id: GalleryCategory; label: string }> = [
  { id: "all", label: "All Moments" },
  { id: "montessori", label: "Montessori Classroom" },
  { id: "outdoor", label: "Outdoor & Play" },
  { id: "art", label: "Art & Creativity" },
  { id: "events", label: "Celebrations & Events" },
];

const CATEGORY_BADGE_COLORS: Record<Exclude<GalleryCategory, "all">, string> = {
  montessori: "bg-[#26A69A] text-white",
  outdoor: "bg-[#AED581] text-[#2D3436]",
  art: "bg-[#FF7A45] text-white",
  events: "bg-[#E91E63] text-white",
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const activeItem =
    selectedIndex !== null && filteredItems[selectedIndex]
      ? filteredItems[selectedIndex]
      : null;

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + filteredItems.length) % filteredItems.length,
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length,
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, showPrev, showNext]);

  return (
    <div>
      {/* Animated Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? items.length
              : items.filter((item) => item.category === cat.id).length;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(null);
              }}
              className={`relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "border-transparent text-white"
                  : "border-[#E91E63]/15 bg-white text-[#2D3436] hover:border-[#E91E63]/40 hover:bg-[#FFF1EB]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="gallery-cat-pill"
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63] shadow-sm"
                />
              )}
              <span className="relative z-10">{cat.label}</span>
              <span
                className={`relative z-10 rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-[#FFF1EB] text-[#78909C]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      {filteredItems.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-[#E91E63]/15 bg-white p-12 text-center">
          <Camera className="mx-auto h-10 w-10 text-[#78909C]" />
          <p className="mt-3 text-base font-medium text-[#78909C]">
            No photos found in this category yet.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.38,
                  delay: Math.min(idx * 0.04, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#E91E63]/10 bg-white text-left shadow-warm focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF1EB]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D3436]/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm ${
                      CATEGORY_BADGE_COLORS[item.category]
                    }`}
                  >
                    {item.categoryLabel}
                  </span>
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#2D3436] opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#78909C]">
                    {item.date}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-[#2D3436] transition-colors group-hover:text-[#E91E63]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#78909C]">
                    {item.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Animated Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D3436]/85 p-4 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close image preview"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#2D3436] shadow-md transition-colors hover:bg-[#E91E63] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-[#FFF1EB]">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                />
                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#2D3436] shadow-md transition-colors hover:bg-[#E91E63] hover:text-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#2D3436] shadow-md transition-colors hover:bg-[#E91E63] hover:text-white"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-col justify-between gap-3 p-6 sm:flex-row sm:items-center">
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      CATEGORY_BADGE_COLORS[activeItem.category]
                    }`}
                  >
                    {activeItem.categoryLabel}
                  </span>
                  <h3 className="mt-2 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                    {activeItem.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#78909C]">
                    {activeItem.description}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-[#78909C]">
                  {(selectedIndex ?? 0) + 1} / {filteredItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
