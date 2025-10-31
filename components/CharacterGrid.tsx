import type { Character } from "@/domain/character";
import CharacterCard from "./CharacterCard";

export default function CharacterGrid({
  characters,
}: {
  characters: Character[];
}) {
  if (characters.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        No characters found for this filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((c) => (
        <CharacterCard key={c.id} character={c} />
      ))}
    </div>
  );
}
