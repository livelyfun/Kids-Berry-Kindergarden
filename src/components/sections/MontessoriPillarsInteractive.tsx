"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { IconMap } from "@/components/ui/IconMap";
import { ACCENT_STYLES } from "@/lib/theme";
import type { LearningPillar } from "@/types/cms";

interface MontessoriPillarsInteractiveProps {
  pillars: LearningPillar[];
}

export function MontessoriPillarsInteractive({
  pillars,
}: MontessoriPillarsInteractiveProps) {
  const [selectedId, setSelectedId] = useState(pillars[0]?.id ?? "");
  const active = pillars.find((p) => p.id === selectedId) ?? pillars[0];
  if (!active) return null;

  const styles = ACCENT_STYLES[active.accent];

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Interactive Pillar List */}
      <div className="space-y-2.5 lg:col-span-5">
        {pillars.map((pillar, index) => {
          const isSelected = pillar.id === active.id;
          const pStyles = ACCENT_STYLES[pillar.accent];

          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setSelectedId(pillar.id)}
              className={`relative flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? `${pStyles.border} bg-white shadow-editorial`
                  : "border-transparent bg-white/65 hover:bg-white"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${pStyles.iconBg} ${pStyles.iconText}`}
              >
                <IconMap name={pillar.iconName} className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium uppercase tracking-wider text-[#78909C]">
                  Pillar 0{index + 1}
                </span>
                <p className="truncate font-[family-name:var(--font-fredoka)] text-base font-semibold text-[#2D3436]">
                  {pillar.title}
                </p>
              </div>
              {isSelected && (
                <motion.span
                  layoutId="montessori-pillar-dot"
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${pStyles.dot}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Detailed Montessori Material Card */}
      <div className="lg:col-span-7">
        <div
          className={`flex h-full flex-col justify-between rounded-[2.25rem] border ${styles.border} bg-white p-7 shadow-editorial sm:p-10`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText}`}
                >
                  <IconMap name={active.iconName} className="h-7 w-7" />
                </span>
                <div>
                  <span
                    className={`text-xs font-medium uppercase tracking-wider ${styles.iconText}`}
                  >
                    {active.subtitle}
                  </span>
                  <h3 className="text-[1.5rem] font-semibold leading-[1.25] tracking-[-0.01em] text-[#2D3436] sm:text-[1.85rem]">
                    {active.title}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#78909C]">
                {active.description}
              </p>

              <div className="mt-7 rounded-3xl bg-[#FFF8F5] p-6">
                <h4 className="text-xs font-medium uppercase tracking-wider text-[#2D3436]">
                  Hands-On Classroom Activities
                </h4>
                <ul className="mt-4 space-y-3">
                  {active.activities.map((act) => (
                    <li
                      key={act}
                      className="flex items-start gap-2.5 text-sm font-medium text-[#2D3436]"
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${styles.iconText}`}
                      />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
