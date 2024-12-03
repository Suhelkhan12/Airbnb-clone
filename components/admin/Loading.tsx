import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function StatsLoadingContainer() {
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 mt-8">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
}
export function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="rounded w-full h-16" />
      </CardHeader>
    </Card>
  );
}

export function ChartLoadingContainer() {
  return <Skeleton className="w-full h-64 rounded" />;
}
