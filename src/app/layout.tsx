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
    url: "https://janani-jobs-beta.vercel.app",
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
      <body className={`${plusJakartaSans.variable} antialiased`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: '1 0 auto' }}>
          {children}
        </div>
        
        {/* Global Disclaimer Footer for Google Play Store Policy Compliance */}
        <footer style={{ background: "#f8f9fa", borderTop: "1px solid #dee2e6", padding: "15px", textAlign: "center", fontSize: "12px", color: "#6c757d", flexShrink: 0 }}>
          <div className="container">
            <strong>Disclaimer:</strong> Janani Jobs is an independent platform and <strong>does not represent any government entity</strong>. 
            All government job information provided on this app/website is collected from public domains and official government websites. 
            Official source links (e.g., .gov.in domains) are provided within each job posting for verification.
          </div>
        </footer>
      </body>
    </html>
  );
}
