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
  title: "Try ProposalAI Free",
  description:
    "AI-powered proposal and outreach content for consultants, contractors, and local service businesses. Paste an RFP or describe a job, get a client-ready proposal or social post in minutes.",
  openGraph: {
    title: "Try ProposalAI Free",
    description:
      "AI-powered proposal and outreach content for consultants, contractors, and local service businesses.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Try ProposalAI Free",
    description:
      "AI-powered proposal and outreach content for consultants, contractors, and local service businesses.",
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
