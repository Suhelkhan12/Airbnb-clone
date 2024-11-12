import { Label } from "../ui/label";
import { formattedCountries } from "@/utils/countries";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const name = "country";
const CountriesInput = ({ defaultValue }: { defaultValue?: string }) => {
  return (
    <div className="mb-2 flex flex-col gap-2">
      <Label htmlFor={name} className=" capitalize">
        country
      </Label>
      <Select
        name={name}
        defaultValue={defaultValue || formattedCountries[0].code}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className=" capitalize flex items-center gap-2">
                {country.flag} {country.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountriesInput;
