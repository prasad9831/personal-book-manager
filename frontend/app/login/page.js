"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { apiRequest } from "@/lib/api";

gsap.registerPlugin(useGSAP);

export default function LoginPage() {
const router = useRouter();
const container = useRef(null);

const [form, setForm] = useState({
email: "",
password: "",
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});

if (error) {
  setError("");
}

};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setLoading(true);

try {
  await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(form),
  });

  router.push("/dashboard");
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}


};

useGSAP(
() => {

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  tl.from(".background-glow", {
    scale: 0.5,
    opacity: 0,
    duration: 1.5,
    stagger: 0.15,
  })
    .from(
      ".book-illustration",
      {
        x: -80,
        opacity: 0,
        rotation: -8,
        scale: 0.85,
        duration: 1.1,
        ease: "back.out(1.5)",
      },
      "-=1"
    )
    .from(
      ".login-card",
      {
        x: 70,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.8"
    )
    .from(
      ".form-item",
      {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.5"
    );

  gsap.to(".book-illustration", {
    y: -12,
    rotation: 1.5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".orb-one", {
    x: 80,
    y: -40,
    scale: 1.15,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".orb-two", {
    x: -60,
    y: 50,
    scale: 1.1,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".orb-three", {
    x: 40,
    y: 60,
    scale: 0.9,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.utils.toArray(".particle").forEach((particle, index) => {
    gsap.to(particle, {
      y: index % 2 === 0 ? -25 : 25,
      x: index % 2 === 0 ? 15 : -15,
      opacity: 0.25,
      duration: 2.5 + index * 0.35,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.15,
    });
  });

  gsap.to(".book-glow", {
    scale: 1.15,
    opacity: 0.6,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
},
{
  scope: container,
}


);


useEffect(() => {
const moveGlow = (e) => {
const glow = document.querySelector(".mouse-glow");

  if (!glow) return;

  gsap.to(glow, {
    x: e.clientX,
    y: e.clientY,
    duration: 1,
    ease: "power3.out",
  });
};

window.addEventListener("mousemove", moveGlow);

return () => {
  window.removeEventListener("mousemove", moveGlow);
};


}, []);

return ( <main
   ref={container}
   className="relative min-h-screen overflow-hidden bg-[#050816] text-white"
 >

  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_30%)]" />

  <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:55px_55px]" />

  <div className="background-glow orb-one absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

  <div className="background-glow orb-two absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[130px]" />

  <div className="background-glow orb-three absolute left-[45%] top-[40%] h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

  <div className="mouse-glow pointer-events-none fixed left-0 top-0 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.06] blur-3xl" />

  <div className="particle absolute left-[10%] top-[20%] h-1.5 w-1.5 rounded-full bg-indigo-400" />

  <div className="particle absolute left-[25%] top-[70%] h-2 w-2 rounded-full bg-violet-400" />

  <div className="particle absolute left-[42%] top-[15%] h-1 w-1 rounded-full bg-blue-300" />

  <div className="particle absolute right-[30%] top-[20%] h-2 w-2 rounded-full bg-indigo-300" />

  <div className="particle absolute right-[12%] top-[45%] h-1.5 w-1.5 rounded-full bg-purple-300" />

  <div className="particle absolute bottom-[15%] right-[35%] h-1 w-1 rounded-full bg-indigo-400" />


  <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-10">
    <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_480px]">

      <section className="book-illustration hidden lg:block">
        <div className="max-w-xl">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Welcome back
            </span>
          </div>

          <h2 className="text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
            Your library
            <br />

            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              is waiting.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
            Pick up where you left off. Your books,
            reading progress, and personal collection are
            just one login away.
          </p>

          <div className="relative mt-12 flex h-[260px] items-center justify-center">

            <div className="book-glow absolute h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative h-52 w-36 -rotate-6 overflow-hidden rounded-r-xl rounded-l-md border border-white/10 bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-800 shadow-2xl shadow-indigo-900/50">

              <div className="absolute left-0 top-0 h-full w-4 bg-black/15" />

              <div className="absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/10 blur-xl" />

              <div className="flex h-full flex-col justify-between p-5">

                <div>
                  <div className="h-1 w-8 rounded-full bg-white/50" />

                  <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/60">
                    Bookly
                  </p>
                </div>

                <div>
                  <div className="mb-3 text-4xl">
                    📖
                  </div>

                  <p className="text-2xl font-bold leading-tight">
                    Read.
                    <br />
                    Track.
                    <br />
                    Discover.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-lg">
                  📚
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Your library
                  </p>

                  <p className="text-xs text-slate-500">
                    Good to see you again
                  </p>
                </div>

              </div>
            </div>

            <div className="absolute bottom-3 left-6 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">

                <span className="text-lg">
                  ✨
                </span>

                <div>
                  <p className="text-xs text-slate-500">
                    Continue
                  </p>

                  <p className="text-sm font-semibold">
                    Your reading journey
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-8 border-t border-white/10 pt-6">

            <div>
              <p className="text-sm font-semibold">
                Organized
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Everything in one place
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">
                Personal
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Your library, your way
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">
                Simple
              </p>

              <p className="mt-1 text-xs text-slate-500">
                No unnecessary clutter
              </p>
            </div>

          </div>
        </div>
      </section>


      <section className="login-card relative">

        <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-fuchsia-500/20 blur-xl" />

        <div className="relative rounded-[26px] border border-white/10 bg-slate-900/75 p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">

          <div className="form-item mb-8 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl shadow-lg shadow-indigo-500/20">
                📚
              </div>

              <div>
                <p className="font-bold">
                  Bookly
                </p>

                <p className="text-xs text-slate-500">
                  Personal Book Manager
                </p>
              </div>

            </div>

            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

          </div>

          <div className="form-item">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Login to continue your reading journey.
            </p>
          </div>

          {error && (
            <div className="form-item mt-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              <span>⚠️</span>

              <p>{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            <div className="form-item">

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  ✉
                </span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>
            </div>

            <div className="form-item">

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  🔒
                </span>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>
            </div>

            <div className="form-item pt-2">

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center gap-2">

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Logging you in...
                    </>
                  ) : (
                    <>
                      Login to Library

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}

                </span>
              </button>

            </div>
          </form>

          <div className="form-item my-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-slate-600">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          <p className="form-item text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300 hover:underline"
            >
              Create one
            </Link>
          </p>

          <div className="form-item mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-600">

            <span>🔒</span>

            <span>
              Your session is securely protected.
            </span>

          </div>

        </div>
      </section>
    </div>
  </div>

  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050816] to-transparent" />
</main>

);
}
