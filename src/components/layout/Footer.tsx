import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import type { ExtendedSiteConfig } from "@/lib/cms";
import type { ProgramItem } from "@/types/cms";

interface FooterProps {
  site: ExtendedSiteConfig;
  programs: ProgramItem[];
}

export function Footer({ site, programs }: FooterProps) {
  const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    `Namaste! I would like to learn more about ${site.schoolName} in ${site.address.street}.`,
  )}`;

  return (
    <footer className="relative mt-16 border-t border-[#FF7A45]/15 bg-[#FFF1EB] text-[#2D3436]">
      {/* 6-color original-logo top accent strip */}
      <div className="grid h-1.5 w-full grid-cols-6">
        <div className="bg-[#FF7A45]" />
        <div className="bg-[#FF6B81]" />
        <div className="bg-[#E91E63]" />
        <div className="bg-[#AED581]" />
        <div className="bg-[#26A69A]" />
        <div className="bg-[#5C6BC0]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#FF6B81]/20 bg-white p-1 shadow-xs">
                <Image
                  src={site.logoPath}
                  alt={`${site.schoolName} Logo`}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
                  {site.schoolName}
                </h3>
                <p className="text-xs font-semibold text-[#E91E63]">
                  {site.address.street}
                </p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#78909C]">
              {site.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={site.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.schoolName} on Facebook`}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#5C6BC0] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#5C6BC0] hover:text-white"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.schoolName} on Instagram`}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#E91E63] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#E91E63] hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with ${site.schoolName} on WhatsApp`}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#26A69A] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#26A69A] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
              Explore {site.shortName}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us & Our Team" },
                { href: "/programs", label: "Programs & Care Timings" },
                { href: "/facilities", label: "Facilities, CCTV & Food Menu" },
                { href: "/gallery", label: "Campus Photo Gallery" },
                { href: "/admissions", label: "Admissions Information" },
                { href: "/contact", label: "Contact & Directions" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[#78909C] transition-colors hover:text-[#E91E63]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A45]" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Age Programs (Dynamic Published Programs) */}
          <div>
            <h4 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
              Montessori Age Groups
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    href={`/programs#${program.slug}`}
                    className="flex items-center justify-between rounded-2xl bg-white/85 px-3.5 py-2.5 text-[#2D3436] shadow-xs transition-all hover:bg-white hover:text-[#E91E63]"
                  >
                    <span className="font-medium">{program.title}</span>
                    <span className="text-xs font-semibold text-[#26A69A]">
                      {program.ageGroup}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Timings */}
          <div>
            <h4 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
              Visit &amp; Timings
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#78909C]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E91E63]" />
                <span className="font-medium text-[#2D3436]">
                  {site.address.fullAddress}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#26A69A]" />
                <div>
                  <a
                    href={`tel:${site.contact.primaryPhone.replace(/\s+/g, "")}`}
                    className="block font-medium text-[#2D3436] hover:text-[#E91E63]"
                  >
                    {site.contact.primaryPhone}
                  </a>
                  <a
                    href={`tel:${site.contact.secondaryPhone.replace(/\s+/g, "")}`}
                    className="block hover:text-[#E91E63]"
                  >
                    {site.contact.secondaryPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FF7A45]" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all hover:text-[#E91E63]"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#5C6BC0]" />
                <div>
                  <span className="block font-semibold text-[#2D3436]">
                    {site.hours.days}
                  </span>
                  <span className="block">
                    Regular: {site.hours.regularClassTime}
                  </span>
                  <span className="block text-xs font-semibold text-[#E91E63]">
                    After-Care &amp; Daycare: {site.hours.afterClassCareTime}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#2D3436]/10 pt-6 text-center text-xs text-[#78909C] sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.schoolName}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <span>{site.schoolType} • {site.address.ward}</span>
            <Heart className="h-3.5 w-3.5 fill-[#E91E63] text-[#E91E63]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
