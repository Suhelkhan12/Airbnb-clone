import EmptyList from "@/components/home/EmptyList";
import { deleteRentalAction, fetchRentals } from "@/actions/actions";
import Link from "next/link";

import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import FormContainer from "@/components/form/FormContainer";
import { DeleteIconButton } from "@/components/form/Buttons";

const page = async () => {
  const rentals = await fetchRentals();

  if (rentals.length === 0)
    return <EmptyList message="Don't hesitate to create a rental" />;

  return (
    <section>
      <h1 className="text-2xl font-semibold capitalize">
        Active properties {rentals.length}
      </h1>
      <div className="mt-8">
        <Table>
          <TableCaption>A list of all your properties.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Nightly Rate </TableHead>
              <TableHead>Nights Booked</TableHead>
              <TableHead>Total Income</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((rental) => {
              const { id: propertyId, name, price } = rental;
              const { totalNightsSum, orderTotalSum } = rental;
              return (
                <TableRow key={propertyId}>
                  <TableCell>
                    <Link
                      href={`/properties/${propertyId}`}
                      className=" underline text-primary font-medium "
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{formatCurrency(price)}</TableCell>
                  <TableCell>{totalNightsSum || 0}</TableCell>
                  <TableCell>{formatCurrency(orderTotalSum) || 0}</TableCell>
                  <TableCell className="flex items-center gap-x-2">
                    <Link href={`/rentals/${propertyId}`}>
                      <DeleteIconButton actionType="edit" />
                    </Link>
                    <DeleteRental propertyId={propertyId} />
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

function DeleteRental({ propertyId }: { propertyId: string }) {
  const deleteAction = deleteRentalAction.bind(null, { propertyId });
  return (
    <FormContainer action={deleteAction}>
      <DeleteIconButton actionType="delete" />
    </FormContainer>
  );
}

export default page;
