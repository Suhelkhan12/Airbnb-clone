"use client";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { usePropertyStore } from "@/utils/store";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

const BookingCalendar = () => {
  const currenDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  // updating the range in our store based on selected range
  useEffect(() => {
    usePropertyStore.setState({
      range,
    });
  }, [range]);

  return (
    <Calendar
      mode={"range"}
      defaultMonth={currenDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
    />
  );
};

export default BookingCalendar;
