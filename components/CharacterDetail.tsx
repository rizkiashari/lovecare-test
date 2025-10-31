"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCharacter } from "@/hooks/character/useCharacter";
import EpisodeModal from "@/components/EpisodeModal";

export default function CharacterDetail({ id }: { id: string }) {
  const { data: character, isLoading, isError } = useCharacter(id);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<
    number | string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isError || (!isLoading && !character)) {
    return (
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-emerald-700 hover:underline"
        >
          ← Back to list
        </Link>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>Character tidak ditemukan</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-emerald-700 hover:underline"
        >
          ← Back to list
        </Link>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
              <div className="relative aspect-square w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
              <div className="p-4">
                <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/40 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-900/40"
                >
                  <div className="mb-2 h-4 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!character) {
    return null;
  }

  const extractEpisodeNumber = (episodeUrl: string) => {
    const match = episodeUrl.match(/\/(\d+)$/);
    return match ? match[1] : null;
  };

  const handleEpisodeClick = (episodeUrl: string) => {
    const episodeNum = extractEpisodeNumber(episodeUrl);
    if (episodeNum) {
      setSelectedEpisodeId(Number.parseInt(episodeNum, 10));
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEpisodeId(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        <span>←</span>
        <span>Kembali ke daftar</span>
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Left: Character Image & Basic Info */}
        <div className="space-y-6">
          {/* Image Card */}
          <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
            <div className="relative aspect-square w-full">
              <Image
                src={character.image}
                alt={character.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Basic Info Card */}
          <div className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
            <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {character.name}
            </h1>
            <dl className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/20 pb-2 dark:border-zinc-700/50">
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  ID
                </dt>
                <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  #{character.id}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-2 dark:border-zinc-700/50">
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Species
                </dt>
                <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {character.species || "Unknown"}
                </dd>
              </div>
              {character.type && (
                <div className="flex items-center justify-between border-b border-white/20 pb-2 dark:border-zinc-700/50">
                  <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Type
                  </dt>
                  <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {character.type}
                  </dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Gender
                </dt>
                <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {character.gender}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right: Detailed Information */}
        <div className="space-y-6">
          {/* Status & Location Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Status
              </div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {character.status}
              </div>
            </div>

            <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Lokasi
              </div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {character.location?.name || "Unknown"}
              </div>
            </div>

            <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Origin
              </div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {character.origin?.name || "Unknown"}
              </div>
            </div>

            <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Total Episodes
              </div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {character.episode.length}
              </div>
            </div>
          </div>

          {/* Episodes Section */}
          <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-900/40">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Episodes
              </h2>
              <span className="rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400">
                {character.episode.length} episode
              </span>
            </div>
            <div className="max-h-128 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent dark:scrollbar-thumb-zinc-700">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {character.episode.map((ep) => {
                  const episodeNum = extractEpisodeNumber(ep);
                  return (
                    <button
                      key={ep}
                      type="button"
                      onClick={() => handleEpisodeClick(ep)}
                      className="group rounded-lg border border-white/40 bg-white/50 px-3 py-2 text-center text-xs font-medium transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:bg-zinc-800/50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
                    >
                      <span className="block truncate">
                        #{episodeNum || "?"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode Modal */}
      <EpisodeModal
        episodeId={selectedEpisodeId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
