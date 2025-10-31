"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Params = Record<string, string | undefined>;

export function useURLParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "";
  const page = searchParams.get("page") ?? "1";

  const makeHref = (next: Params) => {
    const usp = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === undefined || v === "") {
        usp.delete(k);
      } else {
        usp.set(k, v);
      }
    }
    const qs = usp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const update = (next: Params, { replace = true } = {}) => {
    const href = makeHref(next);
    if (replace) router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
  };

  return { q, status, page, makeHref, update };
}
