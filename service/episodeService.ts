import type { Episode } from "@/domain/episode";
import { mapApiEpisodeToDomain } from "@/model/episode";
import { getEpisodeById } from "@/repository/episodeRepository";

export async function fetchEpisodeById(
  id: number | string,
  signal?: AbortSignal,
): Promise<Episode> {
  const apiEpisode = await getEpisodeById(id, signal);
  return mapApiEpisodeToDomain(apiEpisode);
}
