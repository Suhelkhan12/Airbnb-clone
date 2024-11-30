"use client";

import { Skeleton } from "@/components/ui/skeleton";
const loading = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50vh]" />
    </div>
  );
};

export default loading;
