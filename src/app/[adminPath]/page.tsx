import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { getAdminSession, verifyAdminPath } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    settings,
    programs,
    facilities,
    gallery,
    testimonials,
    team,
    menu,
    sections,
    inquiries,
    popups,
  ] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
    prisma.program.findMany({
      orderBy: [{ programType: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.facility.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.galleryImage.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.testimonial.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.teamMember.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.foodMenu.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.pageSection.findMany({
      orderBy: [{ page: "asc" }, { category: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.popupNotification.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  const initialData = JSON.parse(
    JSON.stringify({
      settings,
      programs,
      facilities,
      gallery,
      testimonials,
      team,
      menu,
      sections,
      inquiries,
      popups,
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
