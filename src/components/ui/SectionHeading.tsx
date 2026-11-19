import { ACCENT_STYLES } from "@/lib/theme";
import type { BrandAccent } from "@/types/cms";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accent?: BrandAccent;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  accent = "magenta",
}: SectionHeadingProps) {
  const styles = ACCENT_STYLES[accent];
  const isCentered = align === "center";

  return (
    <div
      className={
        isCentered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      }
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.05em] ${styles.badge}`}
      >
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
        {badge}
      </span>
      <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-[#2D3436] sm:text-[2.15rem] lg:text-[2.45rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C] sm:text-[1.0625rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
