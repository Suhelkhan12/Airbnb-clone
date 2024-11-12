import { Skeleton } from "../ui/skeleton";

export function LoadingCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </section>
  );
}

function SkeletonCard() {
  return (
    <div>
      <Skeleton className="h-[300px] rounded-md" />
      <Skeleton className="h-4 mt-2 w-3/4" />
      <Skeleton className="h-4 mt-2 w-1/2" />
    </div>
  );
}
