"use client";
import { useAuth } from "@/stores/user-store";
import React from "react";

export default function UserInfo() {
  const { user } = useAuth();
  if (!user) {
    return <div>Not logged in</div>;
  }
  return (
    <div>
      <div>Logged in as: {user.email}</div>
      <div>Username: {user.username}</div>
    </div>
  );
}
