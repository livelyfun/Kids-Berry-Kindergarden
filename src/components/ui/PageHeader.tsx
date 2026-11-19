import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  currentPage: string;
}

export function PageHeader({ title, subtitle, currentPage }: PageHeaderProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 sm:pb-6 sm:pt-10 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs font-medium text-[#78909C]"
      >
        <Link href="/" className="transition-colors hover:text-[#E91E63]">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[#2D3436]">{currentPage}</span>
      </nav>

      <h1 className="mt-2.5 text-[1.85rem] font-semibold leading-[1.18] tracking-[-0.015em] text-[#2D3436] sm:text-[2.35rem]">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-[0.9375rem] font-normal leading-[1.65] text-[#78909C] sm:text-base">
        {subtitle}
      </p>

      <div className="mt-6 border-b border-[#2D3436]/8" />
    </section>
  );
}
