"use client";

import { useAuth } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function EmailLoginCallback({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const { authenticateEmail, isLoading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const token = searchParams.token;

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        setError("No authentication token provided");
        return;
      }

      try {
        const response = await authenticateEmail(token);
        router.push("/main");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred during authentication"
        );
      }
    };

    authenticate();
  }, [token, authenticateEmail, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4 text-lg">Authenticating...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-lg mb-4">{error}</p>
        <Button onClick={() => router.push("/login")}>Return to Login</Button>
      </div>
    );
  }

  return null; // Render nothing while authenticating
}
