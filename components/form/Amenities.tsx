"use client";
import { useState } from "react";
import { amenities, Amenity } from "@/utils/ameneties";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Card, CardHeader } from "../ui/card";

type AmenitiesProps = {
  defaultValue?: Amenity[];
};

// if this default value is provided then that will be shown other wise our custom added values will be shown
const Amenities = ({ defaultValue }: AmenitiesProps) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || amenities
  );

  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return {
            ...a,
            selected: !a.selected,
          };
        }
        return a;
      });
    });
  };
  return (
    <Card>
      <input
        type="hidden"
        name={"amenities"}
        required
        //   this is done because in our database we are storing amenities as a string
        value={JSON.stringify(selectedAmenities)}
      />
      <CardHeader className="sm:p-6 p-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {selectedAmenities.map((amenity) => (
            <div key={amenity.name} className="flex  items-center space-x-2">
              <Checkbox
                id={amenity.name}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />
              <Label
                htmlFor={amenity.name}
                className=" text-xs sm:text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
              >
                {amenity.name} <amenity.icon className="sm:block hidden" />
              </Label>
            </div>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};

export default Amenities;
