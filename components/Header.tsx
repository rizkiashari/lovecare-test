"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? "bg-emerald-600 text-white shadow"
          : "text-zinc-700 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-transparent bg-white/60 backdrop-blur-md shadow-sm dark:bg-zinc-950/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="bg-linear-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
            Rick & Morty Explorer
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
        </nav>
      </div>
    </header>
  );
}
