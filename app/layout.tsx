import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Narayan Sharma | Web Designer · AI Enthusiast · Prompt Engineer",
  description:
    "Portfolio of Narayan Sharma — Web Designer, Graphic Designer, Social Media Manager, and AI Enthusiast based in Jodhpur, Rajasthan. Specializing in modern websites, branding, and AI-powered digital experiences.",
  keywords: [
    "Narayan Sharma",
    "Web Designer",
    "AI Enthusiast",
    "Prompt Engineer",
    "Graphic Designer",
    "Social Media Manager",
    "UI/UX Design",
    "Jodhpur",
    "Rajasthan",
    "Web Development",
    "Branding",
    "Generative AI",
  ],
  authors: [{ name: "Narayan Sharma" }],
  openGraph: {
    title: "Narayan Sharma | Web Designer · AI Enthusiast · Prompt Engineer",
    description:
      "Portfolio of Narayan Sharma — Web Designer, Graphic Designer, Social Media Manager, and AI Enthusiast based in Jodhpur, Rajasthan.",
    type: "website",
    locale: "en_IN",
    siteName: "Narayan Sharma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Narayan Sharma | Web Designer · AI Enthusiast · Prompt Engineer",
    description:
      "Portfolio of Narayan Sharma — Web Designer, Graphic Designer, Social Media Manager, and AI Enthusiast from Jodhpur, Rajasthan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-background text-primary antialiased`}
      >
        <Preloader />
        <SmoothScroll>
          <NoiseOverlay />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
