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
  title: "ProposalAI — Turn RFPs Into Proposals of Distinction",
  description:
    "AI-powered proposal generation for consultants. Paste an RFP, get a client-ready proposal in minutes, complete with your branding.",
  openGraph: {
    title: "ProposalAI",
    description:
      "AI-powered proposal generation for consultants. Paste an RFP, get a client-ready proposal in minutes.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ProposalAI",
    description:
      "AI-powered proposal generation for consultants. Paste an RFP, get a client-ready proposal in minutes.",
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
