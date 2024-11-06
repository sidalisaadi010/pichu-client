import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { PHProvider } from "@/providers/posthog.provider";
import PostHogPageView from "./PostHogPageView";
import { Suspense } from "react";

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
      <PHProvider>
        <body>
          <Suspense>
            <PostHogPageView />
          </Suspense>
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
