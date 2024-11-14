import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type DescriptionInputProps = {
  name: string;
  defaultValue?: string;
  labelText?: string;
};

const DescriptionInput = ({
  name,
  defaultValue,
  labelText,
}: DescriptionInputProps) => {
  return (
    <div className="mb-2 flex gap-2 flex-col">
      <Label htmlFor={name} className=" capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        placeholder={defaultValue || "Elaborate about your property..."}
        rows={5}
        required
        className=" leading-loose resize-none text-sm"
      />
    </div>
  );
};

export default DescriptionInput;
