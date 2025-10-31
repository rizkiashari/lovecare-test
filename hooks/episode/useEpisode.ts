"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEpisodeById } from "@/service/episodeService";

export function useEpisode(id: number | string | null) {
  return useQuery({
    queryKey: ["episode", id],
    queryFn: ({ signal }) => {
      if (!id) throw new Error("Episode ID is required");
      return fetchEpisodeById(id, signal);
    },
    enabled: !!id,
  });
}
