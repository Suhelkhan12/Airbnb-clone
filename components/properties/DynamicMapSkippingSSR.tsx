"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

const DynamicMapSkippingSSR = ({ countryCode }: { countryCode: string }) => {
  const DynamicMap = useMemo(
    () =>
      dynamic(() => import("@/components/properties/PropertyMap"), {
        ssr: false,
        loading: () => <Skeleton className=" h-[50vh] w-full" />,
      }),
    []
  );

  return <DynamicMap countryCode={countryCode} />;
};

export default DynamicMapSkippingSSR;
