"use client";
import AuthWrapper from "@/providers/auth-refresh.provider";
import QueryProvider from "@/providers/query.provider";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import StoresProvider from "@/providers/store.provider";
import { useAuth } from "@/stores/user-store";
import Dashboardloading from "./dashboardloading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type props = { children: React.ReactNode };

export default function layout({ children }: props) {
  return (
    <AuthWrapper>
      <App>{children}</App>
    </AuthWrapper>
  );
}

function App({ children }: props) {
  const { isLoading, user } = useAuth();
  return (
    <>
      <QueryProvider>
        {isLoading && !user ? (
          <Dashboardloading />
        ) : !isLoading && user ? (
          <>
            <StoresProvider initialStores={[]}>{children}</StoresProvider>
            <Toaster />
          </>
        ) : (
          <NotLoggedIn>{children}</NotLoggedIn>
        )}
      </QueryProvider>
    </>
  );
}

function NotLoggedIn({ children }: { children?: React.ReactNode }) {
  const path = usePathname();
  const isLoginPage = path === "/login";
  const isPathStartsWithAuth = path.startsWith("/auth");

  if (isLoginPage || isPathStartsWithAuth) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Not Logged In</h1>
      <p className="text-lg mb-4">You must be logged in to access this page</p>
      <Link href={"/login"}>
        <Button>Return to Login</Button>
      </Link>
    </div>
  );
}
