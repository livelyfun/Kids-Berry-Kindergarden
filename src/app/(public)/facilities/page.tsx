import type { Metadata } from "next";
import Image from "next/image";
import {
  Apple,
  CheckCircle2,
  Coffee,
  Utensils,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TactileCard,
} from "@/components/motion/MontessoriMotion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { WeeklyMenuExplorer } from "@/components/sections/WeeklyMenuExplorer";
import { IconMap } from "@/components/ui/IconMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getCmsSiteConfig,
  getPublishedFacilities,
  getPublishedWeeklyMenu,
} from "@/lib/cms";
import { ACCENT_STYLES } from "@/lib/theme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Facilities, CCTV Safety & Weekly Food Menu",
  description:
    "Explore our CCTV-monitored classrooms, freshly prepared weekly food menu with daily hot milk & fruits, clean play areas, daycare, and 3:00 PM – 5:00 PM after-class care at Kids Berry Kindergarten School, Biratnagar-11.",
};

export default async function FacilitiesPage() {
  const [site, facilities, weeklyMenu] = await Promise.all([
    getCmsSiteConfig(),
    getPublishedFacilities(false),
    getPublishedWeeklyMenu(),
  ]);

  return (
    <>
      <PageHeader
        title="Campus Facilities, CCTV Safety & Weekly Food Menu"
        subtitle={`From 24/7 CCTV monitoring and spotless Montessori classrooms to freshly cooked weekly meals, daily hot milk, fruits, daycare, and ${site.hours.afterClassCareTime} after-class care.`}
        currentPage="Facilities"
      />

      {/* 1. Core Facility Cards with Images */}
      {facilities.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              badge="Designed for Safety & Comfort"
              title="Pillars of Care Inside Our Campus"
              subtitle="Transparent safety, daily nourishment, hygienic play spaces, and extended support until 5:00 PM."
              accent="magenta"
            />
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((fac) => {
              const styles = ACCENT_STYLES[fac.accent];
              return (
                <StaggerItem key={fac.id}>
                  <TactileCard className="h-full">
                    <article
                      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border ${styles.border} bg-white shadow-editorial`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF1EB]">
                        <Image
                          src={fac.image}
                          alt={fac.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute left-4 top-4 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm ${styles.solidBg}`}
                        >
                          {fac.badge}
                        </span>
                        <div
                          className={`absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/95 shadow-md backdrop-blur-xs ${styles.iconText}`}
                        >
                          <IconMap name={fac.iconName} className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                          {fac.title}
                        </h2>
                        <p
                          className={`mt-1 text-xs font-semibold ${styles.iconText}`}
                        >
                          {fac.subtitle}
                        </p>
                        <p className="mt-3 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                          {fac.description}
                        </p>

                        <ul className="mt-5 flex-1 space-y-2.5 border-t border-[#2D3436]/8 pt-4">
                          {fac.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs font-medium leading-relaxed text-[#2D3436]"
                            >
                              <CheckCircle2
                                className={`mt-0.5 h-4 w-4 shrink-0 ${styles.iconText}`}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </TactileCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      {/* 2. Interactive Nutritious Food & Weekly Menu Explorer */}
      {weeklyMenu.length > 0 && (
        <section
          id="weekly-menu"
          className="scroll-mt-28 bg-[#FFF1EB]/75 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge="Nutritious Food Provided"
                title="Interactive Weekly Food Menu + Daily Hot Milk & Fresh Fruits"
                subtitle={`Parents never need to worry about morning tiffin stress. Inspect any day below or view the full ${site.hours.days} rotating kitchen schedule.`}
                accent="coral"
              />
            </ScrollReveal>

            <StaggerContainer className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              <StaggerItem>
                <div className="flex items-center gap-3.5 rounded-3xl border border-[#E91E63]/15 bg-white p-4 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1EB] text-[#E91E63]">
                    <Coffee className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-[#2D3436]">
                      Hot Milk Every Day
                    </p>
                    <p className="text-xs text-[#78909C]">
                      Served warm &amp; fresh daily
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-center gap-3.5 rounded-3xl border border-[#AED581]/50 bg-white p-4 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#AED581]/30 text-[#2D3436]">
                    <Apple className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-[#2D3436]">
                      Fresh Fruits Daily
                    </p>
                    <p className="text-xs text-[#78909C]">
                      Washed seasonal fruit bowls
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-center gap-3.5 rounded-3xl border border-[#26A69A]/25 bg-white p-4 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#26A69A]/12 text-[#26A69A]">
                    <Utensils className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-[#2D3436]">
                      Zero Junk Food Policy
                    </p>
                    <p className="text-xs text-[#78909C]">
                      100% home-style balanced kitchen
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <WeeklyMenuExplorer menu={weeklyMenu} />

            <p className="mt-6 text-center text-xs text-[#78909C]">
              * Rotating weekly menu — adjusted seasonally for fresh local
              produce and individual child allergy notes.
            </p>
          </div>
        </section>
      )}

      <CtaBanner
        badge="Inspect Our Campus Yourself"
        title="Schedule a Walkthrough of Our Kitchen, Classrooms & CCTV Care"
        description={`Visit ${site.address.street} anytime ${site.hours.days} to meet our team and view our facilities firsthand.`}
      />
    </>
  );
}
