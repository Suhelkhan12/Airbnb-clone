import { fetchBookings, deleteBookings } from "@/actions/actions";
import Link from "next/link";
import EmptyList from "@/components/home/EmptyList";
import CountryFlagAndName from "@/components/properties/CountryFlagAndName";

import { formatDate, formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import FormContainer from "@/components/form/FormContainer";
import { DeleteIconButton } from "@/components/form/Buttons";

const page = async () => {
  const bookings = await fetchBookings();
  if (bookings.length === 0) return <EmptyList />;

  return (
    <section>
      <h1 className="text-2xl font-semibold capitalize">
        Total bookings {bookings.length}
      </h1>
      <div className="mt-8">
        <Table>
          <TableCaption>A list of your recent bookings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const { id, checkIn, checkOut, totalNights, orderTotal } =
                booking;
              const { id: propertyId, name, country } = booking.property;

              const startDate = formatDate(checkIn);
              const endDate = formatDate(checkOut);

              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      href={`/properties/${propertyId}`}
                      className=" underline font-medium text-primary"
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <CountryFlagAndName countryCode={country} />
                  </TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                  <TableCell>
                    <DeleteBooking bookingId={id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

function DeleteBooking({ bookingId }: { bookingId: string }) {
  const deleteBookingAction = deleteBookings.bind(null, { id: bookingId });
  return (
    <FormContainer action={deleteBookingAction}>
      <DeleteIconButton actionType="delete" />
    </FormContainer>
  );
}
export default page;
