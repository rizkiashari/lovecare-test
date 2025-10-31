import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="h-7 w-48 rounded bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="h-4 w-64 rounded bg-zinc-200/60 dark:bg-zinc-900" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
