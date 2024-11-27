import { fetchPropertyRating } from "@/actions/actions";
import { FaStar } from "react-icons/fa";

const PropertyRating = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) => {
  const { rating, count } = await fetchPropertyRating(propertyId);

  const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-xs"}`;
  const countText = count > 1 ? "reviews" : "review";
  const countValue = `(${count}) ${inPage ? countText : ""}`;

  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {rating} {countValue}
    </span>
  );
};

export default PropertyRating;
