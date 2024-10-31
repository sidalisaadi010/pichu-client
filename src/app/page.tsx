import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, ShoppingBag, TrendingUp, Globe, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CNAMESignup from "./CNAMESignup";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <ShoppingBag className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">StoreDZ</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Launch Your E-commerce Journey in Algeria with StoreDZ
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  A comprehensive platform for Algerian sellers to easily and
                  securely sell their products online
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Start for Free
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why StoreDZ?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Rapid Growth</h3>
                <p className="text-gray-600">
                  Boost your sales and grow your business quickly with our
                  advanced tools
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Local and Global Reach
                </h3>
                <p className="text-gray-600">
                  Showcase your products to customers across Algeria and the
                  world
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Local Support</h3>
                <p className="text-gray-600">
                  Dedicated Algerian support team to assist you every step of
                  the way
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How StoreDZ Works
            </h2>
            <div className="grid gap-10 items-center lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  Simple Setup, Powerful Results
                </h3>
                <p className="text-gray-600">
                  Getting started with StoreDZ is incredibly easy. Just follow
                  these simple steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Sign up for a StoreDZ account</li>
                  <li>Choose your store name and customize your settings</li>
                  <li>Add your products and set up your inventory</li>
                  <li>Create a CNAME record that points to our servers</li>
                  <li>
                    We handle the rest - hosting, security, and optimization
                  </li>
                </ol>
                <p className="text-gray-600">
                  Once your CNAME is set up, we take care of everything else.
                  Your store will be live and ready to accept orders, with all
                  the power of StoreDZ behind it.
                </p>
              </div>
              <CNAMESignup />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Sellers Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-lg shadow">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Fatima's photo"
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Fatima Ben Ali</h3>
                <p className="text-gray-600 mb-4">
                  Traditional Products Seller
                </p>
                <Star className="h-6 w-6 text-yellow-400 mb-2" />
                <p className="text-gray-800">
                  "StoreDZ helped me expand my business beyond my city. I'm so
                  grateful!"
                </p>
              </div>
              <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-lg shadow">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Karim's photo"
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Karim Merzouk</h3>
                <p className="text-gray-600 mb-4">Electronics Store Owner</p>
                <Star className="h-6 w-6 text-yellow-400 mb-2" />
                <p className="text-gray-800">
                  "The local support is amazing. They always help me solve
                  issues quickly."
                </p>
              </div>
              <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-lg shadow">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Amina's photo"
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Amina Larabi</h3>
                <p className="text-gray-600 mb-4">Fashion Designer</p>
                <Star className="h-6 w-6 text-yellow-400 mb-2" />
                <p className="text-gray-800">
                  "The platform's marketing tools helped me reach new customers
                  every day."
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Your E-commerce Journey Today with StoreDZ
                </h2>
                <p className="mx-auto max-w-[600px] text-green-50 md:text-xl">
                  Join thousands of Algerian sellers who are succeeding on our
                  platform
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-white text-green-600 hover:bg-green-50">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-green-100">
                  By subscribing, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 StoreDZ. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
