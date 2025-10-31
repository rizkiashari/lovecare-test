export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-4/3 w-full bg-zinc-200/70 dark:bg-zinc-800" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-1/2 rounded bg-zinc-200/80 dark:bg-zinc-700" />
        <div className="h-3 w-1/3 rounded bg-zinc-200/70 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
