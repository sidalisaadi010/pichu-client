"use client";
import {
  HeroHighlight,
  Highlight,
} from "@/components/aceternity/hero-highlight";
import Image from "next/image";
import { motion } from "framer-motion";
import UserInfo from "./UserInfo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-3">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          With insomnia, nothing&apos;s real. Everything is far away. Everything
          is a{" "}
          <Highlight className="text-black dark:text-white">
            copy, of a copy, of a copy.
          </Highlight>
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <UserInfo />
        </motion.h1>
      </HeroHighlight>
    </main>
  );
}
