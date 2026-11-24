"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, MessageCircle, Sparkles, X } from "lucide-react";
import type { ExtendedSiteConfig } from "@/lib/cms";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/notices", label: "Notices" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ site }: { site: ExtendedSiteConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    `Namaste! I would like to inquire about ${site.schoolName} in ${site.address.street}.`,
  )}`;

  const nameParts = site.shortName.split(" ");
  const firstWord = nameParts[0] || "Kids";
  const restWords = nameParts.slice(1).join(" ") || "Berry";

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Main Navigation"
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-[#FF7A45]/15 bg-[#FFF8F5]/95 shadow-editorial backdrop-blur-xl"
            : "border-b border-[#E91E63]/10 bg-[#FFF8F5]/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Brand Lockup */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#FF6B81]/20 bg-white p-0.5 shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Image
                src={site.logoPath}
                alt={`${site.schoolName} Logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <span className="block font-[family-name:var(--font-fredoka)] text-lg font-semibold tracking-tight text-[#E91E63] sm:text-xl">
                {firstWord} <span className="text-[#5C6BC0]">{restWords}</span>
              </span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
                {site.montessoriImplemented ? "Montessori" : "Preschool"}{" "}
                {site.daycareAvailable ? "& Daycare" : ""} •{" "}
                {site.address.ward}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Motion Layout Pill */}
          <div className="hidden items-center gap-1 rounded-full border border-[#FF7A45]/15 bg-white/80 p-1 shadow-xs lg:flex">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#E91E63]"
                      : "text-[#2D3436] hover:text-[#E91E63]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-[#FFF1EB] shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/admissions#admission-form"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63] px-5 py-2.5 text-sm font-semibold text-white shadow-warm transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95 sm:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              <span>Admission</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E91E63]/15 bg-white text-[#2D3436] transition-colors hover:bg-[#FFF1EB] hover:text-[#E91E63] lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Animated Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-[#FF7A45]/15 bg-[#FFF8F5] shadow-lg lg:hidden"
            >
              <div className="px-4 pb-6 pt-4">
                <div className="flex flex-col space-y-1.5">
                  {NAV_LINKS.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? "bg-[#FFF1EB] font-semibold text-[#E91E63]"
                            : "text-[#2D3436] hover:bg-[#FFF1EB]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-[#FF7A45]/15 pt-4 sm:grid-cols-2">
                  <Link
                    href="/admissions#admission-form"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63] px-4 py-3 text-sm font-semibold text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Admission</span>
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#26A69A] px-4 py-3 text-sm font-semibold text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Admissions</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
