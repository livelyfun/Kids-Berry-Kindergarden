"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Apple,
  ArrowRight,
  Cctv,
  Clock,
  MessageCircle,
  Sun,
} from "lucide-react";
import type { ExtendedSiteConfig, HeroSectionData } from "@/lib/cms";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HomeHeroProps {
  hero: HeroSectionData;
  site: ExtendedSiteConfig;
  whatsappUrl: string;
}

function renderHighlightedTitle(title: string, highlightWord: string) {
  const cleanHighlight = highlightWord.trim();
  if (!cleanHighlight) return title;
  const idx = title.toLowerCase().indexOf(cleanHighlight.toLowerCase());
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + cleanHighlight.length);
  const after = title.slice(idx + cleanHighlight.length);
  return (
    <>
      {before}
      <span className="text-[#AED581]">{match}</span>
      {after}
    </>
  );
}

export function HomeHero({ hero, site, whatsappUrl }: HomeHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8F5]">
      <div className="relative flex min-h-[540px] w-full items-center overflow-hidden bg-[#2D3436] sm:min-h-[600px] lg:min-h-[660px]">
        {/* Edge-to-Edge Sunlit Classroom Photo */}
        <motion.div
          initial={{ scale: 1.06, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={hero.imageUrl}
            alt={hero.imageAlt}
            fill
            priority
            className="object-cover object-[68%_30%] sm:object-[62%_28%]"
          />
        </motion.div>

        {/* Warm Charcoal Translucent Scrim Overlays */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2D3436]/85 via-[#2D3436]/55 to-[#2D3436]/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2D3436]/50 via-transparent to-[#2D3436]/15"
        />

        {/* Editorial Foreground Copy */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32">
          <div className="max-w-2xl">
            {hero.badge && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-medium tracking-[0.04em] text-white backdrop-blur-md sm:text-[13px]"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#AED581]" />
                <span>{hero.badge}</span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
              className="mt-6 font-[family-name:var(--font-fredoka)] text-[2.25rem] font-semibold leading-[1.13] tracking-[-0.02em] text-white sm:text-[3rem] lg:text-[3.35rem]"
            >
              {renderHighlightedTitle(hero.title, hero.highlightWord)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
              className="mt-5 max-w-xl text-base font-normal leading-[1.7] text-white/90 sm:text-[1.0625rem]"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <Link
                href={hero.primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63] px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-warm-lg transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95"
              >
                <span>{hero.primaryCtaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#26A69A] px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-warm-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#26A69A]/90"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{hero.secondaryCtaLabel}</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Gentle Curved Bottom Wave Edge into #FFF8F5 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 right-0 z-10 w-full leading-none"
        >
          <svg
            viewBox="0 0 1440 84"
            preserveAspectRatio="none"
            className="block h-10 w-full sm:h-14 lg:h-16"
          >
            <path
              fill="#FFF8F5"
              d="M0,36 C320,92 1060,-8 1440,48 L1440,84 L0,84 Z"
            />
          </svg>
        </div>
      </div>

      {/* Unified 4-Column Timings & Safety Trust Dock (Dynamic from SiteSettings) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.42, ease: EASE }}
        className="relative z-20 mx-auto -mt-4 max-w-7xl px-4 pb-4 sm:-mt-6 sm:px-6 lg:px-8"
      >
        <div className="rounded-[2rem] border border-[#FF7A45]/15 bg-white p-4 shadow-editorial sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#FFF1EB]">
            <div className="flex items-center gap-3.5 px-2 lg:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E91E63]/10 text-[#E91E63]">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-[#78909C]">
                  Regular Class
                </p>
                <p className="font-[family-name:var(--font-fredoka)] text-[0.9375rem] font-semibold text-[#2D3436] sm:text-base">
                  {site.hours.regularClassTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-2 lg:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#26A69A]/12 text-[#26A69A]">
                <Sun className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-[#78909C]">
                  {site.daycareAvailable
                    ? "Daycare & After-Care"
                    : "Extended Hours"}
                </p>
                <p className="font-[family-name:var(--font-fredoka)] text-[0.9375rem] font-semibold text-[#2D3436] sm:text-base">
                  {site.hours.afterClassCareTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-2 lg:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF7A45]/12 text-[#FF7A45]">
                <Apple className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-[#78909C]">
                  Food Provided
                </p>
                <p className="font-[family-name:var(--font-fredoka)] text-[0.9375rem] font-semibold text-[#2D3436] sm:text-base">
                  {site.foodProvided
                    ? "Weekly Menu + Milk & Fruits"
                    : "Healthy Parent Tiffin"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-2 lg:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#5C6BC0]/12 text-[#5C6BC0]">
                <Cctv className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-[#78909C]">
                  Safe Campus
                </p>
                <p className="font-[family-name:var(--font-fredoka)] text-[0.9375rem] font-semibold text-[#2D3436] sm:text-base">
                  {site.cctvMonitoring
                    ? "24/7 CCTV Monitored"
                    : "Verified Pickup Care"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
