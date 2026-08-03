"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

const initialForm = {
title: "",
author: "",
tags: "",
status: "Want to Read",
};

export default function BookForm({
  onSubmit,
  editingBook,
  onCancel,
}) {
  const [form, setForm] = useState(() => ({
    title: editingBook?.title || "",
    author: editingBook?.author || "",
    tags: editingBook?.tags?.join(", ") || "",
    status: editingBook?.status || "Want to Read",
  }));
const [loading, setLoading] = useState(false);

useEffect(() => {
gsap.fromTo(
".book-form-container",
{
opacity: 0,
y: 20,
},
{
opacity: 1,
y: 0,
duration: 0.6,
ease: "power3.out",
}
);
}, [editingBook]);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

if (loading) return;

setLoading(true);

try {
  const bookData = {
    title: form.title,
    author: form.author,
    tags: form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    status: form.status,
  };

  await onSubmit(bookData);

  if (!editingBook) {
    setForm(initialForm);
  }
} finally {
  setLoading(false);
}

};

return ( <form
   onSubmit={handleSubmit}
   className="book-form-container relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-7"
 > <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

  <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

  <div className="relative">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl shadow-lg shadow-indigo-600/20">
          {editingBook ? "✏️" : "📖"}
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            {editingBook ? "Edit Book" : "Add New Book"}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {editingBook
              ? "Update your book details"
              : "Add a new book to your collection"}
          </p>
        </div>
      </div>

      <div className="hidden rounded-full border border-indigo-400/10 bg-indigo-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-300 sm:block">
        {editingBook ? "Editing" : "New Book"}
      </div>
    </div>

    <div className="mt-7 space-y-5">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Book title
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            📕
          </span>

          <input
            id="title"
            name="title"
            placeholder="Enter book title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/[0.13] focus:border-indigo-500/60 focus:bg-white/[0.055] focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="author"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Author
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            ✍️
          </span>

          <input
            id="author"
            name="author"
            placeholder="Enter author name"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/[0.13] focus:border-indigo-500/60 focus:bg-white/[0.055] focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Tags
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            🏷️
          </span>

          <input
            id="tags"
            name="tags"
            placeholder="javascript, backend, career"
            value={form.tags}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/[0.13] focus:border-indigo-500/60 focus:bg-white/[0.055] focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        <p className="mt-2 text-[11px] text-slate-600">
          Separate multiple tags using commas
        </p>
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Reading status
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500">
            📚
          </span>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] py-3.5 pl-11 pr-10 text-sm text-white outline-none transition-all duration-300 hover:border-white/[0.13] focus:border-indigo-500/60 focus:bg-white/[0.055] focus:ring-4 focus:ring-indigo-500/10"
          >
            <option
              value="Want to Read"
              className="bg-slate-900"
            >
              Want to Read
            </option>

            <option
              value="Reading"
              className="bg-slate-900"
            >
              Reading
            </option>

            <option
              value="Completed"
              className="bg-slate-900"
            >
              Completed
            </option>
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            ↓
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10">
              {form.status === "Completed"
                ? "✓"
                : form.status === "Reading"
                ? "📖"
                : "🔖"}
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Current status
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-200">
                {form.status}
              </p>
            </div>
          </div>

          <div
            className={`h-2.5 w-2.5 rounded-full ${
              form.status === "Completed"
                ? "bg-emerald-400 shadow-lg shadow-emerald-400/40"
                : form.status === "Reading"
                ? "bg-blue-400 shadow-lg shadow-blue-400/40"
                : "bg-amber-400 shadow-lg shadow-amber-400/40"
            }`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative flex items-center gap-2">
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                {editingBook
                  ? "Updating..."
                  : "Adding..."}
              </>
            ) : (
              <>
                <span>
                  {editingBook ? "Update Book" : "Add Book"}
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </span>
        </button>

        {editingBook && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3.5 font-medium text-slate-300 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  </div>
</form>
);
}
