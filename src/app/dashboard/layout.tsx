import AuthWrapper from "@/providers/auth-refresh.provider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthWrapper>{children}</AuthWrapper>
    </>
  );
}
