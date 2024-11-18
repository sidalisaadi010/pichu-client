import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Star, Zap, Shield, HelpCircle } from "lucide-react";
import LandingLoginButton from "./LandingLoginButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storesdz",
  description:
    "The ultimate e-commerce platform for Algerian sellers. Start, grow, and manage your online store with ease.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl">Storesdz</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <LandingLoginButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Empower Your Business with Storesdz
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The ultimate e-commerce platform for Algerian sellers. Start,
                  grow, and manage your online store with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose Storesdz?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Star className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Intuitive interface designed for Algerian sellers of all
                  technical levels.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Zap className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Fast Performance</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Optimized for speed to ensure your customers have a smooth
                  shopping experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Shield className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Secure Payments</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Integrated with trusted Algerian payment gateways for safe
                  transactions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <HelpCircle className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Local Support</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Dedicated support team that understands the Algerian market.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start Selling?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of Algerian businesses already thriving with
                  Storesdz.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Storesdz. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
