import type { Episode } from "@/domain/episode";

export type ApiEpisodeResponse = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export function mapApiEpisodeToDomain(api: ApiEpisodeResponse): Episode {
  return {
    id: api.id,
    name: api.name,
    air_date: api.air_date,
    episode: api.episode,
    characters: api.characters,
    url: api.url,
    created: api.created,
  };
}
