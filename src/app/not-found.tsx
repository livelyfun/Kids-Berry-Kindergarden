import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getCmsSiteConfig, getPublishedPrograms } from "@/lib/cms";

export default async function NotFound() {
  const [site, programs] = await Promise.all([
    getCmsSiteConfig(),
    getPublishedPrograms(),
  ]);

  return (
    <>
      <Navbar site={site} />
      <main className="flex min-h-[65vh] items-center justify-center px-4 py-20">
        <div className="max-w-lg rounded-[2rem] border border-[#E91E63]/15 bg-white p-10 text-center shadow-editorial">
          <span className="inline-flex rounded-full bg-[#FFF1EB] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E91E63]">
            404 • Page Not Found
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold text-[#2D3436] sm:text-4xl">
            Oops! We Couldn&rsquo;t Find That Page
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#78909C]">
            The page you requested may have moved or does not exist. Return to{" "}
            {site.schoolName} home page to explore our Montessori classrooms and
            programs.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#E91E63] px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:-translate-y-0.5 hover:bg-[#E91E63]/90"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
      <Footer site={site} programs={programs} />
    </>
  );
}
