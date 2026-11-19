import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/motion/MotionProvider";
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

export const metadata: Metadata = {
  title: {
    default:
      "Kids Berry Kindergarten School | Montessori Pre-school & Daycare in Biratnagar-11",
    template: "%s | Kids Berry Kindergarten School",
  },
  description:
    "Kids Berry Kindergarten School in Pichara, Biratnagar-11, Nepal is a Montessori-implemented pre-school and loving daycare offering regular classes (9:00 AM – 3:00 PM), after-class care (3:00 PM – 5:00 PM), CCTV security, and nutritious daily food with hot milk and fruits.",
  keywords: [
    "Kids Berry Kindergarten School",
    "Montessori Pre-school Biratnagar",
    "Daycare in Biratnagar-11",
    "Kindergarten Pichara Biratnagar",
    "After-class care Biratnagar",
  ],
  icons: {
    icon: "/images/kids-berry-logo.jpg",
    apple: "/images/kids-berry-logo.jpg",
  },
  openGraph: {
    title: "Kids Berry Kindergarten School — Pichara, Biratnagar-11, Nepal",
    description:
      "Montessori implemented pre-school + daycare with CCTV security, weekly nutritious meals, daily hot milk & fruits, and after-class care until 5:00 PM.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-[#FFF8F5] text-[#2D3436] antialiased">
        <MotionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
      </body>
    </html>
  );
}
