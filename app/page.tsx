import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";

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
      <PropertiesContainer search={params.search} category={params.category} />
    </section>
  );
};

export default page;
