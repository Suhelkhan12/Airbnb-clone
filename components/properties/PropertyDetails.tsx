import { formatQuantity } from "@/utils/format";

type PropertyDetailsProps = {
  details: { baths: number; beds: number; guests: number; bedrooms: number };
};
const PropertyDetails = ({ details }: PropertyDetailsProps) => {
  const { baths, bedrooms, guests, beds } = details;
  return (
    <p className="text-md font-normal mt-2">
      <span>{formatQuantity(bedrooms, "bedroom")} &middot; </span>
      <span>{formatQuantity(beds, "bed")} &middot; </span>
      <span>{formatQuantity(guests, "guest")} &middot; </span>
      <span>{formatQuantity(baths, "bath")}</span>
    </p>
  );
};

export default PropertyDetails;
