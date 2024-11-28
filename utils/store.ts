import { create } from "zustand";
import { Booking } from "@/utility/types";
import { DateRange } from "react-day-picker";

// defining types of our state
type PropertyState = {
  propertyId: string;
  price: number;
  bookings: Booking[];
  range: DateRange | undefined;
};

const defaultInitialState: PropertyState = {
  propertyId: "",
  price: 0,
  bookings: [],
  range: undefined,
};

export const usePropertyStore = create<PropertyState>()(() => {
  return {
    ...defaultInitialState,
  };
});
