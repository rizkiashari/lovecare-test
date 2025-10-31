import axios from "axios";

export type ApiInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
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

export type FetchCharactersParams = {
  name?: string;
  status?: string;
  limit?: number; // hard cap we will aggregate up to
  signal?: AbortSignal;
};

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 15000,
});

type ErrorWithResponse = { response?: { status?: number } };
function isErrorWithStatus(
  e: unknown,
  statusCode: number,
): e is ErrorWithResponse {
  if (typeof e !== "object" || e === null) return false;
  const resp = (e as ErrorWithResponse).response;
  return typeof resp?.status === "number" && resp.status === statusCode;
}

export async function fetchCharacters({
  name,
  status,
  limit = 50,
  signal,
}: FetchCharactersParams): Promise<{
  results: Character[];
  totalAvailable: number;
}> {
  let page = 1;
  const aggregated: Character[] = [];
  let totalAvailable = 0;

  while (aggregated.length < limit) {
    let data: ApiListResponse<Character>;
    try {
      const res = await api.get<ApiListResponse<Character>>("/character", {
        params: { name, status, page },
        signal,
      });
      data = res.data;
    } catch (error: unknown) {
      if (isErrorWithStatus(error, 404)) {
        return { results: [], totalAvailable: 0 };
      }
      throw error;
    }

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

  return { results: aggregated, totalAvailable };
}

export async function fetchCharacterById(
  id: number | string,
  signal?: AbortSignal,
): Promise<Character> {
  try {
    const res = await api.get<Character>(`/character/${id}`, { signal });
    return res.data;
  } catch (error: unknown) {
    if (isErrorWithStatus(error, 404)) {
      throw new Error("NOT_FOUND");
    }
    throw error;
  }
}
