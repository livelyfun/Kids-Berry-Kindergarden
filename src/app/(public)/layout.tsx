import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PopupNotifications } from "@/components/layout/PopupNotifications";
import {
  getCmsSiteConfig,
  getPublishedPopups,
  getPublishedPrograms,
} from "@/lib/cms";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [site, programs, popups] = await Promise.all([
    getCmsSiteConfig(),
    getPublishedPrograms(),
    getPublishedPopups(),
  ]);

  return (
    <>
      <Navbar site={site} />
      <main className="min-h-screen">{children}</main>
      <Footer site={site} programs={programs} />
      <FloatingWhatsApp site={site} />
      <PopupNotifications popups={popups} />
    </>
  );
}
