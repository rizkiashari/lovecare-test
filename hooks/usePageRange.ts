"use client";

import { useMemo } from "react";
import { buildPageRange } from "@/lib/pagination";

export function usePageRange(
  currentPage: number,
  totalPages: number,
  delta = 1,
) {
  return useMemo(
    () => buildPageRange(currentPage, totalPages, delta),
    [currentPage, totalPages, delta],
  );
}
