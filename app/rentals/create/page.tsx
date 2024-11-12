import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createPropertyAction } from "@/actions/actions";
import { SubmitButton } from "@/components/form/Buttons";
import PriceInput from "@/components/form/PriceInput";
import CategoriesInput from "@/components/form/CategoriesInput";
import DescriptionInput from "@/components/form/DescriptionInput";
import ImageInput from "@/components/form/ImageInput";
import CountriesInput from "@/components/form/CountriesInput";
import CounterInput from "@/components/form/CounterInput";
import Amenities from "@/components/form/Amenities";

const page = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create property
      </h1>
      <div className="border p-6 sm:p-8 rounded-md">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limit)"
              defaultValue="Cabin in Latvia"
            />
            <FormInput
              name="tagline"
              type="text "
              label="Tagline (30 limit)"
              defaultValue="Dream Getaway Awaits You Here!"
            />
            <PriceInput />
            <CategoriesInput />
          </div>
          <DescriptionInput name="description" />
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <CountriesInput />
            <ImageInput />
          </div>
          <div className="flex flex-col mt-6 ">
            <h2 className=" text-base font-medium">Accomodation details</h2>
            <div className="flex flex-col gap-6 mt-2">
              <CounterInput detail="guests" />
              <CounterInput detail="baths" />
              <CounterInput detail="bedrooms" />
              <CounterInput detail="beds" />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <h2 className=" text-base font-medium">Amenities details</h2>
            <Amenities />
          </div>
          <SubmitButton text="create rental" className="mt-6" />
        </FormContainer>
      </div>
    </section>
  );
};

export default page;
