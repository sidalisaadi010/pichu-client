"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loading02Icon,
  GithubIcon,
  GoogleIcon,
  UserAccountIcon,
} from "hugeicons-react";
import { useMutation } from "@tanstack/react-query";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

async function signup({
  email,password,userName
}:{
  email: string;
  password: string;
  userName: string;
}){
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + "/auth/signup");
  const response = await fetch(url.toString(), {
    method: "POST",
    credentials: "include",
    
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email,password,userName }),
  });
  if (!response.ok) {
    throw new Error("Signup failed");
  }
  return response.json();
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    mutate: signupMutation,
    isPending: isLoading,

  } = useMutation({
    mutationFn: signup,
    mutationKey: ["signup"],
    onMutate: (data) => {
      console.log("🚀 ~ UserAuthForm ~ data:", data)
    }
  })
 

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const userName = form.userName.value;
    signupMutation({ email,password,userName });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />

            <Label className="sr-only" htmlFor="userName">
              Username
            </Label>
            <Input
              id="userName"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Loading02Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loading02Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loading02Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UserAccountIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Username & Password
      </Button>
    </div>
  );
}
