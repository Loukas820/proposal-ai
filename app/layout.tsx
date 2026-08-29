import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Try Daybase Free",
  description:
    "AI-powered tools to run a service business day to day: calls, appointments, job and delivery updates, quotes, proposals, contracts, and client outreach — built for consultants, contractors, and local service businesses.",
  openGraph: {
    title: "Try Daybase Free",
    description:
      "AI-powered tools to run a service business day to day: calls, appointments, jobs, deliveries, quotes, proposals, and client outreach.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Try Daybase Free",
    description:
      "AI-powered tools to run a service business day to day: calls, appointments, jobs, deliveries, quotes, proposals, and client outreach.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
