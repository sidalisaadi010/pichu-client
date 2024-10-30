"use client";
import { useAuthRefresh } from "@/hooks/useAuthRefresh";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthRefresh(); // This sets up automatic token refresh
  return <>{children}</>;
}
