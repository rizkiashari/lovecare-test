"use client";

import { useQuery } from "@tanstack/react-query";
import type { CharacterFilters } from "@/domain/character";
import { fetchCharacters } from "@/service/characterService";

export function useCharacters(filters: CharacterFilters & { limit?: number }) {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: ({ signal }) => fetchCharacters({ ...filters, signal }),
  });
}
