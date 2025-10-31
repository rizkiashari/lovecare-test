export function parseCurrentPage(
  pageParam: string | undefined,
  fallback = 1,
): number {
  const parsed = Number.parseInt(pageParam ?? "", 10);
  if (Number.isNaN(parsed) || parsed < 1) return fallback;
  return parsed;
}

export function paginate<T>(
  items: T[],
  currentPage: number,
  perPage: number,
): T[] {
  const start = (currentPage - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function calcTotalPages(totalItems: number, perPage: number): number {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

// Returns a compact page range with optional ellipses represented by -1
export function buildPageRange(
  current: number,
  total: number,
  delta = 1,
): number[] {
  const range: number[] = [];
  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);
  for (let i = start; i <= end; i++) range.push(i);
  if (start > 1) {
    range.unshift(1);
    if (start > 2) range.splice(1, 0, -1);
  }
  if (end < total) {
    if (end < total - 1) range.push(-1);
    range.push(total);
  }
  return range;
}
