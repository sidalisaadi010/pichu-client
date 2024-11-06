import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { PHProvider } from "@/providers/posthog.provider";
import PostHogPageView from "./PostHogPageView";

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
          <PostHogPageView />
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
