"use client";
import { usePropertyStore } from "@/utils/store";
import { Booking } from "@/utility/types";
import BookingCalendar from "./BookingCalendar";
import { useEffect } from "react";
import BookingContainer from "./BookingContainer";

type BookingWrapperProps = {
  propertyId: string;
  price: number;
  bookings: Booking[];
};

const BookingWrapper = ({
  propertyId,
  price,
  bookings,
}: BookingWrapperProps) => {
  // setting the state to the given props
  useEffect(() => {
    usePropertyStore.setState({
      propertyId,
      price,
      bookings,
    });
  }, []);

  return (
    <>
      <BookingCalendar />
      <BookingContainer />
    </>
  );
};

export default BookingWrapper;
