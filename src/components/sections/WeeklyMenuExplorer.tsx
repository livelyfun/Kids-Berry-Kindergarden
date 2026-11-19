"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  CalendarDays,
  Coffee,
  LayoutGrid,
  Utensils,
} from "lucide-react";
import { ACCENT_STYLES } from "@/lib/theme";
import type { WeeklyMenuItem } from "@/types/cms";

interface WeeklyMenuExplorerProps {
  menu: WeeklyMenuItem[];
}

export function WeeklyMenuExplorer({ menu }: WeeklyMenuExplorerProps) {
  const [selectedDayId, setSelectedDayId] = useState(menu[0]?.id ?? "sun");
  const [viewAll, setViewAll] = useState(false);

  const selectedDay = menu.find((m) => m.id === selectedDayId) ?? menu[0];
  if (!selectedDay) return null;

  const activeStyles = ACCENT_STYLES[selectedDay.accent];

  return (
    <div className="mt-10">
      {/* Control Bar: Day Pills + View All Toggle */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        {!viewAll ? (
          <div
            role="tablist"
            aria-label="Weekly Menu Days"
            className="flex flex-wrap items-center justify-center gap-1.5 rounded-3xl border border-[#FF7A45]/15 bg-white p-1.5 shadow-sm sm:rounded-full"
          >
            {menu.map((item) => {
              const isActive = item.id === selectedDayId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedDayId(item.id)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    isActive
                      ? "text-white"
                      : "text-[#2D3436] hover:text-[#E91E63]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-day-pill"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 28,
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63]"
                    />
                  )}
                  <span className="relative z-10">{item.day}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#2D3436] shadow-xs">
            <CalendarDays className="h-4 w-4 text-[#E91E63]" />
            Showing Complete Sunday – Friday School Menu
          </span>
        )}

        <button
          type="button"
          onClick={() => setViewAll((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-[#26A69A]/30 bg-white px-5 py-2.5 text-xs font-semibold text-[#26A69A] shadow-xs transition-colors hover:bg-[#26A69A] hover:text-white"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span>{viewAll ? "Inspect Single Day" : "View Full Week Grid"}</span>
        </button>
      </div>

      {/* Single Day Spotlight vs Full Week Grid */}
      {!viewAll ? (
        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[#FF7A45]/15 bg-white p-6 shadow-editorial sm:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2D3436]/8 pb-4">
                <div>
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${activeStyles.badge}`}
                  >
                    Prepared Fresh in Campus Kitchen
                  </span>
                  <h3 className="mt-2 text-[1.5rem] font-semibold leading-[1.25] tracking-[-0.01em] text-[#2D3436] sm:text-[1.85rem]">
                    {selectedDay.day}&rsquo;s Balanced Meal Plan
                  </h3>
                </div>
                <span className="rounded-2xl bg-[#FFF8F5] px-4 py-2 text-xs font-semibold text-[#78909C]">
                  Served warm • Zero junk food
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-3xl border border-[#FF7A45]/15 bg-[#FFF8F5] p-5">
                  <div className="flex items-center gap-2.5 text-[#FF7A45]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-xs">
                      <Apple className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Morning Bite (9:30 AM)
                    </span>
                  </div>
                  <p className="mt-3 text-base font-semibold leading-snug text-[#2D3436]">
                    {selectedDay.morningSnack}
                  </p>
                </div>

                <div className="rounded-3xl border border-[#26A69A]/20 bg-[#FFF8F5] p-5">
                  <div className="flex items-center gap-2.5 text-[#26A69A]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-xs">
                      <Utensils className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Wholesome Hot Lunch
                    </span>
                  </div>
                  <p className="mt-3 text-base font-semibold leading-snug text-[#2D3436]">
                    {selectedDay.hotLunch}
                  </p>
                </div>

                <div className="rounded-3xl border border-[#E91E63]/20 bg-[#FFF1EB] p-5">
                  <div className="flex items-center gap-2.5 text-[#E91E63]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-xs">
                      <Coffee className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Daily Hot Milk &amp; Fruits
                    </span>
                  </div>
                  <p className="mt-3 text-base font-semibold leading-snug text-[#2D3436]">
                    {selectedDay.afternoonBooster}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {menu.map((row) => {
            const styles = ACCENT_STYLES[row.accent];
            return (
              <div
                key={row.id}
                className={`hover-lift rounded-3xl border ${styles.border} bg-white p-6 shadow-warm`}
              >
                <div className="flex items-center justify-between border-b border-[#2D3436]/8 pb-3">
                  <h3 className="text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                    {row.day}
                  </h3>
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${styles.badge}`}
                  >
                    Fresh Kitchen
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#78909C]">
                      Morning Bite
                    </p>
                    <p className="mt-0.5 font-medium text-[#2D3436]">
                      {row.morningSnack}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#78909C]">
                      Wholesome Midday Meal
                    </p>
                    <p className="mt-0.5 font-medium text-[#2D3436]">
                      {row.hotLunch}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#FFF8F5] p-3">
                    <p
                      className={`text-xs font-medium uppercase tracking-wider ${styles.iconText}`}
                    >
                      Afternoon Daily Booster
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#2D3436]">
                      {row.afternoonBooster}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
