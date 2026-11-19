import type { Metadata } from "next";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TactileCard,
} from "@/components/motion/MontessoriMotion";
import { QuickContactCard } from "@/components/sections/QuickContactCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { getSiteConfig } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Contact & Visit Us",
  description:
    "Visit Kids Berry Kindergarten School at Pichara, Biratnagar-11, Nepal. View regular hours (9 AM – 3 PM), after-class care (3 PM – 5 PM), phone, email, WhatsApp, social links, and Google Map.",
};

export default function ContactPage() {
  const site = getSiteConfig();
  const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    "Namaste Kids Berry Kindergarten School! I would like to ask about Regular Classes, Daycare, or After-Class Care.",
  )}`;

  return (
    <>
      <PageHeader
        title="Contact & Visit Us"
        subtitle="Visit Kids Berry Kindergarten School at Pichara, Biratnagar-11 (Sunday – Friday) or reach our desk anytime via phone or WhatsApp."
        currentPage="Contact"
      />

      {/* Contact Info Cards */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <TactileCard className="h-full rounded-3xl border border-[#E91E63]/15 bg-white p-6 shadow-editorial">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1EB] text-[#E91E63]">
                <MapPin className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                Campus Address
              </h2>
              <p className="mt-2 text-sm font-semibold text-[#2D3436]">
                {site.address.fullAddress}
              </p>
              <p className="mt-1 text-xs text-[#78909C]">
                {site.address.landmark}
              </p>
            </TactileCard>
          </StaggerItem>

          <StaggerItem>
            <TactileCard className="h-full rounded-3xl border border-[#26A69A]/20 bg-white p-6 shadow-editorial">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#26A69A]/12 text-[#26A69A]">
                <Phone className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                Call Our Desk
              </h2>
              <div className="mt-2 space-y-1 text-sm">
                <a
                  href={`tel:${site.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="block font-semibold text-[#2D3436] hover:text-[#E91E63]"
                >
                  {site.contact.primaryPhone}
                </a>
                <a
                  href={`tel:${site.contact.secondaryPhone.replace(/\s+/g, "")}`}
                  className="block font-medium text-[#78909C] hover:text-[#E91E63]"
                >
                  {site.contact.secondaryPhone}
                </a>
              </div>
            </TactileCard>
          </StaggerItem>

          <StaggerItem>
            <TactileCard className="h-full rounded-3xl border border-[#FF7A45]/20 bg-white p-6 shadow-editorial">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1EB] text-[#FF7A45]">
                <Mail className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                Email Us
              </h2>
              <div className="mt-2 space-y-1 text-sm">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block break-all font-medium text-[#2D3436] hover:text-[#E91E63]"
                >
                  {site.contact.email}
                </a>
                <a
                  href={`mailto:${site.contact.admissionsEmail}`}
                  className="block break-all text-xs text-[#78909C] hover:text-[#E91E63]"
                >
                  {site.contact.admissionsEmail}
                </a>
              </div>
            </TactileCard>
          </StaggerItem>

          <StaggerItem>
            <TactileCard className="h-full rounded-3xl border border-[#5C6BC0]/25 bg-white p-6 shadow-editorial">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5C6BC0]/12 text-[#5C6BC0]">
                <Clock className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                School &amp; Care Hours
              </h2>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#2D3436]">
                {site.hours.days}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#26A69A]">
                Regular: {site.hours.regularClassTime}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[#E91E63]">
                After-Care &amp; Daycare: {site.hours.afterClassCareTime}
              </p>
              <p className="mt-1 text-xs text-[#78909C]">
                Closed: {site.hours.closedOn}
              </p>
            </TactileCard>
          </StaggerItem>
        </StaggerContainer>

        {/* Prominent WhatsApp + Social Connect Bar */}
        <ScrollReveal className="mt-8">
          <div className="flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-[#26A69A]/25 bg-[#FFF1EB] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-[1.35rem] font-semibold leading-[1.28] text-[#2D3436] sm:text-[1.55rem]">
                Instant WhatsApp Inquiry &amp; Social Connect
              </h2>
              <p className="mt-1 text-sm text-[#78909C]">
                Chat directly with our admissions coordinator on WhatsApp or
                follow Kids Berry Kindergarten School on Facebook &amp;
                Instagram.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#26A69A] px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:-translate-y-0.5 hover:bg-[#26A69A]/90"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={site.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#5C6BC0]/25 bg-white px-5 py-3 text-sm font-semibold text-[#2D3436] shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#5C6BC0] hover:text-[#5C6BC0]"
              >
                <FacebookIcon className="h-4 w-4 text-[#5C6BC0]" />
                <span>Facebook</span>
              </a>

              <a
                href={site.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#E91E63]/20 bg-white px-5 py-3 text-sm font-semibold text-[#2D3436] shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#E91E63] hover:text-[#E91E63]"
              >
                <InstagramIcon className="h-4 w-4 text-[#E91E63]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Google Maps Embed + Quick Contact Card */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <ScrollReveal direction="left" className="lg:col-span-7">
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#2D3436]/10 bg-white shadow-editorial">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D3436]/8 px-6 py-4">
                <div>
                  <h2 className="text-[1.2rem] font-semibold leading-[1.3] text-[#2D3436]">
                    Find Us in Pichara, Biratnagar-11
                  </h2>
                  <p className="text-xs text-[#78909C]">
                    {site.address.fullAddress}
                  </p>
                </div>
                <a
                  href={site.googleMapsLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1EB] px-4 py-2 text-xs font-semibold text-[#E91E63] transition-colors hover:bg-[#E91E63] hover:text-white"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="relative min-h-[380px] flex-1 bg-[#FFF8F5]">
                <iframe
                  title="Kids Berry Kindergarten School Location Map — Pichara, Biratnagar-11, Nepal"
                  src={site.googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[380px] w-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-5">
            <QuickContactCard />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
