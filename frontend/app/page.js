"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, TextPlugin);

export default function Home() {
const container = useRef(null);

useGSAP(
() => {
const tl = gsap.timeline();

  // Initial page entrance
  tl.from(".hero-badge", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })
    .from(
      ".hero-title",
      {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.4"
    )
    .from(
      ".hero-description",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .from(
      ".hero-buttons",
      {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".book-visual",
      {
        scale: 0.7,
        opacity: 0,
        rotation: -8,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      "-=0.9"
    );

  // Typewriter effect
  gsap.to(".typing-text", {
    duration: 1.8,
    text: "Your reading journey.",
    ease: "none",
    delay: 1.3,
  });

  // Floating book animation
  gsap.to(".book-visual", {
    y: -14,
    rotation: 2,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Floating glow animation
  gsap.to(".glow-one", {
    x: 40,
    y: -30,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".glow-two", {
    x: -30,
    y: 40,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Small floating particles
  gsap.utils.toArray(".particle").forEach((particle, index) => {
    gsap.to(particle, {
      y: index % 2 === 0 ? -25 : 25,
      x: index % 2 === 0 ? 15 : -15,
      opacity: 0.3,
      duration: 2.5 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2,
    });
  });
},
{ scope: container }

);

return ( <main
   ref={container}
   className="relative min-h-screen overflow-hidden bg-[#050816] text-white"
 >
{/* Background gradient */} 
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.15),transparent_30%)]" />

  {/* Grid background */}
  <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:60px_60px]" />

  {/* Glow effects */}
  <div className="glow-one pointer-events-none absolute left-[8%] top-[15%] h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]" />

  <div className="glow-two pointer-events-none absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-violet-600/20 blur-[130px]" />

  {/* Particles */}
  <div className="particle absolute left-[12%] top-[25%] h-2 w-2 rounded-full bg-indigo-400" />
  <div className="particle absolute left-[35%] top-[15%] h-1.5 w-1.5 rounded-full bg-violet-300" />
  <div className="particle absolute right-[30%] top-[22%] h-2 w-2 rounded-full bg-indigo-300" />
  <div className="particle absolute bottom-[25%] left-[25%] h-1.5 w-1.5 rounded-full bg-purple-300" />
  <div className="particle absolute bottom-[20%] right-[15%] h-2 w-2 rounded-full bg-indigo-400" />

  {/* Main content */}
  <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 lg:px-10">
    <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

      {/* LEFT SIDE */}
      <div className="max-w-3xl">

        {/* Badge */}
        <div className="hero-badge mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
            Personal Book Manager
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-title text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block">Your books.</span>

          <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            <span className="typing-text"></span>
            <span className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-1 animate-pulse bg-indigo-400" />
          </span>
        </h1>

        {/* Description */}
        <p className="hero-description mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
          Build your own digital library. Organize your books,
          track what you&apos;re reading, and never lose sight of
          the stories waiting for you.
        </p>

        {/* Buttons */}
        <div className="hero-buttons mt-9 flex flex-wrap gap-4">
          <Link
            href="/register"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Library
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>

            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>

          <Link
            href="/login"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-3.5 font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.06]"
          >
            Login
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Mini stats */}
        <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
          <div>
            <p className="text-2xl font-bold text-white">∞</p>
            <p className="mt-1 text-sm text-slate-500">
              Books to collect
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">01</p>
            <p className="mt-1 text-sm text-slate-500">
              Personal library
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="mt-1 text-sm text-slate-500">
              Your journey
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden h-[550px] items-center justify-center lg:flex">

        {/* Outer glow */}
        <div className="absolute h-[360px] w-[360px] rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Rotating ring */}
        <div className="absolute h-[390px] w-[390px] rounded-full border border-indigo-400/10" />

        <div className="absolute h-[330px] w-[330px] rounded-full border border-violet-400/10" />

        {/* Book visual */}
        <div className="book-visual relative z-10">

          {/* Book shadow */}
          <div className="absolute -bottom-8 left-1/2 h-10 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-2xl" />

          {/* Book */}
          <div className="relative h-[340px] w-[245px] overflow-hidden rounded-r-2xl rounded-l-md border border-white/10 bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-800 shadow-2xl shadow-indigo-900/50">

            {/* Book shine */}
            <div className="absolute -left-20 top-0 h-full w-20 rotate-12 bg-white/10 blur-xl" />

            {/* Spine */}
            <div className="absolute left-0 top-0 h-full w-5 bg-black/10" />

            {/* Book content */}
            <div className="flex h-full flex-col justify-between p-8">

              <div>
                <div className="mb-5 h-1 w-12 rounded-full bg-white/50" />

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  My Library
                </p>
              </div>

              <div>
                <div className="mb-5 text-6xl">📖</div>

                <h2 className="text-4xl font-bold leading-tight">
                  Read.
                  <br />
                  Track.
                  <br />
                  Discover.
                </h2>

                <div className="mt-7 h-px w-full bg-white/20" />

                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">
                  Your personal collection
                </p>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute -right-28 top-14 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
                📚
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Your Library
                </p>
                <p className="text-xs text-slate-500">
                  Organized & ready
                </p>
              </div>
            </div>
          </div>

          {/* Progress card */}
          <div className="absolute -bottom-8 -left-24 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl">
            <p className="text-xs text-slate-500">
              Reading progress
            </p>

            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
              </div>

              <span className="text-sm font-semibold">
                72%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom fade */}
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent" />
</main>

);
}
