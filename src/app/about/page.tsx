import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, HeartHandshake, Sparkles } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TactileCard,
} from "@/components/motion/MontessoriMotion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { IconMap } from "@/components/ui/IconMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getCampusFacilities,
  getCoreValues,
  getSiteConfig,
  getTeamMembers,
} from "@/data/site-data";
import { ACCENT_STYLES } from "@/lib/theme";

export const metadata: Metadata = {
  title: "About Us & Our Educators",
  description:
    "Discover the story, Montessori-implemented philosophy, daycare mission, core values, and educators at Kids Berry Kindergarten School in Pichara, Biratnagar-11, Nepal.",
};

export default function AboutPage() {
  const site = getSiteConfig();
  const values = getCoreValues();
  const facilities = getCampusFacilities();
  const team = getTeamMembers();

  return (
    <>
      <PageHeader
        title="About Kids Berry Kindergarten School"
        subtitle="Serving families in Pichara, Biratnagar-11 with Montessori-implemented pre-school learning, 24/7 CCTV-monitored safety, freshly prepared meals, and loving extended daycare."
        currentPage="About Us"
      />

      {/* School Story & Montessori Philosophy */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <ScrollReveal direction="left" className="lg:col-span-6">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 h-full w-full rounded-[2.25rem] bg-[#FFF1EB] ring-1 ring-[#E91E63]/15"
              />
              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-warm-lg">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/hero-classroom.jpg"
                    alt="Sunlit Montessori classroom with happy young children and caring teacher"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-4">
                  <Image
                    src={site.logoPath}
                    alt="Kids Berry Logo"
                    width={46}
                    height={46}
                    className="h-12 w-12 shrink-0 rounded-xl object-contain"
                  />
                  <p className="text-xs leading-relaxed text-[#78909C] sm:text-sm">
                    Our emblem shows caring hands cradling little children
                    beneath a warm home roof—a daily promise of safety, care,
                    and gentle guidance.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF1EB] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E91E63]">
              Our Story &amp; Philosophy
            </span>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-[#2D3436] sm:text-[2.15rem]">
              Nurturing Curious Minds &amp; Supporting Modern Families
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#78909C]">
              <strong>Kids Berry Kindergarten School</strong> was founded in{" "}
              <strong>Pichara, Biratnagar-11</strong> to create a preschool
              parents can trust wholeheartedly: a place where authentic
              Montessori learning meets practical peace of mind.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#78909C]">
              Guided by Maria Montessori&rsquo;s philosophy—
              <em>&ldquo;Help me to do it myself&rdquo;</em>—we prepare clean,
              sunlit classrooms with natural wooden materials while providing
              CCTV monitoring, freshly cooked weekly meals with daily hot milk
              and fruits, and dependable care until 5:00 PM.
            </p>

            {/* Vision & Mission Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#E91E63]/15 bg-[#FFF1EB] p-5">
                <div className="flex items-center gap-2 text-[#E91E63]">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Our Vision</h3>
                </div>
                <p className="mt-2 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                  To inspire healthy, confident, curious young learners in
                  Biratnagar who feel deeply safe and excited to explore every
                  day.
                </p>
              </div>
              <div className="rounded-3xl border border-[#26A69A]/20 bg-[#26A69A]/8 p-5">
                <div className="flex items-center gap-2 text-[#26A69A]">
                  <HeartHandshake className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Our Mission</h3>
                </div>
                <p className="mt-2 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                  To unite Montessori pre-school discovery with loving Daycare,
                  nutritious daily meals, and transparent CCTV-monitored safety.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="surface-linen py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              badge="What Guides Us"
              title="Our Core Values in Every Classroom"
              subtitle="Safety, Montessori respect, nourishing food, and warm family support guide everything we do."
              accent="magenta"
            />
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val) => {
              const styles = ACCENT_STYLES[val.accent];
              return (
                <StaggerItem key={val.id}>
                  <TactileCard
                    className={`h-full rounded-3xl border ${styles.border} bg-white p-6 shadow-warm`}
                  >
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText}`}
                    >
                      <IconMap name={val.iconName} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                      {val.description}
                    </p>
                  </TactileCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Campus Facilities Snapshot with Images */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <ScrollReveal>
            <SectionHeading
              badge="Our Pichara Campus"
              title="Built Around Child Safety, Nutrition & Joy"
              subtitle="Explore our CCTV-monitored classrooms, weekly food menu, and daycare facilities."
              align="left"
              accent="teal"
            />
          </ScrollReveal>
          <Link
            href="/facilities"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#26A69A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#26A69A]/90"
          >
            <span>See All Facilities &amp; Weekly Menu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {facilities.map((fac) => {
            const styles = ACCENT_STYLES[fac.accent];
            return (
              <StaggerItem key={fac.id}>
                <TactileCard className="group h-full overflow-hidden rounded-[2rem] border border-[#2D3436]/8 bg-white shadow-editorial">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FFF1EB]">
                    <Image
                      src={fac.image}
                      alt={fac.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start gap-4 p-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText}`}
                    >
                      <IconMap name={fac.iconName} className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                        {fac.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                        {fac.description}
                      </p>
                    </div>
                  </div>
                </TactileCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Meet Our Team */}
      <section className="bg-gradient-to-b from-[#FFF1EB]/70 to-[#FFF8F5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              badge="Caring Mentors"
              title="Meet the Team Behind Kids Berry"
              subtitle="Trained Montessori educators and warm caregivers who treat every child like family."
              accent="blue"
            />
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => {
              const styles = ACCENT_STYLES[member.accent];
              return (
                <StaggerItem key={member.id}>
                  <TactileCard className="h-full">
                    <article
                      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border ${styles.border} bg-white shadow-editorial`}
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-[#FFF1EB]">
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.role}`}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span
                          className={`inline-block w-fit rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
                        >
                          {member.role}
                        </span>
                        <h3 className="mt-3 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                          {member.name}
                        </h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#78909C]">
                          <Award className="h-3.5 w-3.5 shrink-0 text-[#FF7A45]" />
                          <span>{member.experience}</span>
                        </p>
                        <p className="mt-2 text-xs font-medium text-[#26A69A]">
                          {member.qualification}
                        </p>
                        <p className="mt-3 flex-1 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                          {member.bio}
                        </p>
                        <blockquote className="mt-4 rounded-2xl bg-[#FFF8F5] p-3 text-xs italic text-[#2D3436]">
                          &ldquo;{member.quote}&rdquo;
                        </blockquote>
                      </div>
                    </article>
                  </TactileCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner
        badge="Come Say Namaste"
        title="Meet Our Educators During a Campus Visit"
        description="Drop by Pichara, Biratnagar-11 Sunday through Friday to tour our Montessori classrooms and daycare spaces."
      />
    </>
  );
}
