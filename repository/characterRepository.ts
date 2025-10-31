import axios from "axios";
import type { ApiCharacterResponse, ApiListResponse } from "@/model/character";

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

export type GetCharactersParams = {
  name?: string;
  status?: string;
  page?: number;
  signal?: AbortSignal;
};

export async function getCharacters(
  params: GetCharactersParams,
): Promise<ApiListResponse<ApiCharacterResponse>> {
  try {
    const res = await api.get<ApiListResponse<ApiCharacterResponse>>(
      "/character",
      {
        params: {
          name: params.name,
          status: params.status,
          page: params.page,
        },
        signal: params.signal,
      },
    );
    return res.data;
  } catch (error: unknown) {
    if (isErrorWithStatus(error, 404)) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }
    throw error;
  }
}

export async function getCharacterById(
  id: number | string,
  signal?: AbortSignal,
): Promise<ApiCharacterResponse> {
  try {
    const res = await api.get<ApiCharacterResponse>(`/character/${id}`, {
      signal,
    });
    console.log(res);

    return res.data;
  } catch (error: unknown) {
    if (isErrorWithStatus(error, 404)) {
      throw new Error("NOT_FOUND");
    }
    throw error;
  }
}
