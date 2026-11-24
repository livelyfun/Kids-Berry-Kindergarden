import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { NoticeBoardClient } from "@/components/sections/NoticeBoardClient";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCmsSiteConfig, getPublishedNotices } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notices, Exam Details & Offers",
  description:
    "Stay updated with the latest announcements, Montessori assessment & exam schedules, special admission offers, holidays, and downloadable PDFs from Kids Berry Kindergarten School.",
};

export default async function NoticesPage() {
  const [site, notices] = await Promise.all([
    getCmsSiteConfig(),
    getPublishedNotices(),
  ]);

  return (
    <>
      <PageHeader
        title="Notices, Exam Details & Offers"
        subtitle={`Official school circulars, assessment details, special admission offers, and downloadable circulars from ${site.schoolName}, ${site.address.street}.`}
        currentPage="Notices"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <NoticeBoardClient notices={notices} />
      </section>

      <CtaBanner
        badge="Have a Question About a Notice?"
        title="Connect With Our School Desk Anytime"
        description={`Call us or message on WhatsApp for clarifications regarding admissions, exam schedules, holidays, or special offers at ${site.schoolName}.`}
      />
    </>
  );
}
