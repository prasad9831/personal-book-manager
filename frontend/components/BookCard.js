"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BookCard({
book,
onEdit,
onDelete,
onStatusChange,
}) {
const cardRef = useRef(null);

useEffect(() => {
const card = cardRef.current;

if (!card) return;

gsap.fromTo(
  card,
  {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.5,
    ease: "power3.out",
  }
);

}, []);

const getStatusConfig = () => {
if (book.status === "Completed") {
return {
dot: "bg-emerald-400",
text: "text-emerald-300",
bg: "bg-emerald-500/10",
border: "border-emerald-500/20",
label: "Completed",
};
}

if (book.status === "Reading") {
  return {
    dot: "bg-blue-400",
    text: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    label: "Reading",
  };
}

return {
  dot: "bg-amber-400",
  text: "text-amber-300",
  bg: "bg-amber-500/10",
  border: "border-amber-500/20",
  label: "Want to Read",
};

};

const status = getStatusConfig();

return ( <div
   ref={cardRef}
   className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-indigo-950/20"
 > <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/[0.06] blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-indigo-600/[0.1]" />

  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

  <div className="relative">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-lg ring-1 ring-white/[0.06]">
          📖
        </div>

        <h3 className="truncate text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-100">
          {book.title}
        </h3>

        <p className="mt-1 truncate text-sm text-slate-500">
          by {book.author}
        </p>
      </div>

      <div className="relative shrink-0">
        <select
          value={book.status}
          onChange={(e) =>
            onStatusChange(book._id, e.target.value)
          }
          className={`cursor-pointer appearance-none rounded-xl border ${status.border} ${status.bg} px-3 py-2 pr-8 text-xs font-semibold ${status.text} outline-none transition-all duration-300 hover:brightness-125 focus:ring-4 focus:ring-indigo-500/10`}
        >
          <option
            value="Want to Read"
            className="bg-slate-900 text-white"
          >
            Want to Read
          </option>

          <option
            value="Reading"
            className="bg-slate-900 text-white"
          >
            Reading
          </option>

          <option
            value="Completed"
            className="bg-slate-900 text-white"
          >
            Completed
          </option>
        </select>

        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
          ↓
        </span>
      </div>
    </div>

    <div className="mt-5 h-px bg-white/[0.06]" />

    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Tags
        </span>

        <span className="text-[10px] text-slate-700">
          {book.tags.length}{" "}
          {book.tags.length === 1 ? "tag" : "tags"}
        </span>
      </div>

      {book.tags.length > 0 ? (
        <div className="flex min-h-[30px] flex-wrap gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-indigo-400/10 bg-indigo-500/[0.07] px-2.5 py-1 text-[11px] font-medium text-indigo-300 transition-all duration-300 hover:border-indigo-400/20 hover:bg-indigo-500/15"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-xs italic text-slate-700">
          No tags added
        </span>
      )}
    </div>

    <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5">
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${status.dot} shadow-lg`}
        />

        <span className="text-xs font-medium text-slate-400">
          {status.label}
        </span>
      </div>

      <span className="text-xs text-slate-700">
        ●
      </span>
    </div>

    <div className="mt-5 flex gap-2.5">
      <button
        onClick={() => onEdit(book)}
        className="group/edit flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-indigo-400/20 hover:bg-indigo-500/[0.08] hover:text-indigo-300"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover/edit:rotate-[-8deg]"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
        </svg>

        Edit
      </button>

      <button
        onClick={() => onDelete(book._id)}
        className="group/delete flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.03] px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-300"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover/delete:scale-110"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        </svg>

        Delete
      </button>
    </div>
  </div>
</div>

);
}
