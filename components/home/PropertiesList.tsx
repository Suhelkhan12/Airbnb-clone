import PropertyCard from "../properties/PropertyCard";
import type { PropertyCardProps } from "@/utility/types";

const PropertiesList = ({
  properties,
}: {
  properties: PropertyCardProps[];
}) => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertiesList;
