"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

import { apiRequest } from "@/lib/api";

import Navbar from "@/components/Navbar";
import BookForm from "@/components/BookForm";
import BookCard from "@/components/BookCard";

export default function DashboardPage() {
  const router = useRouter();

  const dashboardRef = useRef(null);
  const statsRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);

  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    wantToRead: 0,
    reading: 0,
    completed: 0,
  });

  const [editingBook, setEditingBook] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const data = await apiRequest("/auth/me");
      setUser(data.user);
    } catch (error) {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (editingBook && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingBook]);

  const loadBooks = async () => {
    try {
      let endpoint = "/books";

      const params = new URLSearchParams();

      if (statusFilter !== "") {
        params.append("status", statusFilter);
      }

      if (tagFilter.trim() !== "") {
        params.append("tag", tagFilter.trim());
      }

      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const data = await apiRequest(endpoint);

      setBooks(data.books || []);
    } catch (error) {
      console.error("LOAD BOOKS ERROR:", error);
    }
  };

  const loadStats = async () => {
    try {
      const data = await apiRequest("/books/stats");

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadUser();
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        await loadBooks();
        await loadStats();
      };

      loadData();
    }
  }, [user, statusFilter, tagFilter]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          ".dashboard-header",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
        )
        .fromTo(
          ".stat-card",
          {
            opacity: 0,
            y: 30,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .fromTo(
          ".dashboard-section",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.25",
        );
    }, dashboardRef);

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    if (!contentRef.current || loading) return;

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0.65,
        y: 8,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      },
    );
  }, [books, statusFilter, tagFilter, loading]);

  const handleSubmit = async (bookData) => {
    try {

      if (editingBook) {
        await apiRequest(`/books/${editingBook._id}`, {
          method: "PUT",
          body: JSON.stringify(bookData),
        });

        setEditingBook(null);
      } else {
        await apiRequest("/books", {
          method: "POST",
          body: JSON.stringify(bookData),
        });
      }

      await loadBooks();
      await loadStats();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/books/${id}`, {
        method: "DELETE",
      });

      await loadBooks();
      await loadStats();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await apiRequest(`/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          status,
        }),
      });

      await loadBooks();
      await loadStats();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] text-white">
        {" "}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-600/20">
            <span className="text-2xl">📚</span>

            <span className="absolute inset-0 animate-ping rounded-2xl border border-indigo-400/20" />
          </div>

          <div className="text-center">
            <p className="font-semibold text-white">Opening your library</p>

            <p className="mt-1 text-sm text-slate-500">
              Getting everything ready...
            </p>
          </div>

          <div className="h-1 w-32 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={dashboardRef}
      className="relative min-h-screen overflow-hidden bg-[#050816] text-white"
    >
      {" "}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {" "}
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute -right-40 top-[30%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 left-[40%] h-[400px] w-[400px] rounded-full bg-blue-600/[0.04] blur-[120px]" />
      </div>
      <Navbar user={user} />
      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="dashboard-header flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/10 bg-indigo-500/[0.07] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
                Your personal library
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {user?.name?.split(" ")[0] || "Reader"}
              </span>
              .
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Keep track of what you&apos;re reading, what you want to read, and
              everything you&apos;ve already completed.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 backdrop-blur-xl md:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Collection
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {stats.total}
              <span className="ml-1 text-sm font-normal text-slate-500">
                books
              </span>
            </p>
          </div>
        </section>

        <section
          ref={statsRef}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            title="Total Books"
            value={stats.total}
            icon="📚"
            description="In your collection"
            accent="from-indigo-500 to-violet-600"
          />

          <StatCard
            title="Want to Read"
            value={stats.wantToRead}
            icon="🔖"
            description="Waiting for you"
            accent="from-amber-400 to-orange-500"
          />

          <StatCard
            title="Reading"
            value={stats.reading}
            icon="📖"
            description="Currently reading"
            accent="from-blue-400 to-cyan-500"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            icon="✓"
            description="Books you've finished"
            accent="from-emerald-400 to-teal-500"
          />
        </section>

        <section className="dashboard-section mt-8">
          <div ref={formRef}>
            <BookForm
              key={editingBook?._id || "new"}
              onSubmit={handleSubmit}
              editingBook={editingBook}
              onCancel={() => setEditingBook(null)}
            />
          </div>
        </section>

        <section className="dashboard-section mt-8 rounded-[26px] border border-white/[0.07] bg-slate-900/50 p-5 backdrop-blur-2xl sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔎</span>

                <h2 className="text-base font-semibold text-white">
                  Find a book
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-600">
                Filter your collection by status or tag.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="relative sm:min-w-[210px]">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-600">
                  ◉
                </span>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] py-3 pl-10 pr-9 text-sm text-slate-300 outline-none transition-all duration-300 hover:border-white/[0.13] focus:border-indigo-500/50 focus:bg-white/[0.055] focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="" className="bg-slate-900">
                    All Statuses
                  </option>

                  <option value="Want to Read" className="bg-slate-900">
                    Want to Read
                  </option>

                  <option value="Reading" className="bg-slate-900">
                    Reading
                  </option>

                  <option value="Completed" className="bg-slate-900">
                    Completed
                  </option>
                </select>

                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-600">
                  ↓
                </span>
              </div>

              <div className="relative sm:min-w-[240px]">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-600">
                  #
                </span>

                <input
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  placeholder="Filter by tag"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/[0.13] focus:border-indigo-500/50 focus:bg-white/[0.055] focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>
          </div>
        </section>

        <section ref={contentRef} className="dashboard-section mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  My Books
                </h2>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-xs font-semibold text-slate-400">
                  {books.length}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-600">
                Your personal reading collection
              </p>
            </div>

            {books.length > 0 && (
              <span className="hidden text-xs text-slate-600 sm:block">
                {books.length === 1
                  ? "1 book found"
                  : `${books.length} books found`}
              </span>
            )}
          </div>

          {books.length === 0 ? (
            <div className="relative overflow-hidden rounded-[26px] border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-16 text-center">
              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/[0.05] blur-3xl" />

              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-2xl shadow-xl">
                📚
              </div>

              <h3 className="relative mt-5 text-lg font-semibold text-slate-200">
                Your shelf is waiting
              </h3>

              <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
                {statusFilter || tagFilter
                  ? "No books match your current filters. Try changing your search."
                  : "Add your first book above and start building your personal library."}
              </p>

              {(statusFilter || tagFilter) && (
                <button
                  onClick={() => {
                    setStatusFilter("");
                    setTagFilter("");
                  }}
                  className="relative mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-300 transition-all duration-300 hover:bg-indigo-500/15"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onEdit={setEditingBook}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-white/[0.06] py-7 text-center">
          <p className="text-xs text-slate-700">
            Built for readers who love their books.
          </p>
        </footer>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </main>
  );
}

function StatCard({ title, value, icon, description, accent }) {
  return (
    <div className="stat-card group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-slate-900/80">
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${accent} opacity-[0.07] blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.12]`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-lg shadow-lg`}
        >
          {icon}
        </div>

        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700">
          Status
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <p className="mt-1 text-3xl font-bold tracking-tight text-white">
          {value}
        </p>

        <p className="mt-1 text-xs text-slate-700">{description}</p>
      </div>
    </div>
  );
}
