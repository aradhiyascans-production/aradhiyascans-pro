import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingFAB from "@/components/BookingFAB";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aradhiya Scans & Lab | Precision Diagnostics in Chidambaram, Tamil Nadu",
    template: "%s | Aradhiya Scans & Lab"
  },
  description: "Experience premium, accurate diagnostics in Chidambaram. Offering high-resolution CT Scan, Digital X-Ray, ECG, Echocardiography, and comprehensive laboratory diagnostics.",
  keywords: [
    "Aradhiya Scans", "Aradhiya Lab", "Aradhiya Scans Chidambaram", "Diagnostic Lab Chidambaram",
    "CT Scan Chidambaram", "X-Ray Chidambaram", "Blood Test Chidambaram", "Diagnostics Chidambaram",
    "Echocardiography Chidambaram", "Best Lab in Chidambaram", "Tamil Nadu Lab", "Aradhiya Scans and Lab"
  ],
  authors: [{ name: "Aradhiya Scans & Lab" }],
  creator: "Aradhiya Scans & Lab",
  publisher: "Aradhiya Scans & Lab",
  metadataBase: new URL("https://aradhiyascans.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Aradhiya Scans & Lab | Precision Diagnostics",
    description: "Premium medical scans, blood tests, and health checkups in Chidambaram, Tamil Nadu. Dedicated to absolute precision and patient comfort.",
    url: "https://aradhiyascans.com",
    siteName: "Aradhiya Scans & Lab",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aradhiya Scans & Lab | Precision Diagnostics",
    description: "Premium medical scans, blood tests, and health checkups in Chidambaram, Tamil Nadu.",
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-charcoal font-sans antialiased">
        <Navbar />
        <main className="flex-grow flex flex-col pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        <BookingFAB />
        <Toaster position="top-right" toastOptions={{
          style: {
            fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
            background: '#FFFFFF',
            border: '1px solid rgba(26, 26, 26, 0.05)',
            color: '#1A1A1A',
            borderRadius: '16px',
          }
        }} />
      </body>
    </html>
  );
}
