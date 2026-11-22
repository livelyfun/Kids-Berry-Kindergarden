"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { ExtendedSiteConfig } from "@/lib/cms";

export function FloatingWhatsApp({ site }: { site: ExtendedSiteConfig }) {
  const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    `Namaste! I would like to inquire about ${site.schoolName} in ${site.address.street}.`,
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.schoolName} on WhatsApp`}
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#26A69A] px-4 py-3 text-sm font-semibold text-white shadow-warm-lg transition-colors duration-200 hover:bg-[#26A69A]/90"
    >
      <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
        <MessageCircle className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#AED581] ring-2 ring-[#26A69A]" />
      </span>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </motion.a>
  );
}
