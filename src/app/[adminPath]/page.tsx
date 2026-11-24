import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { getAdminSession, verifyAdminPath } from "@/lib/auth";
import { asc, desc, eq } from "drizzle-orm";
import {
  admissionApplications,
  contactInquiries,
  db,
  facilities,
  foodMenus,
  galleryImages,
  notices,
  pageSections,
  popupNotifications,
  programs,
  siteSettings,
  teamMembers,
  testimonials,
} from "@/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CMS Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ adminPath: string }>;
}) {
  const { adminPath } = await params;

  if (!verifyAdminPath(adminPath)) {
    notFound();
  }

  const session = await getAdminSession();
  if (!session) {
    redirect(`/${adminPath}/login`);
  }

  const [
    settingsRows,
    programsData,
    facilitiesData,
    galleryData,
    testimonialsData,
    teamData,
    menuData,
    sectionsData,
    inquiriesData,
    admissionsData,
    popupsData,
    noticesData,
  ] = await Promise.all([
    db.select().from(siteSettings).where(eq(siteSettings.id, "default")).limit(1),
    db
      .select()
      .from(programs)
      .orderBy(asc(programs.programType), asc(programs.sortOrder), asc(programs.createdAt)),
    db
      .select()
      .from(facilities)
      .orderBy(asc(facilities.sortOrder), asc(facilities.createdAt)),
    db
      .select()
      .from(galleryImages)
      .orderBy(asc(galleryImages.sortOrder), desc(galleryImages.createdAt)),
    db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.sortOrder), desc(testimonials.createdAt)),
    db
      .select()
      .from(teamMembers)
      .orderBy(asc(teamMembers.sortOrder), asc(teamMembers.createdAt)),
    db
      .select()
      .from(foodMenus)
      .orderBy(asc(foodMenus.sortOrder), asc(foodMenus.createdAt)),
    db
      .select()
      .from(pageSections)
      .orderBy(asc(pageSections.page), asc(pageSections.category), asc(pageSections.sortOrder)),
    db
      .select()
      .from(contactInquiries)
      .orderBy(desc(contactInquiries.createdAt)),
    db
      .select()
      .from(admissionApplications)
      .orderBy(desc(admissionApplications.createdAt)),
    db
      .select()
      .from(popupNotifications)
      .orderBy(asc(popupNotifications.sortOrder), desc(popupNotifications.createdAt)),
    db
      .select()
      .from(notices)
      .orderBy(asc(notices.sortOrder), desc(notices.createdAt)),
  ]);

  const settings = settingsRows[0] || null;

  const initialData = JSON.parse(
    JSON.stringify({
      settings,
      programs: programsData,
      facilities: facilitiesData,
      gallery: galleryData,
      testimonials: testimonialsData,
      team: teamData,
      menu: menuData,
      sections: sectionsData,
      inquiries: inquiriesData,
      admissions: admissionsData,
      popups: popupsData,
      notices: noticesData,
    }),
  );

  return (
    <AdminDashboardClient
      adminBasePath={`/${adminPath}`}
      user={{ username: session.username, name: session.name }}
      initialData={initialData}
    />
  );
}
