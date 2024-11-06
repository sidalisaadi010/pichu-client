import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { CSPostHogProvider } from "@/providers/posthog.provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.className}>
      <head />
      <CSPostHogProvider>
        <body>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
