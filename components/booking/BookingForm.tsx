import { usePropertyStore } from "@/utils/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { calculateTotals } from "@/utils/calculatetotals";
import { formatCurrency } from "@/utils/format";

const BookingForm = () => {
  const { range, price } = usePropertyStore((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const { totalNights, service, tax, cleaning, subTotal, orderTotal } =
    calculateTotals({ checkIn, checkOut, price });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent>
        <FormRow
          label={`$${price} x ${totalNights} nights`}
          amount={subTotal}
        />
        <FormRow label="Cleaning fee" amount={cleaning} />
        <FormRow label="Service charges" amount={service} />
        <FormRow label="GSt" amount={tax} />
        <Separator className="my-4" />
        <CardTitle>
          <FormRow label="Booking total" amount={orderTotal} />
        </CardTitle>
      </CardContent>
    </Card>
  );
};

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className="flex items-center justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

export default BookingForm;
