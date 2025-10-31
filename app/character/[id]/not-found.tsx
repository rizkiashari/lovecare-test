import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Character Not Found</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        The character you&apos;re looking for does not exist.
      </p>
      <Link href="/" className="text-sm text-emerald-700 hover:underline">
        ← Back to list
      </Link>
    </div>
  );
}
