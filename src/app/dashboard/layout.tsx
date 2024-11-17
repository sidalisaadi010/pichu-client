"use client";
import AuthWrapper from "@/providers/auth-refresh.provider";
import QueryProvider from "@/providers/query.provider";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import StoresProvider from "@/providers/store.provider";
import { useAuth } from "@/stores/user-store";
import Dashboardloading from "./dashboardloading";

type props = { children: React.ReactNode };

export default function layout({ children }: props) {
  return (
    <AuthWrapper>
      <App>{children}</App>
    </AuthWrapper>
  );
}

function App({ children }: props) {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading ? (
        <Dashboardloading />
      ) : (
        <>
          <QueryProvider>
            <StoresProvider initialStores={[]}>{children}</StoresProvider>
          </QueryProvider>
          <Toaster />
        </>
      )}
    </>
  );
}
