import { fetchPropertyDetails, findExistingReview } from "@/actions/actions";
import { auth } from "@clerk/nextjs/server";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import FavoriteToggleButton from "@/components/properties/FavoriteToggleButton";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyRating from "@/components/properties/PropertyRating";
import ShareButton from "@/components/properties/ShareButton";
import { redirect } from "next/navigation";
import PropertyDetails from "@/components/properties/PropertyDetails";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import Description from "@/components/properties/Description";
import Amenities from "@/components/properties/Amenities";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import DynamicBookingWrapper from "@/components/booking/DynamicBookingWrapper";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const property = await fetchPropertyDetails(id);

  if (!property) {
    redirect("/");
  }

  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, guests, beds };

  const { profileImage, firstName: name } = property.Profile;
  const profile = { profileImage, name };

  // to maintain a relation between user and profile
  const { userId } = await auth();
  const isNotOwner = property.Profile.clerkId !== userId;

  // if user is logged in and he/she is not the owner of property then we fetch the reviews assosiated with user
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));

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
          <PropertyDetails details={details} />
          <UserInfo profile={profile} />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          {/* <DynamicMapSkippingSSR countryCode={property.country} /> */}
        </div>
        <div className=" lg:col-span-4 flex flex-col items-center">
          {/* calendar */}
          <DynamicBookingWrapper
            propertyId={property.id}
            price={property.price}
            bookings={property.bookings}
          />
        </div>
      </div>

      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
      <PropertyReviews propertyId={property.id} />
    </section>
  );
};

export default page;
