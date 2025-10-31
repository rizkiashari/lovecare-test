import type { CharacterFilters, CharacterListResult } from "@/domain/character";
import type { ApiCharacterResponse } from "@/model/character";
import { mapApiCharacterToDomain } from "@/model/character";
import {
  getCharacters,
  getCharacterById,
} from "@/repository/characterRepository";

export type FetchCharactersParams = CharacterFilters & {
  limit?: number;
  signal?: AbortSignal;
};

export async function fetchCharacters(
  params: FetchCharactersParams,
): Promise<CharacterListResult> {
  let page = 1;
  const aggregated: ApiCharacterResponse[] = [];
  let totalAvailable = 0;
  const limit = params.limit ?? 50;

  while (aggregated.length < limit) {
    const data = await getCharacters({
      name: params.name,
      status: params.status,
      page,
      signal: params.signal,
    });

    if (page === 1) {
      totalAvailable = Math.min(limit, data.info.count);
    }

    for (const c of data.results) {
      if (aggregated.length < limit) {
        aggregated.push(c);
      } else {
        break;
      }
    }

    if (!data.info.next) break;
    page += 1;
  }

  return {
    results: aggregated.map(mapApiCharacterToDomain),
    totalAvailable,
  };
}

export async function fetchCharacterById(
  id: number | string,
  signal?: AbortSignal,
) {
  const apiCharacter = await getCharacterById(id, signal);
  return mapApiCharacterToDomain(apiCharacter);
}
