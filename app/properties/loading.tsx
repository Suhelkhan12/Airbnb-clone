"use client";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <Skeleton className="h-[50vh] mt-8" />
    </>
  );
};

export default loading;
