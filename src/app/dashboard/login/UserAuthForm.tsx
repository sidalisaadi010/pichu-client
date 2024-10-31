"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Loader2, Mail, UserPlus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/stores/user-store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps = {}) {
  const { signup, login, user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isEmailOnly, setIsEmailOnly] = React.useState<boolean>(true);

  const { mutate: loginMutation, isPending: isLoginLoading } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: () => {
      router.push("/");
    },
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
  }

  const toggleEmailMode = () => {
    setIsEmailOnly(!isEmailOnly);
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
            {!isEmailOnly && (
              <>
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
              </>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with {isEmailOnly ? "Email" : "Email & Password"}
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
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          type="button"
          size="icon"
          disabled={isLoading}
          onClick={toggleEmailMode}
        >
          {isEmailOnly ? (
            <UserPlus className="h-4 w-4" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          <span className="sr-only">
            {isEmailOnly
              ? "Switch to Email & Password"
              : "Switch to Email Only"}
          </span>
        </Button>

        <Button
          variant="outline"
          type="button"
          size="icon"
          disabled={isLoading}
        >
          <svg role="img" viewBox="0 0 24 24" className="h-4 w-4">
            <path
              fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
          </svg>
          <span className="sr-only">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
}
