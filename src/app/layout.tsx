// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ConvexClientProvider } from "./convex-client-provider";

export const metadata: Metadata = {
  title: "envkit – Centralized Environment Management",
  description:
    "Manage environment variables securely across projects, devices, and branches with envkit.",
  keywords: [
    "envkit",
    "environment variables",
    "dev tools",
    "configuration management",
    "env manager",
  ],
  authors: [{ name: "ellyb", url: "https://jrdv.link" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.className}`}>
      <body className="font-sans">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
