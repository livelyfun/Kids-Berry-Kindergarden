import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TactileCard,
} from "@/components/motion/MontessoriMotion";
import { CareScheduleSwitcher } from "@/components/sections/CareScheduleSwitcher";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HomeHero } from "@/components/sections/HomeHero";
import { ParentReviewsShowcase } from "@/components/sections/ParentReviewsShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getCareTracks,
  getPrograms,
  getSiteConfig,
  getTestimonials,
} from "@/data/site-data";
import { ACCENT_STYLES } from "@/lib/theme";

export default function HomePage() {
  const site = getSiteConfig();
  const careTracks = getCareTracks();
  const programs = getPrograms();
  const testimonials = getTestimonials();

  const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    "Namaste! I would like to inquire about Kids Berry Kindergarten School in Pichara, Biratnagar-11.",
  )}`;

  return (
    <>
      {/* 1. CINEMATIC FULL-WIDTH HERO + UNIFIED TIMINGS DOCK */}
      <HomeHero whatsappUrl={whatsappUrl} />

      {/* 2. EDITORIAL MONTESSORI PROMISE SPREAD */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <ScrollReveal direction="left" className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A45]/25 bg-[#FFF1EB] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.05em] text-[#FF7A45]">
              <span className="h-2 w-2 rounded-full bg-[#FF7A45]" />
              Our Montessori Philosophy
            </span>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-[#2D3436] sm:text-[2.15rem] lg:text-[2.45rem]">
              Where Hands Explore, Hearts Feel Safe &amp; Curiosity Blossoms
            </h2>
            <p className="mt-5 text-[0.9375rem] font-normal leading-[1.72] text-[#78909C] sm:text-base">
              At{" "}
              <strong className="font-semibold text-[#2D3436]">
                Kids Berry Kindergarten School
              </strong>{" "}
              in Pichara, Biratnagar-11, we honor childhood as an unhurried,
              wonder-filled journey. Guided by Montessori principles, children
              choose tactile wooden materials, practice real-life independence,
              and build social confidence without rote academic pressure.
            </p>

            {/* Expressive Pull-Quote */}
            <blockquote className="mt-6 rounded-3xl border-l-4 border-[#E91E63] bg-[#FFF1EB]/80 p-5">
              <p className="font-[family-name:var(--font-fredoka)] text-base font-medium italic leading-[1.55] text-[#2D3436] sm:text-[1.125rem]">
                &ldquo;Help me to do it myself — when a child feels genuinely
                cared for, learning unfolds joyfully every single day.&rdquo;
              </p>
              <footer className="mt-2.5 flex items-center gap-2 text-xs font-medium text-[#E91E63]">
                <Image
                  src={site.logoPath}
                  alt="Kids Berry Seal"
                  width={22}
                  height={22}
                  className="h-5 w-5 rounded-md object-contain"
                />
                <span>Montessori Implemented Pre-school &amp; Daycare</span>
              </footer>
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-[#2D3436] px-6 py-3.5 text-[0.9375rem] font-semibold text-white shadow-warm transition-all hover:-translate-y-0.5 hover:bg-[#E91E63]"
              >
                <span>Our Story &amp; Educators</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 rounded-full border border-[#2D3436]/15 bg-white px-6 py-3.5 text-[0.9375rem] font-semibold text-[#2D3436] transition-colors hover:border-[#26A69A] hover:text-[#26A69A]"
              >
                <span>Inspect Campus Facilities</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Editorial Dual-Photo Mosaic */}
          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-6">
            <div className="relative grid grid-cols-12 gap-4 sm:gap-5">
              <div className="col-span-7 pt-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white bg-[#FFF1EB] shadow-warm-lg">
                  <Image
                    src="/images/about-story.jpg"
                    alt="Montessori teacher kneeling to guide preschoolers with wooden rings"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="col-span-5 flex flex-col gap-4 sm:gap-5">
                <div className="relative aspect-[4/4.3] overflow-hidden rounded-[2rem] border-4 border-white bg-[#FFF1EB] shadow-warm">
                  <Image
                    src="/images/gallery-art.jpg"
                    alt="Little hands painting colorful watercolor flowers at Kids Berry art table"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center rounded-[2rem] bg-[#FFF1EB] p-5 text-center shadow-xs">
                  <p className="font-[family-name:var(--font-fredoka)] text-[2rem] font-semibold leading-none text-[#E91E63]">
                    1:8
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-[#2D3436]">
                    Loving Educator–Child Ratio
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. UNIFORM 3-COLUMN PHOTO-FIRST CARE GRID */}
      <section className="bg-[#FFF1EB]/45 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              badge="Parent Peace of Mind"
              title="Thoughtful Care in Every Single Detail"
              subtitle="Verified CCTV security, nourishing weekly meals, Montessori classrooms, and flexible care until 5:00 PM."
              accent="teal"
            />
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: "Safety First",
                title: "24/7 CCTV Safe Campus",
                description:
                  "HD CCTV across classrooms & play zones with verified guardian pickup.",
                image: "/images/hero-classroom.jpg",
                imageAlt: "CCTV-monitored sunlit Montessori classroom",
                href: "/facilities",
                accent: "magenta" as const,
              },
              {
                tag: "Healthy Kitchen",
                title: "Weekly Meals + Milk & Fruits",
                description:
                  "Fresh Sunday–Friday school meals plus warm milk & seasonal fruits daily.",
                image: "/images/program-nursery.jpg",
                imageAlt: "Happy nursery learners at clean classroom tables",
                href: "/facilities#weekly-menu",
                accent: "orange" as const,
              },
              {
                tag: "Montessori Method",
                title: "Montessori Implemented",
                description:
                  "Hands-on wooden kits, phonics & math beads nurturing joyful independence.",
                image: "/images/about-story.jpg",
                imageAlt: "Teacher guiding children with Montessori materials",
                href: "/programs#learning-approach",
                accent: "blue" as const,
              },
              {
                tag: "Extended Support",
                title: "Daycare & After-Care (3–5 PM)",
                description:
                  "Seamless daycare & after-class care after 9 AM–3 PM regular hours.",
                image: "/images/program-playgroup.jpg",
                imageAlt: "Soft padded daycare sensory play space",
                href: "/programs#care-timings",
                accent: "teal" as const,
              },
              {
                tag: "Hygienic Spaces",
                title: "Clean Rooms & Play Garden",
                description:
                  "Daily sanitized rooms, RO purified water & shaded grass play garden.",
                image: "/images/gallery-outdoor.jpg",
                imageAlt: "Shaded green outdoor garden playground",
                href: "/facilities",
                accent: "olive" as const,
              },
              {
                tag: "Joyful Childhood",
                title: "Creative Arts & Celebrations",
                description:
                  "Daily painting, storytelling, music & warm Nepali cultural festivals.",
                image: "/images/gallery-festival.jpg",
                imageAlt: "Children celebrating cultural festival day at school",
                href: "/gallery",
                accent: "coral" as const,
              },
            ].map((item) => {
              const styles = ACCENT_STYLES[item.accent];
              return (
                <StaggerItem key={item.title}>
                  <TactileCard className="h-full">
                    <Link
                      href={item.href}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#2D3436]/8 bg-white shadow-warm transition-colors hover:border-[#E91E63]/25"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF1EB]">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${styles.dot}`}
                          />
                          <span
                            className={`text-xs font-medium ${styles.iconText}`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="mt-2 text-[1.15rem] font-semibold leading-[1.3] text-[#2D3436] transition-colors group-hover:text-[#E91E63]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm font-normal leading-[1.6] text-[#78909C]">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </TactileCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="mt-10 text-center">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 rounded-full border border-[#26A69A]/30 bg-white px-6 py-3 text-sm font-semibold text-[#26A69A] shadow-xs transition-all hover:bg-[#26A69A] hover:text-white"
            >
              <span>View Full Facilities &amp; Weekly Menu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CARE & TIMINGS SWITCHER */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            badge="Schedules Built for Families"
            title="Switch & Compare Regular Class, Daycare & After-Care"
            subtitle="Explore how our 9:00 AM – 3:00 PM Montessori day seamlessly pairs with Daycare and 3:00 PM – 5:00 PM After-Class Care."
            accent="magenta"
          />
        </ScrollReveal>
        <CareScheduleSwitcher tracks={careTracks} />
      </section>

      {/* 5. MONTESSORI AGE PATHWAYS */}
      <section className="bg-[#FFF1EB]/60 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <ScrollReveal>
              <SectionHeading
                badge="Ages 1.8 to 6 Years"
                title="Four Thoughtful Stages of Early Growth"
                subtitle="Every child begins at their developmental comfort level and progresses naturally into confident primary school readiness."
                align="left"
                accent="coral"
              />
            </ScrollReveal>
            <Link
              href="/programs"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E91E63]/20 bg-white px-6 py-3 text-sm font-semibold text-[#E91E63] shadow-xs transition-all hover:bg-[#E91E63] hover:text-white"
            >
              <span>Full Curriculum &amp; Daily Routine</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {programs.map((program) => {
              const styles = ACCENT_STYLES[program.accent];
              return (
                <StaggerItem key={program.id}>
                  <TactileCard className="h-full">
                    <article
                      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border ${styles.border} bg-white shadow-warm`}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF1EB]">
                        <Image
                          src={program.image}
                          alt={program.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute left-4 top-4 rounded-full px-3.5 py-1 text-xs font-semibold shadow-sm ${styles.solidBg}`}
                        >
                          {program.ageGroup}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between text-xs font-medium text-[#78909C]">
                          <span>9:00 AM – 3:00 PM</span>
                          <span className={`font-semibold ${styles.iconText}`}>
                            {program.ratio}
                          </span>
                        </div>
                        <h3 className="mt-2.5 text-[1.35rem] font-semibold leading-[1.25] text-[#2D3436]">
                          {program.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium tracking-wide text-[#78909C]">
                          {program.subtitle}
                        </p>
                        <p className="mt-3 flex-1 text-[0.9375rem] font-normal leading-[1.65] text-[#78909C]">
                          {program.shortDescription}
                        </p>

                        <Link
                          href={`/programs#${program.slug}`}
                          className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${styles.iconText} transition-opacity hover:opacity-80`}
                        >
                          <span>Explore {program.title}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  </TactileCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 6. PARENT TESTIMONIALS — SMOOTH AUTO-SCROLLING MARQUEE */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF7A45]/25 bg-[#FFF1EB] px-4 py-1.5 text-xs font-medium text-[#2D3436]">
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-3.5 w-3.5 fill-[#FF7A45] text-[#FF7A45]"
                    />
                  ))}
                </span>
                <span>5.0 Rated by Biratnagar Families</span>
              </div>

              <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-[#2D3436] sm:text-[2.15rem] lg:text-[2.45rem]">
                Loved by Parents Across Biratnagar-11
              </h2>
              <p className="mt-3 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C] sm:text-[1.0625rem]">
                Real peace of mind from families whose children learn, eat, play,
                and blossom with us every day.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ParentReviewsShowcase testimonials={testimonials} />
      </section>

      {/* 7. STRONG CONTACT / WHATSAPP CTA */}
      <CtaBanner />
    </>
  );
}
