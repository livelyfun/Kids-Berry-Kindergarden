import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminLoginClient } from "@/components/admin/AdminLoginClient";
import { getAdminSession, verifyAdminPath } from "@/lib/auth";
import { getCmsSiteConfig } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ adminPath: string }>;
}) {
  const { adminPath } = await params;

  if (!verifyAdminPath(adminPath)) {
    notFound();
  }

  const session = await getAdminSession();
  if (session) {
    redirect(`/${adminPath}`);
  }

  const site = await getCmsSiteConfig();

  return (
    <AdminLoginClient
      adminBasePath={`/${adminPath}`}
      schoolName={site.schoolName}
      logoPath={site.logoPath}
    />
  );
}
