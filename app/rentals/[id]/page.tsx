import {
  fetchRentalDetails,
  updateRentalAction,
  updateRentalImage,
} from "@/actions/actions";

import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import CategoriesInput from "@/components/form/CategoriesInput";
import DescriptionInput from "@/components/form/DescriptionInput";
import CountriesInput from "@/components/form/CountriesInput";
import CounterInput from "@/components/form/CounterInput";
import Amenities from "@/components/form/Amenities";
import { SubmitButton } from "@/components/form/Buttons";
import { redirect } from "next/navigation";
import { type Amenity } from "@/utils/ameneties";
import ImageInputContainer from "@/components/form/ImageInputContainer";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const property = await fetchRentalDetails(id);
  if (!property) redirect("/");

  // since we are storing amenities object as a string in our db so parsing that string back to an object
  const parsedAmenities: Amenity[] = JSON.parse(property.amenities);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        update rental property details
      </h1>
      <div className="border p-8 rounded-md flex flex-col gap-8">
        <ImageInputContainer
          name={property.name}
          text="update image"
          action={updateRentalImage}
          image={property.image}
        >
          <input type="hidden" name="id" value={property.id} />
        </ImageInputContainer>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg  font-medium">General Info</h3>
          <FormContainer action={updateRentalAction}>
            <input type="hidden" name="id" value={property.id} />
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <FormInput
                name="name"
                type="text"
                label="Name (20 limit)"
                defaultValue={property.name}
              />
              <FormInput
                name="tagline"
                type="text "
                label="Tagline (30 limit)"
                defaultValue={property.tagline}
              />
              <PriceInput defaultValue={property.price} />
              <CategoriesInput defaultValue={property.category} />
              <CountriesInput defaultValue={property.country} />
            </div>
            <DescriptionInput
              name="description"
              defaultValue={property.description}
            />
            <div className="flex flex-col mt-6 ">
              <h2 className=" text-base font-medium">Accomodation details</h2>
              <div className="flex flex-col gap-6 mt-2">
                <CounterInput detail="guests" defaultValue={property.guests} />
                <CounterInput detail="baths" defaultValue={property.baths} />
                <CounterInput
                  detail="bedrooms"
                  defaultValue={property.bedrooms}
                />
                <CounterInput detail="beds" defaultValue={property.beds} />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <h2 className=" text-base font-medium">Amenities details</h2>
              <Amenities defaultValue={parsedAmenities} />
            </div>
            <SubmitButton text="create rental" className="mt-6" />
          </FormContainer>
        </div>
      </div>
    </section>
  );
};

export default page;
