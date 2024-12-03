import ChartsContainer from "@/components/admin/ChartsContainer";
import {
  ChartLoadingContainer,
  StatsLoadingContainer,
} from "@/components/admin/Loading";
import StatsContainer from "@/components/admin/StatsContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold capitalize">
        Stats of your application
      </h1>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </section>
  );
};

export default page;
