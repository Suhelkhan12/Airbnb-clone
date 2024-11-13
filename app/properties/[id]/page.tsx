import { fetchPropertyDetails } from "@/actions/actions";
import CalendarComponent from "@/components/properties/bookings/Calendar";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import FavoriteToggleButton from "@/components/properties/FavoriteToggleButton";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyRating from "@/components/properties/PropertyRating";
import ShareButton from "@/components/properties/ShareButton";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const property = await fetchPropertyDetails(id);

  if (!property) {
    redirect("/");
  }

  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, guests, beds };

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex sm:flex-row flex-col justify-between sm:items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{property.tagline}</h1>
        <div className="flex items-center gap-x-4 justify-end sm:mt-0 mt-6">
          <ShareButton propertyId={property.id} name={property.name} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <div className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className=" lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h2 className="text-xl font-semibold">{property.name}</h2>
            <PropertyRating inPage={true} propertyId={property.id} />
          </div>
        </div>
        <div className=" lg:col-span-4 flex flex-col items-center">
          {/* calendar */}
          <CalendarComponent />
        </div>
      </div>
    </section>
  );
};

export default page;
