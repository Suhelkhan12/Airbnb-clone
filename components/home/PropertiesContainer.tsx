import { fetchProperties } from "@/actions/actions";
import PropertiesList from "./PropertiesList";
import EmptyList from "./EmptyList";
import type { PropertyCardProps } from "@/utility/types";

const PropertiesContainer = async ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  console.log({
    search,
    category,
  });
  const properties: PropertyCardProps[] = await fetchProperties({
    search,
    category,
  });

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No results."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return <PropertiesList properties={properties} />;
};

export default PropertiesContainer;
