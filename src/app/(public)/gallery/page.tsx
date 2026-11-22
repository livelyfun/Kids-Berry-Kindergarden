import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCmsSiteConfig, getPublishedGalleryItems } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Campus Photo Gallery",
  description:
    "Explore joyful moments inside our Montessori classrooms, art corners, outdoor playground, and cultural celebrations at Kids Berry Kindergarten School, Biratnagar-11.",
};

export default async function GalleryPage() {
  const [site, galleryItems] = await Promise.all([
    getCmsSiteConfig(),
    getPublishedGalleryItems(),
  ]);

  return (
    <>
      <PageHeader
        title="Campus Photo Gallery"
        subtitle={`Browse everyday Montessori discoveries, colorful art afternoons, sunny outdoor play, and festive celebrations at ${site.schoolName}.`}
        currentPage="Gallery"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {galleryItems.length > 0 ? (
          <GalleryGrid items={galleryItems} />
        ) : (
          <div className="rounded-[2rem] border border-[#2D3436]/10 bg-white p-12 text-center shadow-warm">
            <p className="text-base font-medium text-[#78909C]">
              Campus photos will appear here once published from the CMS.
            </p>
          </div>
        )}
      </section>

      <CtaBanner
        badge={`Visit Us in ${site.address.street}`}
        title="Would You Like to See Our Campus in Person?"
        description="Photos capture the smiles—visiting our classrooms lets you feel the warmth, safety, and calm joy firsthand."
      />
    </>
  );
}
