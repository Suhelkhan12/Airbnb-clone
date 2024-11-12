import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Prisma } from "@prisma/client";

const name = Prisma.PropertyScalarFieldEnum.price;

type PriceInputTypes = {
  defaultValue?: number;
};

const PriceInput = ({ defaultValue }: PriceInputTypes) => {
  return (
    <div className="mb-2 flex gap-2 flex-col">
      <Label htmlFor={name} className=" capitalize">
        price ($)
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
};

export default PriceInput;
