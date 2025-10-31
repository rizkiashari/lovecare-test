import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/domain/character";

function StatusBadge({ status }: { status: Character["status"] }) {
  const grad =
    status === "Alive"
      ? "from-emerald-500 to-emerald-600"
      : status === "Dead"
      ? "from-rose-500 to-rose-600"
      : "from-zinc-500 to-zinc-600";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-linear-to-r ${grad} px-2 py-0.5 text-xs text-white shadow`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
      {status}
    </span>
  );
}

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/character/${character.id}`}
      className="group overflow-hidden rounded-xl border border-white/40 bg-white/70 backdrop-blur-md shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/40"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100/60 dark:bg-zinc-900/60">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-3">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {character.name}
          </h3>
          <p className="line-clamp-1 text-xs text-zinc-600 dark:text-zinc-400">
            {character.species}
          </p>
        </div>
        <StatusBadge status={character.status} />
      </div>
    </Link>
  );
}
