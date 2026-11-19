import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { getGalleryItems } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Campus Photo Gallery",
  description:
    "Explore joyful moments inside our Montessori classrooms, art corners, outdoor playground, and cultural celebrations at Kids Berry Kindergarten School, Biratnagar-11.",
};

export default function GalleryPage() {
  const galleryItems = getGalleryItems();

  return (
    <>
      <PageHeader
        title="Campus Photo Gallery"
        subtitle="Browse everyday Montessori discoveries, colorful art afternoons, sunny outdoor play, and festive celebrations at Kids Berry Kindergarten School."
        currentPage="Gallery"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <GalleryGrid items={galleryItems} />
      </section>

      <CtaBanner
        badge="Visit Us in Pichara, Biratnagar-11"
        title="Would You Like to See Our Campus in Person?"
        description="Photos capture the smiles—visiting our classrooms lets you feel the warmth, safety, and calm joy firsthand."
      />
    </>
  );
}
