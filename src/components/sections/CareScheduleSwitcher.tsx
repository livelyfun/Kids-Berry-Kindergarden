"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { IconMap } from "@/components/ui/IconMap";
import { ACCENT_STYLES } from "@/lib/theme";
import type { CareTrackItem } from "@/types/cms";

interface CareScheduleSwitcherProps {
  tracks: CareTrackItem[];
}

export function CareScheduleSwitcher({ tracks }: CareScheduleSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = tracks[activeIndex] ?? tracks[0];
  if (!current) return null;

  const styles = ACCENT_STYLES[current.accent];

  return (
    <div className="mt-10">
      {/* Interactive Tab Switcher */}
      <div
        role="tablist"
        aria-label="School and Care Timings"
        className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-3xl border border-[#FF7A45]/15 bg-white p-2 shadow-warm sm:rounded-full"
      >
        {tracks.map((track, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={track.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-1 rounded-full px-4 py-2.5 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
                isActive ? "text-white" : "text-[#2D3436] hover:text-[#E91E63]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="care-track-tab"
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63] shadow-sm"
                />
              )}
              <span className="relative z-10 whitespace-nowrap">
                {track.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Detail Panel */}
      <div className="mt-8 overflow-hidden rounded-[2.25rem] border border-[#FF7A45]/15 bg-white shadow-editorial">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-center lg:grid-cols-12"
          >
            <div className="relative aspect-[16/11] w-full bg-[#FFF1EB] lg:col-span-5 lg:aspect-auto lg:h-full lg:min-h-[380px]">
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                className="object-cover"
              />
              <span
                className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm ${styles.solidBg}`}
              >
                {current.badge}
              </span>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText}`}
                >
                  <IconMap name={current.iconName} className="h-5 w-5" />
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold ${styles.badge}`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {current.timing}
                </span>
                <span className="rounded-full bg-[#FFF8F5] px-3.5 py-1.5 text-xs font-semibold text-[#78909C]">
                  {current.ageRange}
                </span>
              </div>

              <h3 className="mt-5 text-[1.5rem] font-semibold leading-[1.25] tracking-[-0.01em] text-[#2D3436] sm:text-[1.85rem]">
                {current.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#78909C]">
                {current.description}
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {current.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 rounded-2xl bg-[#FFF8F5] p-3 text-xs font-medium leading-relaxed text-[#2D3436]"
                  >
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${styles.iconText}`}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${styles.solidBg}`}
                >
                  <span>Inquire About This Schedule</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/facilities"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-6 py-3 text-sm font-semibold text-[#2D3436] transition-colors hover:border-[#26A69A] hover:text-[#26A69A]"
                >
                  <span>See CCTV &amp; Meals Included</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
