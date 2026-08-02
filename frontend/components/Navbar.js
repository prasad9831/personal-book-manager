"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

import { apiRequest } from "@/lib/api";

export default function Navbar({ user }) {
const router = useRouter();
const [loading, setLoading] = useState(false);

const handleLogout = async () => {
try {
setLoading(true);

  await apiRequest("/auth/logout", {
    method: "POST",
  });

  router.push("/login");
} catch (error) {
  console.error(error);
  setLoading(false);
}

};

const handleLogoHover = (e) => {
gsap.to(e.currentTarget, {
scale: 1.03,
duration: 0.3,
ease: "power2.out",
});
};

const handleLogoLeave = (e) => {
gsap.to(e.currentTarget, {
scale: 1,
duration: 0.3,
ease: "power2.out",
});
};

const handleLogoutHover = (e) => {
gsap.to(e.currentTarget, {
y: -2,
duration: 0.25,
ease: "power2.out",
});
};

const handleLogoutLeave = (e) => {
gsap.to(e.currentTarget, {
y: 0,
duration: 0.25,
ease: "power2.out",
});
};

const userInitial = user?.name
? user.name.charAt(0).toUpperCase()
: "U";

return ( <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050816]/80 text-white shadow-lg shadow-black/10 backdrop-blur-2xl"> <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

  <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
    <button
      type="button"
      onClick={() => router.push("/dashboard")}
      onMouseEnter={handleLogoHover}
      onMouseLeave={handleLogoLeave}
      className="group flex items-center gap-3"
    >
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 shadow-lg shadow-indigo-600/20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

        <span className="relative text-xl transition-transform duration-300 group-hover:rotate-6">
          📚
        </span>
      </div>

      <div className="hidden text-left sm:block">
        <p className="text-base font-bold tracking-tight">
          Bookly
        </p>

        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
          Personal Library
        </p>
      </div>
    </button>

    <div className="flex items-center gap-3 sm:gap-5">
      <div className="hidden h-8 w-px bg-white/[0.08] sm:block" />

      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-2.5 py-2 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055]">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold shadow-md shadow-indigo-600/20">
          {userInitial}

          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111426] bg-emerald-400" />
        </div>

        <div className="hidden min-w-0 sm:block">
          <p className="max-w-[150px] truncate text-sm font-semibold text-slate-200">
            {user?.name || "User"}
          </p>

          <p className="text-[11px] text-slate-500">
            Reader
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        onMouseEnter={handleLogoutHover}
        onMouseLeave={handleLogoutLeave}
        disabled={loading}
        className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.035] px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative flex items-center gap-2">
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-white" />

              <span className="hidden sm:inline">
                Logging out...
              </span>
            </>
          ) : (
            <>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>

              <span className="hidden sm:inline">
                Logout
              </span>
            </>
          )}
        </span>
      </button>
    </div>
  </div>
</nav>
);
}
