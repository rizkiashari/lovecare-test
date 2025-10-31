"use client";

import { Fragment } from "react";
import { useEpisode } from "@/hooks/episode/useEpisode";

type EpisodeModalProps = {
  episodeId: number | string | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function EpisodeModal({
  episodeId,
  isOpen,
  onClose,
}: EpisodeModalProps) {
  const { data: episode, isLoading, isError } = useEpisode(episodeId);

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/40 bg-white/90 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-zinc-900/90"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/20 p-6 dark:border-zinc-700/50">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Detail Episode
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              aria-label="Tutup modal"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
                    />
                  ))}
                </div>
              </div>
            ) : isError || !episode ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                <p>Episode tidak ditemukan</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Episode Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      {episode.name}
                    </h3>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {episode.episode}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/40 bg-white/50 p-4 dark:border-white/10 dark:bg-zinc-800/50">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Air Date
                      </div>
                      <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {episode.air_date}
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/40 bg-white/50 p-4 dark:border-white/10 dark:bg-zinc-800/50">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Total Characters
                      </div>
                      <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {episode.characters.length} karakter
                      </div>
                    </div>
                  </div>
                </div>

                {/* Characters List */}
                <div>
                  <h4 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Characters ({episode.characters.length})
                  </h4>
                  <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-white/40 bg-white/30 p-4 dark:border-white/10 dark:bg-zinc-800/30">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {episode.characters.map((charUrl) => {
                        const charId = charUrl.match(/\/(\d+)$/)?.[1];
                        return (
                          <a
                            key={charUrl}
                            href={`/character/${charId}`}
                            onClick={onClose}
                            className="group rounded-md border border-white/40 bg-white/50 px-3 py-2 text-sm font-medium transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:bg-zinc-800/50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
                          >
                            <span className="block truncate">
                              Character #{charId || "?"}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
