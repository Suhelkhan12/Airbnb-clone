import { Label } from "../ui/label";
import { categories } from "@/utility/types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

const name = "category";

const CategoriesInput = () => {
  return (
    <div className="mb-2 flex flex-col gap-2">
      <Label htmlFor={name} className=" capitalize">
        categories
      </Label>
      <Select defaultValue={categories[0].label} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => {
            return (
              <SelectItem key={category.label} value={category.label}>
                <span className="flex items-center gap-2 capitalize">
                  <category.icon /> {category.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoriesInput;
