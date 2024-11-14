import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "../ui/select";

const RatingInput = ({
  name,
  labelText,
}: {
  name: string;
  labelText?: string;
}) => {
  // creating an array which contains all the numbers among which user can give rating
  const ratingNumbers = Array.from({ length: 5 }, (_, i) =>
    (i + 1).toString()
  ).reverse();

  return (
    <div className="mb-2 max-w-xs flex flex-col gap-2">
      <Label htmlFor={name} className=" capitalize text-lg">
        {labelText || name}
      </Label>
      <Select defaultValue={ratingNumbers[0]} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ratingNumbers.map((num) => (
            <SelectItem key={num} value={num}>
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingInput;
