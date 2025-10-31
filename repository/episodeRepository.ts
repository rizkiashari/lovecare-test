import axios from "axios";
import type { ApiEpisodeResponse } from "@/model/episode";

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

export async function getEpisodeById(
  id: number | string,
  signal?: AbortSignal,
): Promise<ApiEpisodeResponse> {
  try {
    const res = await api.get<ApiEpisodeResponse>(`/episode/${id}`, { signal });
    return res.data;
  } catch (error: unknown) {
    if (isErrorWithStatus(error, 404)) {
      throw new Error("NOT_FOUND");
    }
    throw error;
  }
}
