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
  getCmsSiteConfig,
  getPublishedAboutStory,
  getPublishedCoreValues,
  getPublishedHomeFacilities,
  getPublishedTeamMembers,
} from "@/lib/cms";
import { ACCENT_STYLES } from "@/lib/theme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us & Our Educators",
  description:
    "Discover the story, Montessori-implemented philosophy, daycare mission, core values, and educators at Kids Berry Kindergarten School in Pichara, Biratnagar-11, Nepal.",
};

export default async function AboutPage() {
  const [site, story, values, facilities, team] = await Promise.all([
    getCmsSiteConfig(),
    getPublishedAboutStory(),
    getPublishedCoreValues(),
    getPublishedHomeFacilities(),
    getPublishedTeamMembers(),
  ]);

  return (
    <>
      <PageHeader
        title={`About ${site.schoolName}`}
        subtitle={`Serving families in ${site.address.street} with ${
          site.montessoriImplemented ? "Montessori-implemented" : "early years"
        } pre-school learning${
          site.cctvMonitoring ? ", 24/7 CCTV-monitored safety" : ""
        }${site.foodProvided ? ", freshly prepared meals" : ""}${
          site.daycareAvailable ? ", and loving extended daycare" : ""
        }.`}
        currentPage="About Us"
      />

      {/* School Story & Montessori Philosophy */}
      {story && (
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
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-4 bg-white px-6 py-4">
                    <Image
                      src={site.logoPath}
                      alt={`${site.shortName} Logo`}
                      width={46}
                      height={46}
                      className="h-12 w-12 shrink-0 rounded-xl object-contain"
                    />
                    <p className="text-xs leading-relaxed text-[#78909C] sm:text-sm">
                      {story.logoCaption}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1} className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF1EB] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E91E63]">
                {story.badge}
              </span>
              <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-[#2D3436] sm:text-[2.15rem]">
                {story.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#78909C]">
                {story.description}
              </p>
              {story.subtitle && (
                <p className="mt-3 text-sm font-medium italic text-[#2D3436]">
                  &ldquo;{story.subtitle}&rdquo;
                </p>
              )}

              {/* Vision & Mission Cards */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {story.visionText && (
                  <div className="rounded-3xl border border-[#E91E63]/15 bg-[#FFF1EB] p-5">
                    <div className="flex items-center gap-2 text-[#E91E63]">
                      <Sparkles className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">
                        {story.visionTitle}
                      </h3>
                    </div>
                    <p className="mt-2 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                      {story.visionText}
                    </p>
                  </div>
                )}
                {story.missionText && (
                  <div className="rounded-3xl border border-[#26A69A]/20 bg-[#26A69A]/8 p-5">
                    <div className="flex items-center gap-2 text-[#26A69A]">
                      <HeartHandshake className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">
                        {story.missionTitle}
                      </h3>
                    </div>
                    <p className="mt-2 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                      {story.missionText}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Core Values */}
      {values.length > 0 && (
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
      )}

      {/* Campus Facilities Snapshot with Images */}
      {facilities.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <ScrollReveal>
              <SectionHeading
                badge={`Our ${site.address.city} Campus`}
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
      )}

      {/* Meet Our Team */}
      {team.length > 0 && (
        <section className="bg-gradient-to-b from-[#FFF1EB]/70 to-[#FFF8F5] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge="Caring Mentors"
                title={`Meet the Team Behind ${site.shortName}`}
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
                          {member.quote && (
                            <blockquote className="mt-4 rounded-2xl bg-[#FFF8F5] p-3 text-xs italic text-[#2D3436]">
                              &ldquo;{member.quote}&rdquo;
                            </blockquote>
                          )}
                        </div>
                      </article>
                    </TactileCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      <CtaBanner
        badge="Come Say Namaste"
        title="Meet Our Educators During a Campus Visit"
        description={`Drop by ${site.address.street} ${site.hours.days} to tour our Montessori classrooms and daycare spaces.`}
      />
    </>
  );
}
