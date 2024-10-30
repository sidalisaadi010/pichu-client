"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
import { api } from "@/lib/api";
import { useAuth } from "@/stores/user-store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { signup, login, user } = useAuth();
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard if user is already logged in
    }
  }, [user, router]);

  const { mutate: signupMutation, isPending: isSignupLoading } = useMutation({
    mutationFn: signup,
    mutationKey: ["signup"],
    onSuccess: () => {
      router.push("/");
    },
  });

  const { mutate: loginMutation, isPending: isLoginLoading } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: () => {
      router.push("/");
    },
  });

  const isLoading = isSignupLoading || isLoginLoading;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (isLoginMode) {
      loginMutation({ email, password });
    } else {
      const userName = form.userName.value;
      signupMutation({ email, password, username: userName });
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email Or Username
            </Label>
            <Input
              id="email"
              placeholder="Email or Username"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />

            {!isLoginMode && (
              <>
                <Label className="sr-only" htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="username"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </>
            )}

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
            {isLoginMode ? "Log In" : "Sign Up"} with Email
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
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => setIsLoginMode(!isLoginMode)}
      >
        {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
      </Button>
      <p className="text-center text-sm">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="underline"
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}
