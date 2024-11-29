import { DateRange } from "react-day-picker";
import { Booking } from "@/utility/types";

export const defaultSelected: DateRange = {
  from: undefined,
  to: undefined,
};

export const generateBlockedPeriods = ({
  bookings,
  today,
}: {
  bookings: Booking[];
  today: Date;
}) => {
  today.setHours(0, 0, 0, 0); // setting time to 00:00:00:00

  const disabledDays: DateRange[] = [
    ...bookings.map((booking) => ({
      from: booking.checkIn,
      to: booking.checkOut,
    })),
    {
      from: new Date(0), // this 01 jan 1970
      to: new Date(today.getTime() - 24 * 60 * 60 * 1000), // this is yesterday
    },
  ];
  return disabledDays;
};

export const generateDateRange = (range: DateRange | undefined): string[] => {
  if (!range || !range.from || !range.to) return [];

  const currentDate = new Date(range.from);
  const endDate = new Date(range.to);
  const dateRange: string[] = [];

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    dateRange.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateRange;
};
