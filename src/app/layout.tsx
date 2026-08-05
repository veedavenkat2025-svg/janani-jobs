export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Janani Jobs - Premium Sarkari & Private Jobs",
  description: "India's most premium platform for Government Exams, Private Sector remote jobs, Free Mock Tests, and AI Resume Building.",
  keywords: ["Sarkari Jobs", "Private Remote Jobs", "Government Jobs India", "Mock Tests", "UPSC", "SSC", "IBPS", "AI Resume"],
  manifest: "/manifest.json",
  themeColor: "#00ff94",
  openGraph: {
    title: "Janani Jobs - Your Career Journey Begins Here",
    description: "Get alerts for Sarkari Naukri and Private Jobs, take free Mock Tests, and generate an AI Resume instantly.",
    url: "https://janani-jobs.vercel.app",
    siteName: "Janani Jobs",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Janani Jobs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <Navbar />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
