"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "@/service/characterService";

export function useCharacter(id: number | string) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: ({ signal }) => fetchCharacterById(id, signal),
  });
}
