import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ImageInput = () => {
  const name = "image";
  return (
    <div className=" flex flex-col gap-2">
      <Label htmlFor={name} className=" capitalize">
        image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className=" mb-2"
      />
    </div>
  );
};

export default ImageInput;
