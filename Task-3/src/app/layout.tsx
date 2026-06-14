import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ImpactPulse - NGO Transparency & Volunteer Platform",
  description: "Track impact in real-time. Transparent non-profit fund allocations. Match your skills with active social campaigns.",
  keywords: ["NGO", "transparency", "volunteer matching", "social impact", "charity tracker", "donation transparency"],
  authors: [{ name: "ImpactPulse Team" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ImpactPulse - NGO Transparency & Volunteer Platform",
    description: "Track impact in real-time. Transparent non-profit fund allocations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={`${firaCode.variable} ${firaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background font-body text-text-main selection:bg-brand-orange/20 selection:text-brand-orange">
        {children}
      </body>
    </html>
  );
}
