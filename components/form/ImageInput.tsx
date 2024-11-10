import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ImageInput = () => {
  const name = "image";
  return (
    <div className=" flex flex-col gap-2 mt-4">
      <Label htmlFor={name} className=" capitalize">
        Profile image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs w-full mb-2"
      />
    </div>
  );
};

export default ImageInput;
