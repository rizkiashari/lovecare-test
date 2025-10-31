"use client";

import { useURLParams } from "@/hooks/useURLParams";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useState } from "react";

function SearchFiltersInner({
  q,
  status,
  update,
}: {
  q: string;
  status: string;
  update: (next: { q?: string; status?: string; page?: string }) => void;
}) {
  const [localQ, setLocalQ] = useState(q);
  const [localStatus, setLocalStatus] = useState(status);

  const debouncedUpdate = useDebouncedCallback(
    (nextQ: string, nextStatus: string) => {
      update({
        q: nextQ || undefined,
        status: nextStatus || undefined,
        page: undefined,
      });
    },
    400,
  );

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-900/40 sm:p-5">
      <form className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label htmlFor="q" className="sr-only">
            Search name
          </label>
          <input
            id="q"
            name="q"
            type="text"
            value={localQ}
            onChange={(e) => {
              const next = e.target.value;
              setLocalQ(next);
              debouncedUpdate(next, localStatus);
            }}
            placeholder="Search characters by name..."
            className="w-full rounded-md border border-transparent bg-white/70 px-3 py-2 text-sm outline-none ring-0 backdrop-blur transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/30 dark:bg-zinc-950/30"
          />
        </div>
        <div className="flex gap-2">
          <select
            name="status"
            value={localStatus}
            onChange={(e) => {
              const next = e.target.value;
              setLocalStatus(next);
              debouncedUpdate(localQ, next);
            }}
            className="w-full rounded-md border border-transparent bg-white/70 px-3 py-2 text-sm outline-none backdrop-blur focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/30 dark:bg-zinc-950/30"
          >
            <option value="">All status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          {/* Apply button removed: debounced auto-apply */}
        </div>
      </form>
    </div>
  );
}

export default function SearchFilters() {
  const { q, status, update } = useURLParams();
  return (
    <SearchFiltersInner
      key={`${q}|${status}`}
      q={q}
      status={status}
      update={update}
    />
  );
}
