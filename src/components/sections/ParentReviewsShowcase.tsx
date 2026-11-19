"use client";

import { Quote, Star } from "lucide-react";
import { ACCENT_STYLES } from "@/lib/theme";
import type { TestimonialItem } from "@/types/cms";

interface ParentReviewsShowcaseProps {
  testimonials: TestimonialItem[];
}

function getInitials(name: string): string {
  const parts = name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "KB";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function ReviewCard({ item }: { item: TestimonialItem }) {
  const styles = ACCENT_STYLES[item.accent];

  return (
    <article className="flex w-[310px] shrink-0 flex-col justify-between rounded-[1.75rem] border border-[#2D3436]/8 bg-white p-6 shadow-warm transition-colors duration-200 hover:border-[#FF7A45]/35 sm:w-[375px]">
      <div>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-1"
            aria-label={`${item.rating} out of 5 stars`}
          >
            {Array.from({ length: item.rating }).map((_, idx) => (
              <Star
                key={idx}
                className="h-4 w-4 fill-[#FF7A45] text-[#FF7A45]"
              />
            ))}
          </div>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-xl ${styles.iconBg} ${styles.iconText}`}
          >
            <Quote className="h-3.5 w-3.5" />
          </span>
        </div>

        <p className="mt-4 text-[0.9375rem] font-normal leading-[1.66] text-[#2D3436]">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-[#2D3436]/8 pt-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${styles.iconBg} ${styles.iconText}`}
        >
          {getInitials(item.parentName)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-[family-name:var(--font-fredoka)] text-sm font-semibold text-[#2D3436]">
            {item.parentName}
          </p>
          <p className="truncate text-xs font-medium text-[#78909C]">
            {item.program} • {item.location}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ParentReviewsShowcase({
  testimonials,
}: ParentReviewsShowcaseProps) {
  if (testimonials.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="marquee-track relative w-full overflow-hidden py-3">
        {/* Soft left & right fade masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FFF8F5] to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FFF8F5] to-transparent sm:w-28"
        />

        <div className="animate-marquee gap-5 sm:gap-6">
          {/* Primary Set */}
          <div className="flex shrink-0 gap-5 sm:gap-6">
            {testimonials.map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </div>

          {/* Seamless Duplicate Set for Continuous Loop */}
          <div aria-hidden="true" className="flex shrink-0 gap-5 sm:gap-6">
            {testimonials.map((item) => (
              <ReviewCard key={`${item.id}-dup`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs font-medium text-[#78909C]">
        Hover any card to pause &amp; read
      </p>
    </div>
  );
}
