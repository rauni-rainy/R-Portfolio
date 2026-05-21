import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BackgroundPainting } from "@/components/background-painting";
import { CursorPhysics } from "@/components/cursor-physics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raunak Prasad | Polymorphic Studio",
  description:
    "A developer portfolio that shifts its design language for clinics, fashion houses, magazines, electronics shops, and AI labs.",
  authors: [{ name: "Raunak Prasad" }],
  creator: "Raunak Prasad"
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ebdcb9" },
    { media: "(prefers-color-scheme: dark)", color: "#08090a" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <BackgroundPainting />
          <CursorPhysics />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
