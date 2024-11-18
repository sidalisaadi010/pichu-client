"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/stores/user-store";
import Link from "next/link";
import React from "react";

export default function LandingLoginButton() {
  const { user } = useAuth();

  if (user) {
    return (
      <Link href={"/main"}>
        <Button variant={"link"}>Go to Dashboard</Button>
      </Link>
    );
  }

  return (
    <Link href={"/login"}>
      <Button variant={"link"}>Log in</Button>
    </Link>
  );
}
