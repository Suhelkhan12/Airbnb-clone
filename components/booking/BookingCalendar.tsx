"use client";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { usePropertyStore } from "@/utils/store";

import { defaultSelected, generateBlockedPeriods } from "@/utils/calendar";

const BookingCalendar = () => {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  // getting the bookings if there are some
  const bookings = usePropertyStore((state) => state.bookings);

  const blockedDates = generateBlockedPeriods({ bookings, today: currentDate });
  console.log(blockedDates);
  // updating the range in our store based on selected range
  useEffect(() => {
    usePropertyStore.setState({
      range,
    });
  }, [range]);

  return (
    <Calendar
      mode={"range"}
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      disabled={blockedDates}
      className="mb-4"
    />
  );
};

export default BookingCalendar;
