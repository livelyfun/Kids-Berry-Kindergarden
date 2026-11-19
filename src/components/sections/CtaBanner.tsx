import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/motion/MontessoriMotion";
import { getSiteConfig } from "@/data/site-data";

interface CtaBannerProps {
  badge?: string;
  title?: string;
  description?: string;
}

export function CtaBanner({
  badge = "Admissions Open • Regular & Daycare",
  title = "Come Visit Kids Berry Kindergarten School in Pichara, Biratnagar-11",
  description = "Tour our CCTV-monitored Montessori classrooms, inspect our clean kitchen & weekly food menu, and speak with our warm educators.",
}: CtaBannerProps) {
  const site = getSiteConfig();
  const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    "Namaste! I would like to inquire about Regular Classes, Daycare, or After-Class Care at Kids Berry Kindergarten School, Pichara, Biratnagar-11.",
  )}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63] px-6 py-12 text-white shadow-warm-lg sm:px-12 sm:py-16">
          {/* Soft decorative Montessori circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 -top-14 h-60 w-60 rounded-full bg-white/15 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-10 h-52 w-52 rounded-full bg-[#AED581]/25 blur-2xl"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.05em] text-white backdrop-blur-sm">
                <CalendarCheck className="h-3.5 w-3.5" />
                {badge}
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-white sm:text-[2.25rem]">
                {title}
              </h2>
              <p className="mt-3 text-[0.9375rem] font-normal leading-[1.68] text-white/95 sm:text-base">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/95">
                <a
                  href={`tel:${site.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call {site.contact.primaryPhone}</span>
                </a>
                <span className="font-medium text-white/90">
                  • {site.address.fullAddress}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#E91E63] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFF8F5]"
              >
                <span>Contact &amp; Directions</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#26A69A] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#26A69A]/90"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
