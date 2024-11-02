"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Collage of professional and adventure activities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />{" "}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Personal & Business Coaching for an Efficient and Fulfilling Journey
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-200 sm:text-xl">
          From business guidance to personal breakthroughs – I'll help you
          navigate the shortest and most effective path from where you are now
          to where you want to be.
        </p>

        <Button size="lg" className="mt-10 text-lg">
          Get Started with a Free Session
        </Button>
      </div>
    </section>
  );
}
