import Image from "next/image";
import Link from "next/link";
import CountryFlagAndName from "./CountryFlagAndName";
import PropertyRating from "./PropertyRating";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { PropertyCardProps } from "@/utility/types";
import { formatCurrency } from "@/utils/format";
import { Card, CardHeader } from "../ui/card";

const PropertyCard = ({ property }: { property: PropertyCardProps }) => {
  const { name, image, price } = property;
  const { country, id: propertyId, tagline } = property;

  return (
    <Card>
      <CardHeader className="p-3 hover:shadow-lg duration-300">
        <article className="group relative">
          <Link href={`/properties/${propertyId}`}>
            <div className="relative w-full overflow-hidden rounded-md h-[15rem]">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className="rounded-md  transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold mt-1">
                {name.substring(0, 30)}
              </h3>
              {/* property rating */}
            </div>
            <p className="text-sm mt-1 text-muted-foreground ">
              {tagline.substring(0, 40)}
            </p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm mt-1 ">
                <span className="font-semibold">{formatCurrency(price)} </span>
                night
              </p>
              {/* country and flag */}
            </div>
          </Link>
          <div className="absolute top-5 right-5 z-5">
            {/* favorite toggle button */}
          </div>
        </article>
      </CardHeader>
    </Card>
  );
};

export default PropertyCard;
