export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-24 rounded bg-zinc-200/80 dark:bg-zinc-800" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="aspect-square w-full rounded-lg bg-zinc-200/70 dark:bg-zinc-800" />
          <div className="mt-3 h-6 w-1/2 rounded bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-1/3 rounded bg-zinc-200/60 dark:bg-zinc-900" />
        </div>
        <div className="md:col-span-2 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-lg bg-zinc-200/60 dark:bg-zinc-900"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
