import { fetchCharacters } from "@/service/characterService";
import { calcTotalPages, paginate, parseCurrentPage } from "@/lib/pagination";
import CharacterGrid from "@/components/CharacterGrid";
import SearchFilters from "@/components/SearchFilters";
import Pagination from "@/components/Pagination";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const status = typeof sp.status === "string" ? sp.status : "";
  const pageParam = typeof sp.page === "string" ? sp.page : "1";
  const currentPage = parseCurrentPage(pageParam, 1);
  const perPage = 12;

  const { results, totalAvailable } = await fetchCharacters({
    name: q,
    status,
    limit: 50,
  });

  const totalPages = calcTotalPages(totalAvailable, perPage);
  const visible = paginate(results, currentPage, perPage);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Characters</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing up to 50 items. Use search and filters.
          </p>
        </div>
      </div>

      <SearchFilters />

      <CharacterGrid characters={visible} />

      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Page {currentPage} of {totalPages}
        </p>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
