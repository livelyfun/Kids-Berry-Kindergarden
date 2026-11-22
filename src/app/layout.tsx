import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getCmsSiteConfig } from "@/lib/cms";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getCmsSiteConfig();
  return {
    title: {
      default: `${site.schoolName} | ${site.schoolType} in ${site.address.ward}`,
      template: `%s | ${site.schoolName}`,
    },
    description: site.subTagline,
    keywords: [
      site.schoolName,
      "Montessori Pre-school Biratnagar",
      "Daycare in Biratnagar-11",
      "Kindergarten Pichara Biratnagar",
      "After-class care Biratnagar",
    ],
    icons: {
      icon: site.logoPath,
      apple: site.logoPath,
    },
    openGraph: {
      title: `${site.schoolName} — ${site.address.fullAddress}`,
      description: site.tagline,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-[#FFF8F5] text-[#2D3436] antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
