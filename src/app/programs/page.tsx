import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Users } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MontessoriMotion";
import { CareScheduleSwitcher } from "@/components/sections/CareScheduleSwitcher";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MontessoriPillarsInteractive } from "@/components/sections/MontessoriPillarsInteractive";
import { IconMap } from "@/components/ui/IconMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getCareTracks,
  getDailyRoutine,
  getLearningPillars,
  getPrograms,
} from "@/data/site-data";
import { ACCENT_STYLES } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Programs, Daycare & After-Class Care",
  description:
    "Explore Regular Montessori Classes (9:00 AM – 3:00 PM), Daycare, After-Class Care (3:00 PM – 5:00 PM), age groups, and daily routine at Kids Berry Kindergarten School, Pichara, Biratnagar-11.",
};

export default function ProgramsPage() {
  const careTracks = getCareTracks();
  const programs = getPrograms();
  const pillars = getLearningPillars();
  const routine = getDailyRoutine();

  return (
    <>
      <PageHeader
        title="Programs, Daycare & After-Class Care"
        subtitle="Flexible learning and care pathways built around your child's growth—with Regular Classes (9:00 AM – 3:00 PM), full Daycare, and After-Class Care (3:00 PM – 5:00 PM), supported by freshly cooked weekly meals."
        currentPage="Programs"
      />

      {/* Quick Anchor Pills */}
      <div className="border-b border-[#E91E63]/10 bg-white/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2.5 px-4 py-4 sm:px-6 lg:px-8">
          <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-[#78909C]">
            Jump to:
          </span>
          <a
            href="#care-timings"
            className="rounded-full border border-[#E91E63]/20 bg-[#FFF1EB] px-4 py-1.5 text-xs font-semibold text-[#E91E63] hover:bg-[#E91E63] hover:text-white"
          >
            Regular, Daycare &amp; After-Care
          </a>
          {programs.map((p) => {
            const styles = ACCENT_STYLES[p.accent];
            return (
              <a
                key={p.id}
                href={`#${p.slug}`}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-transform hover:-translate-y-0.5 ${styles.badge}`}
              >
                {p.title} ({p.ageGroup})
              </a>
            );
          })}
          <a
            href="#learning-approach"
            className="rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-1.5 text-xs font-semibold text-[#2D3436] hover:border-[#E91E63] hover:text-[#E91E63]"
          >
            Montessori Approach
          </a>
          <a
            href="#daily-routine"
            className="rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-1.5 text-xs font-semibold text-[#2D3436] hover:border-[#26A69A] hover:text-[#26A69A]"
          >
            Daily Routine
          </a>
        </div>
      </div>

      {/* 1. Interactive Care Schedules (9-3, Daycare, 3-5 PM) */}
      <section
        id="care-timings"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <ScrollReveal>
          <SectionHeading
            badge="Schedules & Care Options"
            title="Regular Classes, Daycare & After-Class Care"
            subtitle="Switch between our three core schedules to see exact timings, care features, and daily meals included."
            accent="magenta"
          />
        </ScrollReveal>

        <CareScheduleSwitcher tracks={careTracks} />
      </section>

      {/* 2. Age Groups Detailed Chapters */}
      <section className="surface-linen py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              badge="Age Groups"
              title="Four Developmental Montessori Class Levels"
              subtitle="Each level runs 9:00 AM – 3:00 PM regular hours with seamless optional Daycare and After-Class Care until 5:00 PM."
              accent="coral"
            />
          </ScrollReveal>

          <div className="mt-12 space-y-10">
            {programs.map((program, idx) => {
              const styles = ACCENT_STYLES[program.accent];
              const isReversed = idx % 2 === 1;

              return (
                <ScrollReveal key={program.id}>
                  <article
                    id={program.slug}
                    className={`scroll-mt-32 overflow-hidden rounded-[2.25rem] border ${styles.border} bg-white shadow-editorial`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div
                        className={`relative min-h-[260px] lg:col-span-5 ${
                          isReversed ? "lg:order-2" : ""
                        }`}
                      >
                        <Image
                          src={program.image}
                          alt={program.imageAlt}
                          fill
                          className="object-cover"
                        />
                        <span
                          className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-xs font-semibold shadow-md ${styles.solidBg}`}
                        >
                          {program.ageGroup}
                        </span>
                      </div>

                      <div className="p-7 sm:p-10 lg:col-span-7">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#78909C]">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8F5] px-3 py-1">
                            <Clock
                              className={`h-3.5 w-3.5 ${styles.iconText}`}
                            />
                            {program.schedule}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8F5] px-3 py-1">
                            <Users
                              className={`h-3.5 w-3.5 ${styles.iconText}`}
                            />
                            {program.classSize} ({program.ratio})
                          </span>
                        </div>

                        <h3 className="mt-4 text-[1.65rem] font-semibold leading-[1.22] tracking-[-0.01em] text-[#2D3436] sm:text-[1.95rem]">
                          {program.title}
                        </h3>
                        <p
                          className={`mt-1 text-sm font-semibold ${styles.iconText}`}
                        >
                          {program.subtitle}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-[#78909C]">
                          {program.fullDescription}
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#2D3436]">
                              Key Highlights
                            </h4>
                            <ul className="mt-3 space-y-2">
                              {program.highlights.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm text-[#78909C]"
                                >
                                  <CheckCircle2
                                    className={`mt-0.5 h-4 w-4 shrink-0 ${styles.iconText}`}
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#2D3436]">
                              Focus Areas
                            </h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {program.curriculumAreas.map((area) => (
                                <span
                                  key={area}
                                  className={`rounded-2xl border px-3 py-1.5 text-xs font-semibold ${styles.badge}`}
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3 border-t border-[#2D3436]/8 pt-5">
                          <Link
                            href="/contact"
                            className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${styles.solidBg}`}
                          >
                            <span>Inquire About {program.title}</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <Link
                            href="/facilities#weekly-menu"
                            className="inline-flex items-center gap-2 rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-5 py-2.5 text-sm font-semibold text-[#2D3436] hover:border-[#26A69A] hover:text-[#26A69A]"
                          >
                            <span>See Weekly Meals</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Montessori Learning Approach */}
      <section
        id="learning-approach"
        className="scroll-mt-28 bg-[#FFF1EB]/70 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              badge="Montessori Implemented Pre-school"
              title="Five Pillars of Hands-On Discovery"
              subtitle="Select any pillar below to see how tactile Montessori materials build lasting joy and confidence."
              accent="magenta"
            />
          </ScrollReveal>

          <MontessoriPillarsInteractive pillars={pillars} />
        </div>
      </section>

      {/* 4. Full Daily Rhythm (9:00 AM - 3:00 PM & 3:00 PM - 5:00 PM) */}
      <section
        id="daily-routine"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <ScrollReveal>
          <SectionHeading
            badge="A Day at Kids Berry"
            title="9:00 AM – 3:00 PM School Day + 3:00 PM – 5:00 PM After-Class Care"
            subtitle="A comforting, predictable rhythm balancing Montessori discovery, freshly cooked meals, rest, outdoor play, and daily warm milk with fresh fruits."
            accent="olive"
          />
        </ScrollReveal>

        <StaggerContainer className="relative mx-auto mt-12 max-w-4xl space-y-4">
          {routine.map((slot, index) => {
            const styles = ACCENT_STYLES[slot.accent];
            return (
              <StaggerItem key={slot.id}>
                <div className="flex flex-col gap-4 rounded-3xl border border-[#2D3436]/8 bg-white p-5 shadow-warm transition-shadow hover:shadow-editorial sm:flex-row sm:items-center sm:p-6">
                  <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText}`}
                    >
                      <IconMap name={slot.iconName} className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-[#78909C]">
                        Block 0{index + 1}
                      </span>
                      <p
                        className={`font-[family-name:var(--font-fredoka)] text-sm font-semibold ${styles.iconText}`}
                      >
                        {slot.time}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#2D3436]/8 pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <h3 className="text-lg font-semibold text-[#2D3436]">
                      {slot.activity}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                      {slot.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      <CtaBanner
        badge="Enroll Today"
        title="Need Regular Class (9–3), Daycare, or After-Class Care (3–5)?"
        description="Contact our Pichara, Biratnagar-11 campus or chat directly on WhatsApp to reserve a tour."
      />
    </>
  );
}
