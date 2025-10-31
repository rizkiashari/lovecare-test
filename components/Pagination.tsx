"use client";

import Link from "next/link";
import { usePageRange } from "@/hooks/usePageRange";
import { useURLParams } from "@/hooks/useURLParams";

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const { makeHref } = useURLParams();

  const pages = usePageRange(currentPage, totalPages, 1);

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between gap-2 rounded-full border border-white/40 bg-white/60 px-2 py-2 backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
      <Link
        aria-disabled={currentPage <= 1}
        href={
          currentPage <= 1 ? "#" : makeHref({ page: String(currentPage - 1) })
        }
        className={`rounded-full border px-3 py-2 text-sm ${
          currentPage <= 1
            ? "cursor-not-allowed border-transparent text-zinc-400 dark:text-zinc-600"
            : "border-transparent text-zinc-700 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
        }`}
      >
        Prev
      </Link>

      <div className="flex items-center gap-1">
        {pages.map((p, idx) =>
          p === -1 ? (
            <span key={`e-${idx}`} className="px-2 text-zinc-500">
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={makeHref({ page: String(p) })}
              className={`rounded-full px-3 py-2 text-sm ${
                p === currentPage
                  ? "bg-linear-to-r from-emerald-600 to-sky-600 text-white shadow"
                  : "text-zinc-700 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
              }`}
            >
              {p}
            </Link>
          ),
        )}
      </div>

      <Link
        aria-disabled={currentPage >= totalPages}
        href={
          currentPage >= totalPages
            ? "#"
            : makeHref({ page: String(currentPage + 1) })
        }
        className={`rounded-full border px-3 py-2 text-sm ${
          currentPage >= totalPages
            ? "cursor-not-allowed border-transparent text-zinc-400 dark:text-zinc-600"
            : "border-transparent text-zinc-700 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
