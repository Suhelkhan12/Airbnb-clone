import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";
import { LoadingCards } from "@/components/properties/LoadingCards";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}) => {
  const params = await searchParams;
  return (
    <section>
      <CategoriesList search={params.search} category={params.category} />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          search={params.search}
          category={params.category}
        />
      </Suspense>
    </section>
  );
};

export default page;
