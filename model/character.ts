import type {
  Character,
  CharacterStatus,
  CharacterGender,
} from "@/domain/character";

export type ApiInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type ApiCharacterResponse = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type ApiListResponse<T> = {
  info: ApiInfo;
  results: T[];
};

export function mapApiCharacterToDomain(api: ApiCharacterResponse): Character {
  return {
    id: api.id,
    name: api.name,
    status: api.status,
    species: api.species,
    type: api.type,
    gender: api.gender,
    origin: api.origin,
    location: api.location,
    image: api.image,
    episode: api.episode,
    url: api.url,
    created: api.created,
  };
}
