import AuthWrapper from "@/providers/auth-refresh.provider";
import Providers from "@/providers/query.provider";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <Providers>{children}</Providers>
      <Toaster />
    </AuthWrapper>
  );
}
