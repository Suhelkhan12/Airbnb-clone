"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";
import { type actionType } from "@/utility/types";
import { LuUser2 } from "react-icons/lu";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionType;
  text: string;
  children?: React.ReactNode;
};

const userIcon = (
  <LuUser2 className=" size-24 bg-primary text-white rounded-md mb-4" />
);

const ImageInputContainer = (props: ImageInputContainerProps) => {
  const { image, name, action, text } = props;
  const [isUpdateformVisible, setIsUpdateformVisible] =
    useState<boolean>(false);

  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded-md object-cover mb-4 w-24 h-24"
        />
      ) : (
        userIcon
      )}
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => setIsUpdateformVisible((p) => !p)}
      >
        {text}
      </Button>

      {isUpdateformVisible && (
        <div className=" max-w-lg">
          <FormContainer action={action}>
            {props.children}
            <div className=" mt-4 max-w-xs w-full">
              <ImageInput />
            </div>
            <SubmitButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default ImageInputContainer;
