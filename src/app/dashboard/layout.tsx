import AuthWrapper from "@/providers/auth-refresh.provider";
import Providers from "@/providers/query.provider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AuthWrapper>{children}</AuthWrapper>
    </Providers>
  );
}
