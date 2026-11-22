import type { Metadata } from "next";
import { CheckCircle2, FileText, PhoneCall } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TactileCard,
} from "@/components/motion/MontessoriMotion";
import { AdmissionInquiryForm } from "@/components/sections/AdmissionInquiryForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { IconMap } from "@/components/ui/IconMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getCmsSiteConfig,
  getPublishedAdmissionFAQs,
  getPublishedAdmissionRequirements,
  getPublishedAdmissionSteps,
  getPublishedAgeEligibility,
  getPublishedPrograms,
} from "@/lib/cms";
import { ACCENT_STYLES } from "@/lib/theme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admissions & Campus Tour Inquiry",
  description:
    "Learn about our 4-step admission process, age eligibility, required documents, and submit a visit inquiry at Kids Berry Kindergarten School, Pichara, Biratnagar-11.",
};

export default async function AdmissionsPage() {
  const [site, steps, requirements, ageRows, faqs, programs] =
    await Promise.all([
      getCmsSiteConfig(),
      getPublishedAdmissionSteps(),
      getPublishedAdmissionRequirements(),
      getPublishedAgeEligibility(),
      getPublishedAdmissionFAQs(),
      getPublishedPrograms(),
    ]);

  return (
    <>
      <PageHeader
        title="Admissions & Campus Tour Inquiry"
        subtitle={`We keep enrollment simple, personal, and test-free—starting with a relaxed campus visit in ${site.address.street}.`}
        currentPage="Admissions"
      />

      {/* 1. 4-Step Admission Process */}
      {steps.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              badge="Simple 4-Step Journey"
              title={`How Enrollment Works at ${site.shortName}`}
              subtitle="From your first hello to your child's cheerful first day in class."
              accent="magenta"
            />
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const styles = ACCENT_STYLES[step.accent];
              return (
                <StaggerItem key={step.stepNumber + step.title}>
                  <TactileCard
                    className={`relative h-full rounded-3xl border ${styles.border} bg-white p-6 shadow-editorial`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText}`}
                      >
                        <IconMap name={step.iconName} className="h-6 w-6" />
                      </div>
                      <span
                        className={`font-[family-name:var(--font-fredoka)] text-3xl font-semibold opacity-35 ${styles.iconText}`}
                      >
                        {step.stepNumber}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] font-normal leading-[1.68] text-[#78909C]">
                      {step.description}
                    </p>
                  </TactileCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      {/* 2. Age Eligibility & Required Documents */}
      {(ageRows.length > 0 || requirements.length > 0) && (
        <section className="surface-linen py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            {ageRows.length > 0 && (
              <ScrollReveal direction="left" className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#26A69A] shadow-sm">
                  Age Eligibility
                </span>
                <h2 className="mt-4 text-[1.65rem] font-semibold leading-[1.22] tracking-[-0.01em] text-[#2D3436] sm:text-[1.95rem]">
                  Program Age Guidelines
                </h2>
                <p className="mt-2 text-sm text-[#78909C]">
                  We place children thoughtfully based on both chronological age
                  and emotional comfort.
                </p>

                <div className="mt-6 space-y-3">
                  {ageRows.map((row) => {
                    const styles = ACCENT_STYLES[row.accent];
                    return (
                      <div
                        key={row.id}
                        className="flex flex-col justify-between gap-3 rounded-2xl border border-[#2D3436]/8 bg-white p-5 shadow-xs sm:flex-row sm:items-center"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                            />
                            <h3 className="text-lg font-semibold text-[#2D3436]">
                              {row.program}
                            </h3>
                          </div>
                          <p className="mt-1 text-xs text-[#78909C]">
                            {row.cutOffNote}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:text-right">
                          <span
                            className={`rounded-full border px-3.5 py-1 text-xs font-semibold ${styles.badge}`}
                          >
                            {row.ageRange}
                          </span>
                          <span className="rounded-full bg-[#FFF8F5] px-3 py-1 text-xs font-medium text-[#78909C]">
                            {row.sessionTiming}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            )}

            {requirements.length > 0 && (
              <ScrollReveal
                direction="right"
                delay={0.1}
                className="lg:col-span-5"
              >
                <div className="h-full rounded-[2rem] border border-[#E91E63]/15 bg-white p-7 shadow-editorial">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF1EB] text-[#E91E63]">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-[1.35rem] font-semibold leading-[1.28] text-[#2D3436] sm:text-[1.55rem]">
                        Documents Required
                      </h2>
                      <p className="text-xs text-[#78909C]">
                        Bring photocopies during enrollment
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {requirements.map((req) => (
                      <li
                        key={req.id}
                        className="flex items-start gap-3 rounded-2xl bg-[#FFF8F5] p-3.5"
                      >
                        <CheckCircle2
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            req.required ? "text-[#26A69A]" : "text-[#FF7A45]"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#2D3436]">
                            {req.label}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[#78909C]">
                            {req.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* 3. Inquiry Form Section */}
      <section
        id="inquiry-form"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <ScrollReveal direction="left" className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF1EB] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E91E63]">
              Start the Conversation
            </span>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-[#2D3436] sm:text-[2.15rem]">
              Book a Friendly Tour or Ask About Seat Availability
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#78909C]">
              Share a few details in the form and our {site.address.street}{" "}
              admissions desk will reach out promptly, or call/WhatsApp us
              directly for immediate assistance.
            </p>

            <div className="mt-8 space-y-4 rounded-3xl border border-[#26A69A]/20 bg-[#26A69A]/8 p-6">
              <div className="flex items-start gap-3">
                <PhoneCall className="mt-0.5 h-5 w-5 text-[#26A69A]" />
                <div>
                  <p className="text-sm font-semibold text-[#2D3436]">
                    Direct Admissions Desk
                  </p>
                  <p className="mt-0.5 text-sm text-[#78909C]">
                    {site.contact.primaryPhone} / {site.contact.secondaryPhone}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#26A69A]">
                    {site.hours.days} • Regular {site.hours.regularClassTime} •
                    Care {site.hours.afterClassCareTime}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-7">
            <AdmissionInquiryForm
              programs={programs}
              whatsappNumber={site.contact.whatsappNumber}
              schoolName={site.schoolName}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Interactive Parent FAQs Accordion */}
      {faqs.length > 0 && (
        <section className="bg-[#FFF1EB]/60 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge="Common Questions"
                title="Helpful Answers for New Parents"
                accent="teal"
              />
            </ScrollReveal>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      )}
    </>
  );
}
